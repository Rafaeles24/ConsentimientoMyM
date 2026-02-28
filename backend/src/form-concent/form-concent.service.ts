import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateFormConcentDto } from './dto/create-form-concent.dto';
import { UpdateFormConcentDto } from './dto/update-form-concent.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProxyIpService } from 'src/proxy-ip/proxy-ip.service';

@Injectable()
export class FormConcentService {
  constructor (
    private readonly prisma: PrismaService,
    private readonly proxyIpService: ProxyIpService
  ) {}
  async create(createFormConcentDto: CreateFormConcentDto) {
    const existDni = await this.prisma.form.findUnique({
      where: { dni: createFormConcentDto.dni },
    });
    if (existDni) {
      throw new UnauthorizedException("El DNI ya se encuentra registrado.");
    }

    const existPhone = await this.prisma.form.findUnique({
      where: { phone_number: createFormConcentDto.phone_number },
    });
    if (existPhone) {
      throw new UnauthorizedException("El número de teléfono ya se encuentra registrado.");
    }

    const existContact = await this.prisma.form.findFirst({
      where: { phone_contact: createFormConcentDto.phone_contact },
    });

    if (existContact) {
      throw new UnauthorizedException("El número de contacto ya se encuentra registrado.");
    }

    if (createFormConcentDto.verified !== true) {
      throw new UnauthorizedException("Es necesario que el usuario acepte los terminos y condiciones para crear el formulario de consentimiento informado");
    }


    try {
      const form = await this.prisma.form.create({
        data: createFormConcentDto
      });

      return form;
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      throw new InternalServerErrorException(`Error al crear el formulario de consentimiento informado: ${error.message}`);
    }
  }

  findAll() {
    return this.prisma.form.findMany();
  }

  async findIpOneById(id: number) {
    const form = await this.prisma.form.findUnique({
      where: { id },
      select: { ip_address: true }
    });
    return form;
  }
}
