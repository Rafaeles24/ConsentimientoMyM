import { Module } from '@nestjs/common';
import { FormConcentService } from './form-concent.service';
import { FormConcentController } from './form-concent.controller';
import { ProxyIpModule } from 'src/proxy-ip/proxy-ip.module';

@Module({
  imports: [ProxyIpModule],
  controllers: [FormConcentController],
  providers: [FormConcentService],
})
export class FormConcentModule {}
