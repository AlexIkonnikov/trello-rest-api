import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CardModule } from 'src/cards/card.module';
import { ColumnController } from './column.controller';
import { Columns } from './column.entity';
import { ColumnService } from './column.service';

@Module({
  controllers: [ColumnController],
  providers: [ColumnService],
  imports: [TypeOrmModule.forFeature([Columns]), AuthModule, CardModule],
  exports: [ColumnService],
})
export class ColumnsModule {}
