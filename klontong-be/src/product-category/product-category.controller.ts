import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    ParseIntPipe,
  } from '@nestjs/common';
  import { ProductCategoryService } from './product-category.service';
  import { CreateProductCategoryDto } from './dto/create-product-category.dto';
  import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
  import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
  
  @ApiTags('Product Categories')
  @Controller('product-categories')
  export class ProductCategoryController {
    constructor(private readonly categoryService: ProductCategoryService) {}
  
    @Post()
    @ApiOperation({ summary: 'Create a new product category' })
    @ApiResponse({ status: 201, description: 'Category successfully created' })
    create(@Body() createCategoryDto: CreateProductCategoryDto) {
      return this.categoryService.create(createCategoryDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all product categories' })
    @ApiResponse({ status: 200, description: 'List of all categories' })
    findAll() {
      return this.categoryService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get a specific product category' })
    @ApiResponse({ status: 200, description: 'Category details' })
    @ApiResponse({ status: 404, description: 'Category not found' })
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.categoryService.findOne(id);
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Update a product category' })
    @ApiResponse({ status: 200, description: 'Updated category' })
    @ApiResponse({ status: 404, description: 'Category not found' })
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateCategoryDto: UpdateProductCategoryDto,
    ) {
      return this.categoryService.update(id, updateCategoryDto);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a product category' })
    @ApiResponse({ status: 200, description: 'Category deleted' })
    @ApiResponse({ status: 404, description: 'Category not found' })
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.categoryService.remove(id);
    }
  }