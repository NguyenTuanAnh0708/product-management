import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ScoreService } from './score.service';
import { CreateScoreDto } from './dto/create-scores.dto';
import { UpdateScoreDto } from './dto/update-scores.dto';

@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Get()
  findAll() {
    return this.scoreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.scoreService.findOne(id);
  }

  @Post()
  create(@Body() createScoreDto: CreateScoreDto) {
    return this.scoreService.create(createScoreDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateScoreDto: UpdateScoreDto) {
    return this.scoreService.update(id, updateScoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.scoreService.remove(id);
  }
}
