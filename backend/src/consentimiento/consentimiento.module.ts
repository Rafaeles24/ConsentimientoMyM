import { Module } from '@nestjs/common';
import { ConsentimientoService } from './consentimiento.service';
import { ConsentimientoController } from './consentimiento.controller';
import { ProxyIpModule } from 'src/proxy-ip/proxy-ip.module';

@Module({
  imports: [ProxyIpModule],
  controllers: [ConsentimientoController],
  providers: [ConsentimientoService],
})
export class ConsentimientoModule {}
