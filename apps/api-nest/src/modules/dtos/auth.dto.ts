import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum UserRole {
  Patient = 'Patient',
  Doctor = 'Doctor',
  Nurse = 'Nurse',
  Admin = 'Admin',
}

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;

  @IsEnum(UserRole)
  role!: UserRole;

  @IsString()
  tenantId!: string;

  @IsNotEmpty()
  profile!: any;

  @IsString()
  consentVersion!: string;

  @IsOptional()
  consentAcceptedAt?: Date;
}

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}
