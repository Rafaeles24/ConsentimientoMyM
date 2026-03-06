import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateConsentimientoDto } from './dto/create-consentimiento.dto';
import { UpdateConsentimientoDto } from './dto/update-consentimiento.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ConsentimientoService {
  constructor ( private readonly prisma: PrismaService ) {}

  async create(dto: CreateConsentimientoDto) {
    try {
      return this.prisma.$transaction(async (tx) => {
        const origenMap = {
          DEMO: tx.demo_Telecom,
          ENERGIA: tx.energia_Global_Spain,
        }

        const origen = origenMap[dto.origen];

        if (!origen) throw new BadRequestException(`El origen no es valido`);

        const existeDni = await origen.findUnique({
          where: { dni: dto.dni }
        });
        if (existeDni) throw new BadRequestException(`El DNI ya esta registrado.`);

        const existeTelefono = await origen.findUnique({
          where: { num_telefono: dto.num_telefono }
        });
        if (existeTelefono) throw new BadRequestException(`El numero de telefono ya esta siendo usado. Por favor, proporcione otro numero.`);

        if (dto.verificado !== true) throw new UnauthorizedException(`Debes Aceptar los terminos y condiciones de tu consentimiento.`);



        return await origen.create({
          data: {
            
          }
        })
      })
    } catch (error) {
      
    }
  }
}
