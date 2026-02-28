import { Controller, Get, Post, Body, Patch, Param, Delete, Req, ParseIntPipe } from '@nestjs/common';
import { FormConcentService } from './form-concent.service';
import { CreateFormConcentDto } from './dto/create-form-concent.dto';
import { UpdateFormConcentDto } from './dto/update-form-concent.dto';
import { ProxyIpService } from 'src/proxy-ip/proxy-ip.service';

@Controller('form-concent')
export class FormConcentController {
  constructor(
    private readonly formConcentService: FormConcentService,
    private readonly proxyIpService: ProxyIpService
  ) {}

  @Post("/create")
  create(
    @Body() createFormConcentDto: CreateFormConcentDto,
    @Req() req
) {
    const ip = this.proxyIpService.getIpClient(req);
    createFormConcentDto.ip_address = ip;
    return this.formConcentService.create(createFormConcentDto);
  }

  @Get()
  findAll() {
    return this.formConcentService.findAll();
  }

  @Get('ip/:id')
  findIpOneById(@Param('id', ParseIntPipe) id: number) {
    return this.formConcentService.findIpOneById(id);   
  }
}
