import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProxyIpService } from './proxy-ip/proxy-ip.service';
import { ProxyIpModule } from './proxy-ip/proxy-ip.module';
import { ConsentimientoModule } from './consentimiento/consentimiento.module';

@Module({
  imports: [ PrismaModule, ProxyIpModule, ConsentimientoModule],
  controllers: [AppController],
  providers: [AppService, ProxyIpService],
})
export class AppModule {}
