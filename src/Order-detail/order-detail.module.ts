import { Module } from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { OrderDetailController } from './order-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetails } from 'src/entities/orderDetails.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetails])],
  controllers: [OrderDetailController],
  providers: [OrderDetailService],
})
export class OrderDetailModule {}
