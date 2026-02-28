import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { getClientIp } from 'helpers/getClientIp';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

}
