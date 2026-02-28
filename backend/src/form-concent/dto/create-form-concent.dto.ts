import { IsBoolean, IsNotEmpty, IsNumberString, IsOptional, IsString, Length } from "class-validator";
export class CreateFormConcentDto {
    @IsNumberString()
    @IsNotEmpty()
    @Length(8, 8)
    dni: string;

    @IsNumberString()
    @IsNotEmpty()
    @Length(9, 9)
    phone_number: string;

    @IsNumberString()
    @IsNotEmpty()
    @Length(9, 9)
    phone_contact: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 255)
    full_name: string;

    @IsBoolean()
    verified: boolean;

    @IsOptional()
    ip_address?: string;
}
