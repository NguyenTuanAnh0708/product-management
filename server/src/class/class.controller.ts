import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  NotFoundException,
} from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('class')
@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) { }

  @Get()
  findAll() {
    return this.classService.findAll();
  }

  @Get(':classID')
  async findOne(@Param('classID') classID: number) {
    const classWithStudents = await this.classService.findOne(classID);
    if (!classWithStudents) {
      throw new NotFoundException('Class not found');
    }
    return classWithStudents;
  }

  @Post()
  create(@Body() createClassDto: CreateClassDto) {
    return this.classService.create(createClassDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateClassDto: UpdateClassDto) {
    return this.classService.update(id, updateClassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.classService.remove(id);
  }
}
