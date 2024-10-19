import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateClassDto {
  @ApiProperty({
    description: 'Tên lớp học',
    required: false,
  })
  @IsString()
  @IsOptional()
  className?: string;

  @ApiProperty({
    description: 'teacher',
    required: false,
  })
  @IsString()
  @IsOptional()
  teacher?: string;
}
