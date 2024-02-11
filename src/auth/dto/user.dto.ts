import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  matricNumber: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  matricNumber: string;

  firstName: string;
  lastName: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
