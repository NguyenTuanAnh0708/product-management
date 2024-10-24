import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { query } from 'express';
import { GetCategoriesDto } from './dto/get-category.dto';
import { Category } from './entities/category.entities';
import { CategoiesReponse } from './types/category.type';

@ApiTags('category')
@Controller('api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiQuery({
    name: 'limit',
    required: true,
    description: 'The number of categories to display per page',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    required: true,
    description: 'The current page number',
    example: 1,
  })
  @ApiQuery({
    name: 'orderBy',
    required: false,
    description: 'The column name to sort by, e.g.',
  })
  @ApiQuery({
    name: 'orderDirection',
    required: false,
    description:
      'The direction of sorting, can be ASC (ascending) or DESC (descending)',
  })
  async getCategories(
    @Query() query: GetCategoriesDto,
  ): Promise<CategoiesReponse> {
    console.log(query);
    return await this.categoryService.findAll(
      query.page,
      query.limit,
      query.orderBy,
      query.orderDirection,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.categoryService.remove(id);
  }
}
