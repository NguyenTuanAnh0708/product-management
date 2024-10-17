import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateClassDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  className?: string;
  @IsString()
  @IsOptional()
  teacher?: string;
}
