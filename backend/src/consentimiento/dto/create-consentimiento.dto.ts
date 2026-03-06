import { IsBoolean, IsNotEmpty, IsNumberString, IsString, Length } from "class-validator";

export class CreateConsentimientoDto {
    @IsNumberString()
    @IsNotEmpty()
    dni: string;

    @IsString()
    @IsNotEmpty()
    origen: string;

    @IsNumberString()
    @IsNotEmpty()
    @Length(9, 9)
    num_telefono: string;

    @IsNumberString()
    @IsNotEmpty()
    @Length(9, 9)
    num_contacto: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 255)
    nombre_completo: string;

    @IsBoolean()
    @IsNotEmpty()
    verificado: boolean;
}
