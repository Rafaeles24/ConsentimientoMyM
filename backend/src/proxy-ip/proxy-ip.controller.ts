import { Controller, Post, Req } from '@nestjs/common';
import { ProxyIpService } from './proxy-ip.service';

@Controller('proxy-ip')
export class ProxyIpController {
  constructor(private readonly proxyIpService: ProxyIpService) {}

  @Post('post-ip')
  create(@Req() req) {
  }

}
