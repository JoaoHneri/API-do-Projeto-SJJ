import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150, { message: 'Nome deve ter no máximo 150 caracteres' })
  name: string;

  @IsEmail({}, { message: 'Email deve ter um formato válido' })
  @IsNotEmpty()
  @MaxLength(150, { message: 'Email deve ter no máximo 150 caracteres' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Senha deve ter pelo menos 6 caracteres' })
  password: string;
}
