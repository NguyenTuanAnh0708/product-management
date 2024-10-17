import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ScoresService } from './scores.service';
import { CreateScorsDto } from './dto/create-scores.dto';

@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) { }

  @Post()
  create(@Body() createScorsDto: CreateScorsDto) {
    return this.scoresService.createScore(createScorsDto);
  }

  @Get()
  getAll() {
    return this.scoresService.finAll();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.scoresService.findOne(id);
  }

  //   @Put(':id')
  //   update(
  //     @Param('id') id: number,
  //     @Body() updateScoreDto: Partial<CreateScorsDto>,
  //   ) {
  //     // return this.scoresService.update(id, updateScoreDto);
  //   }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.scoresService.remove(id);
  }
}
