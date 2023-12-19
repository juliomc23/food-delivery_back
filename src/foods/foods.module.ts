import { Module } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { FoodsController } from './foods.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food, FoodImage } from './entities';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Food, FoodImage, Restaurant])],
  controllers: [FoodsController],
  providers: [FoodsService],
  exports: [FoodsModule],
})
export class FoodsModule {}
