import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConsentimientoService } from './consentimiento.service';

@Controller('consentimiento')
export class ConsentimientoController {
  constructor(private readonly consentimientoService: ConsentimientoService) {}

}
