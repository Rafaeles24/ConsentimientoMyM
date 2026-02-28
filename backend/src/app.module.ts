import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FormConcentModule } from './form-concent/form-concent.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProxyIpService } from './proxy-ip/proxy-ip.service';
import { ProxyIpModule } from './proxy-ip/proxy-ip.module';

@Module({
  imports: [FormConcentModule, PrismaModule, ProxyIpModule],
  controllers: [AppController],
  providers: [AppService, ProxyIpService],
})
export class AppModule {}
