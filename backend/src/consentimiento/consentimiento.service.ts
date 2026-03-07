import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateConsentimientoDto } from './dto/create-consentimiento.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ConsentimientoService {
  constructor ( private readonly prisma: PrismaService ) {}

  private getOrigenModel (prisma: any, origen: string) {
    try {
      const origenMap = {
        DEMO: prisma.demo_Telecom,
        ENERGIA: prisma.energia_Global_Spain
      }

      const model = origenMap[origen];

      if (!model) {
        throw new BadRequestException(`Origen no válido: ${origen}`);
      }

      return model;
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(`Ocurrio un error inesperado en la obtencio del origen: ${error}`);
    }
  }

  async findConsentimientoProId(id: number, origen: string) {
    try {
      const model = this.getOrigenModel(this.prisma, origen);

      return await model.findUnique({
        where: { id },
        select: {
          dni: true,
          direccion_ip: true
        }
      });
    } catch (error) {
      
    }
  }

  async findConsentimientoPorDni(dni: string, origen: string) {
    try {
      const model = this.getOrigenModel(this.prisma, origen);

      return await model.findUnique({
        where: { dni }
      }); 
    } catch (error) {
      throw new InternalServerErrorException(`Ocurrio un error inesperado al buscar un consentimiento.`);
    }
  }

  async create(dto: CreateConsentimientoDto, ip: string) {
    try {
      return this.prisma.$transaction(async (tx: any) => {
        const origen = this.getOrigenModel(tx, dto.origen);

        if (!origen) throw new BadRequestException(`El origen no es valido`);

        /* const existeIp = await origen.findFirst({
          where: { direccion_id: ip }
        });
        if (existeIp) throw new UnauthorizedException(`Ya existe un consentimiento desde esta direccion.`); */

        const existeDni = await origen.findUnique({
          where: { dni: dto.dni }
        });
        if (existeDni) throw new BadRequestException(`Ya existe un registro asociado al DNI introducido`);

        const existeTelefono = await origen.findUnique({
          where: { num_telefono: dto.num_telefono }
        });
        if (existeTelefono) throw new BadRequestException(`Ya existe un registro asociado al número de teléfono introducido.`);

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
        
        return { ip: consentimiento.direccion_ip, statusCode: 201 };
      })
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof UnauthorizedException) throw error;
      throw new InternalServerErrorException(`Ocurrio un error inesperado al crear el consentimiento: ${error}`);
    }
  }
}
