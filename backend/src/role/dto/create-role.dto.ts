import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
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
    description: '角色名称',
    example: 'admin',
    minLength: 1,
    maxLength: 255
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  role: string;

  @ApiPropertyOptional({
    description: '角色描述',
    example: '系统管理员角色',
    required: false,
    maxLength: 255
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;
}
