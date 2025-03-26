import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';
import { Product } from '../product/entities/product.entity';
import { ProductCategory } from '../product-category/entities/product-category.entity';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductCategory)
    private readonly categoryRepository: Repository<ProductCategory>,
  ) {}

  private readonly logger = new Logger(SeederService.name);

  async seed() {
    await this.seedUsers();
    await this.seedCategoriesAndProducts();
  }

  private async seedUsers() {
    const existingUser = await this.userRepository.findOne({ where: { email: 'admin@example.com' } });
    if (!existingUser) {
      const user = this.userRepository.create({
        email: 'admin@example.com',
        password: 'Password123',
      });
      await this.userRepository.save(user);
      this.logger.log('Admin user created successfully');
    } else {
      this.logger.log('Admin user already exists');
    }
  }

    // src/seeder/seeder.service.ts
    private async seedCategoriesAndProducts() {
        // Create 10 categories
        const categories : ProductCategory[] = []
        for (let i = 1; i <= 10; i++) {
        const category = this.categoryRepository.create({
            categoryName: `Category ${i}`,
        });
        const savedCategory = await this.categoryRepository.save(category);
        categories.push(savedCategory);
        }
    
        this.logger.log('Created 10 product categories');
    
        // Create 10 products for each category (100 total)
        for (const category of categories) {
        for (let i = 1; i <= 10; i++) {
            const product = this.productRepository.create({
            name: `Product ${i} - ${category.categoryName}`,
            description: `Description for product ${i} in ${category.categoryName}`,
            sku: `SKU-${category.id}-${i}`,
            weight: parseFloat((Math.random() * 1000).toFixed(2)),
            width: parseFloat((Math.random() * 100).toFixed(2)),
            length: parseFloat((Math.random() * 100).toFixed(2)),
            height: parseFloat((Math.random() * 100).toFixed(2)),
            image: `https://picsum.photos/200/300?random=${category.id}${i}`,
            price: parseFloat((Math.random() * 1000).toFixed(2)),
            category: category, // Assign the entire category object
            categoryId: category.id, // Also set the foreign key
            });
            
            await this.productRepository.save(product);
        }
        }
    
        this.logger.log('Created 100 products (10 per category)');
    }
}