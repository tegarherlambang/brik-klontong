import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between, ILike } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductCategory } from '../product-category/entities/product-category.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ConfigService } from '@nestjs/config';
import { ProductQueryDto } from './dto/product-query.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductCategory)
    private categoryRepository: Repository<ProductCategory>,
    private readonly configService: ConfigService,
  ) {}

  async create(createProductDto: CreateProductDto, imageFile?: Express.Multer.File,): Promise<Product> {
    const category = await this.categoryRepository.findOneBy({ 
      id: createProductDto.categoryId 
    });
    
    if (!category) {
      throw new Error('Category not found');
    }

    let imageUrl: string | undefined;
    if (imageFile) {
      imageUrl = this.buildImageUrl(imageFile.filename);
    } else if (createProductDto.image) {
      // If image URL was provided directly (not uploaded)
      imageUrl = this.isAbsoluteUrl(createProductDto.image)
        ? createProductDto.image
        : this.buildImageUrl(createProductDto.image);
    }

    const productData = {
      sku: createProductDto.sku,
      name: createProductDto.name,
      description: createProductDto.description,
      weight: createProductDto.weight,
      width: createProductDto.width,
      length: createProductDto.length,
      height: createProductDto.height,
      price: createProductDto.price,
      image: imageUrl,
      category: category,
      categoryId: category.id,
    };

    return this.productRepository.save(productData);
  }

  private buildImageUrl(filename: string): string {
    const baseUrl = this.configService.get<string>('BASE_URL');
    const uploadPath = this.configService.get<string>('UPLOAD_PATH', 'uploads/products');
    return `${baseUrl}${uploadPath}/${filename}`;
  }

  private isAbsoluteUrl(url: string): boolean {
    return /^https?:\/\//i.test(url);
  }

  private async deleteUploadedFile(filePath: string): Promise<void> {
    const fs = await import('fs/promises');
    await fs.unlink(filePath);
  }

  async findAll(query: ProductQueryDto) {
    const { page = 1, limit = 10, search } = query;
    const skip = (page - 1) * limit;

    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category');

    if (search) {
      queryBuilder.where([
        { name: ILike(`%${search}%`) },
        { description: ILike(`%${search}%`) },
        { sku: ILike(`%${search}%`) },
        { 'category.categoryName': ILike(`%${search}%`) },
      ]);
    }

    const [products, total] = await queryBuilder
      .take(limit)
      .skip(skip)
      .orderBy('product.name', 'ASC')
      .getManyAndCount();

    return {
      data: products,
      meta: {
        total,
        page,
        limit,
        last_page: Math.ceil(total / limit),
      },
    };
  }

  findOne(id: number): Promise<Product | null> {
    return this.productRepository.findOne({ 
      where: { id },
      relations: ['category'] 
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.preload({
      id,
      ...updateProductDto,
    });
    if (!product) {
      throw new Error('Product not found');
    }
    return this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}