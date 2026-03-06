import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ConsentimientoService } from './consentimiento.service';
import { ProxyIpService } from 'src/proxy-ip/proxy-ip.service';
import { CreateConsentimientoDto } from './dto/create-consentimiento.dto';

@Controller('consentimiento')
export class ConsentimientoController {
  constructor(
    private readonly consentimientoService: ConsentimientoService,
    private readonly proxyIpService: ProxyIpService
  ) {}

  @Post('/registrar')
  create(
    @Req() req: Request,
    @Body() dto: CreateConsentimientoDto
  ) {
    const ip = this.proxyIpService.getIpClient(req);
    return this.consentimientoService.create(dto, ip);
  }
}
