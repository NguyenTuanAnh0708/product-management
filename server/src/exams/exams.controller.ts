import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { ExamsService } from './exams.service';

@Controller('exams')
export class ExamsController {
  constructor(private readonly examService: ExamsService) {}
  @Post()
  async create(@Body() createExamDto: CreateExamDto) {
    return await this.examService.create(createExamDto);
  }
  @Get()
  findAll() {
    return this.examService.findAll();
  }
  @Get(':id')
  findOne(@Param() id: number) {
    return this.examService.findOne(id);
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() updateExamDto: UpdateExamDto) {
    return this.examService.update(id, updateExamDto);
  }
  @Delete()
  remove(@Param('id') id: number) {
    return this.examService.remove(id);
  }
}
