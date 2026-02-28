import { Module } from '@nestjs/common';
import { ProxyIpService } from './proxy-ip.service';
import { ProxyIpController } from './proxy-ip.controller';

@Module({
  controllers: [ProxyIpController],
  providers: [ProxyIpService],
  exports: [ProxyIpService],
})
export class ProxyIpModule {}
