import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateRolePermissionDto {
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

  @ApiProperty({
    description: '资源名称',
    example: 'user:read',
    minLength: 1,
    maxLength: 255
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  resource: string;

  @ApiPropertyOptional({
    description: '权限描述',
    example: '管理员可以读取用户信息',
    required: false,
    maxLength: 255
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;
}
