import { Module } from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetails } from 'src/entities/orderDetails.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetails])],
  providers: [OrderDetailService],
  exports: [OrderDetailService]
})
export class OrderDetailModule { }
