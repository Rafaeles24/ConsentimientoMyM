import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateConsentimientoDto } from './dto/create-consentimiento.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ConsentimientoService {
  constructor ( private readonly prisma: PrismaService ) {}

  async create(dto: CreateConsentimientoDto, ip: string) {
    try {
      return this.prisma.$transaction(async (tx: any) => {
        const origenMap = {
          DEMO: tx.demo_Telecom,
          ENERGIA: tx.energia_Global_Spain,
        }

        const origen = origenMap[dto.origen];

        if (!origen) throw new BadRequestException(`El origen no es valido`);

        const existeIp = await origen.findFirst({
          where: { direccion_id: ip }
        });
        if (existeIp) throw new UnauthorizedException(`Ya existe un consentimiento desde esta direccion.`);

        const existeDni = await origen.findUnique({
          where: { dni: dto.dni }
        });
        if (existeDni) throw new BadRequestException(`El DNI ya esta registrado.`);

        const existeTelefono = await origen.findUnique({
          where: { num_telefono: dto.num_telefono }
        });
        if (existeTelefono) throw new BadRequestException(`El numero de telefono ya esta siendo usado. Por favor, proporcione otro numero.`);

        if (dto.verificado !== true) throw new UnauthorizedException(`Debes Aceptar los terminos y condiciones de tu consentimiento.`);

        const consentimiento = await origen.create({
          data: {
            dni: dto.dni,
            num_telefono: dto.num_telefono,
            num_contacto: dto.num_contacto,
            nombre_completo: dto.nombre_completo,
            verificado: dto.verificado,
            direccion_ip: ip
          }
        });

        return { status: 201, ip: consentimiento.ip };
      })
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof UnauthorizedException) throw error;
      throw new InternalServerErrorException(`Ocurrio un error inesperado al crear el consentimiento: ${error}`);
    }
  }
}
