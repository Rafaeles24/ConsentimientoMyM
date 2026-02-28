import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {

    constructor(private prisma: PrismaService) {}

    async validate(value: any, args: ValidationArguments): Promise<boolean> {
        const [field] = args.constraints;

        const exists = await this.prisma.form.findFirst({
            where: { [field]: value },
        });

        return !exists;
    }

    defaultMessage(args: ValidationArguments): string {
        return `${args.property} ya está registrado.`;
    }
}