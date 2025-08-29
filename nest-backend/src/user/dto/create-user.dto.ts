import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail, IsNumber, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiPropertyOptional({
    description: 'OA ID',
    example: 12345,
    required: false
  })
  @IsOptional()
  @IsNumber()
  oId?: number;

  @ApiProperty({
    description: '项目名称',
    example: 'default',
    minLength: 1,
    maxLength: 128
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(128)
  namespace: string;

  @ApiProperty({
    description: '用户英文名',
    example: 'john.doe',
    minLength: 2,
    maxLength: 255
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  user: string;

  @ApiProperty({
    description: '用户中文名',
    example: '张三',
    minLength: 1,
    maxLength: 255
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({
    description: '职位名称',
    example: '软件工程师',
    required: false,
    maxLength: 255
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  job?: string;

  @ApiProperty({
    description: '密码',
    example: 'password123',
    minLength: 6,
    maxLength: 255
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(255)
  password: string;

  @ApiPropertyOptional({
    description: '手机号码',
    example: '13800138000',
    required: false,
    maxLength: 255
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  phoneNumber?: string;

  @ApiPropertyOptional({
    description: '邮箱地址',
    example: 'john.doe@example.com',
    required: false,
    maxLength: 255
  })
  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string;
}
