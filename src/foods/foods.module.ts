import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food, FoodImage } from './entities';
import { FoodsController } from './foods.controller';
import { FoodsService } from './foods.service';

@Module({
  imports: [TypeOrmModule.forFeature([Food, FoodImage])],
  controllers: [FoodsController],
  providers: [FoodsService],
})
export class FoodsModule {}
