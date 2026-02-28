import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { getClientIp } from 'helpers/getClientIp';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProxyIpService {
    constructor ( private readonly prisma: PrismaService ) {}

    getIpClient(req: any): string {
        const clientIp = getClientIp(req);
        return clientIp;
    }

    async saveIpAddress(IdClient: number, ip: string) {
        try {
            return await this.prisma.form.update({
                where: { id: IdClient },
                data: { ip_address: ip }
            });
        } catch (error) {
            throw new InternalServerErrorException(`Error al guardar la dirección IP: ${error.message}`);
        }
    }
}
