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
import { CreateCommentDto } from 'src/comments/comment.dto';
import { CommentService } from 'src/comments/comment.service';
import { UpdateCardDto } from './card.dto';
import { CardService } from './card.service';
import { UserHasCardGuard } from './userHasCard.guard';

@ApiTags('cards')
@Controller('cards')
export class CardController {
  constructor(
    private cardService: CardService,
    private commentService: CommentService,
  ) {}

  @Get(':cardId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get card by id' })
  @ApiParam({ name: 'cardId' })
  async getOne(@Param() { cardId }) {
    return await this.cardService.getCardById(cardId);
  }

  @Put(':cardId')
  @UseGuards(JwtAuthGuard, UserHasCardGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update card by id' })
  @ApiParam({ name: 'cardId' })
  update(@Param() { cardId }, @Body() newCard: UpdateCardDto) {
    this.cardService.updateCard(cardId, { ...newCard });
  }

  @Delete(':cardId')
  @UseGuards(JwtAuthGuard, UserHasCardGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete card by id' })
  @ApiParam({ name: 'cardId' })
  delete(@Param() { cardId }) {
    this.cardService.deleteById(cardId);
  }

  @Post(':cardId/comment')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create comment for specified card' })
  @ApiParam({ name: 'cardId' })
  createComment(
    @Body() { text }: CreateCommentDto,
    @Param() { cardId },
    @Req() { user: { id } },
  ) {
    this.commentService.createComment({ text, cardId, userId: id });
  }
}
