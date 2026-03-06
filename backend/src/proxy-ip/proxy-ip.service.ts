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
}
