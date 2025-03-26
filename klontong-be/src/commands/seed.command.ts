import { Command, Console } from 'nestjs-console';
import { Inject } from '@nestjs/common';
import { SeederService } from '../seeder/seeder.service';

@Console()
export class SeedCommand {
  constructor(
    @Inject(SeederService)
    private readonly seederService: SeederService,
  ) {}

  @Command({
    command: 'seed',
    description: 'Seed the database with initial data',
  })
  async seed() {
    await this.seederService.seed();
    console.log('Database seeding completed!');
  }
}