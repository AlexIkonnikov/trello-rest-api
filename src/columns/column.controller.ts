import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCardDto } from 'src/cards/card.dto';
import { CardService } from 'src/cards/card.service';
import { ColumnService } from './column.service';
import { CreateColumnDto } from './columns.dto';
import { UserHasColumnGuard } from './userHasColumn.guard';

@ApiTags('columns')
@Controller('columns')
export class ColumnController {
  constructor(
    private columnService: ColumnService,
    private cardService: CardService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create column' })
  save(@Body() { title }: CreateColumnDto, @Req() { user: { id } }) {
    this.columnService.createColumn({ title, userId: id });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get column' })
  @ApiParam({ name: 'id' })
  async get(@Param() param) {
    return await this.columnService.getColumnById(param.id);
  }

  @Put(':columnId')
  @UseGuards(JwtAuthGuard, UserHasColumnGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update column' })
  @ApiParam({ name: 'columnId' })
  update(@Body() { title }: CreateColumnDto, @Param() params) {
    this.columnService.updateColumnTitle(params.columnId, title);
  }

  @Delete(':columnId')
  @UseGuards(JwtAuthGuard, UserHasColumnGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete column' })
  @ApiParam({ name: 'columnId' })
  delete(@Param() params) {
    this.columnService.deleteUserColumn(params.columnId);
  }

  @Post(':columnId/card')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create card for specified column' })
  @ApiParam({ name: 'columnId' })
  createCard(
    @Param() { columnId },
    @Body() { title, description }: CreateCardDto,
    @Req() { user: { id } },
  ) {
    this.cardService.createCard({ title, description, userId: id, columnId });
  }
}
