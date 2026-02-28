import { PartialType } from '@nestjs/mapped-types';
import { CreateFormConcentDto } from './create-form-concent.dto';

export class UpdateFormConcentDto extends PartialType(CreateFormConcentDto) {}
