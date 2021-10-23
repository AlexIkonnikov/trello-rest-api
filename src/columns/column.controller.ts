import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ColumnService } from './column.service';

@Controller('column')
export class ColumnController {
  constructor(private columnService: ColumnService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  save(@Body() { title }, @Req() { user: { id } }) {
    this.columnService.createColumn({ title, userId: id });
  }
}
