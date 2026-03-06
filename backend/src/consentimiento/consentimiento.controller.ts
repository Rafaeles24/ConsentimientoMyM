import { Controller, Get, Post, Body, Patch, Param, Delete, Req, ParseIntPipe } from '@nestjs/common';
import { ConsentimientoService } from './consentimiento.service';
import { ProxyIpService } from 'src/proxy-ip/proxy-ip.service';
import { CreateConsentimientoDto } from './dto/create-consentimiento.dto';

@Controller('consentimiento')
export class ConsentimientoController {
  constructor(
    private readonly consentimientoService: ConsentimientoService,
    private readonly proxyIpService: ProxyIpService
  ) {}

  @Get(':origen/:id')
  getConsentimiento(
    @Param('origen') origen: string,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.consentimientoService.findConsentimientoProId(id, origen);
  }

  @Post('/registrar')
  create(
    @Req() req: Request,
    @Body() dto: CreateConsentimientoDto
  ) {
    const ip = this.proxyIpService.getIpClient(req);
    return this.consentimientoService.create(dto, ip);
  }
}
