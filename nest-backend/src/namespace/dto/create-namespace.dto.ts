import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateNamespaceDto {
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

  @ApiPropertyOptional({
    description: '项目描述',
    example: '默认项目命名空间',
    required: false,
    maxLength: 255
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;
}
