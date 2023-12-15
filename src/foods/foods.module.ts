import { Module } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { FoodsController } from './foods.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food, FoodImage } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Food, FoodImage])],
  controllers: [FoodsController],
  providers: [FoodsService],
})
export class FoodsModule {}
