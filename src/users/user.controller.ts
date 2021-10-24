import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CardService } from 'src/cards/card.service';
import { ColumnService } from 'src/columns/column.service';
import { CommentService } from 'src/comments/comment.service';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private columnService: ColumnService,
    private cardService: CardService,
    private commentService: CommentService,
  ) {}

  @Get(':userId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user info' })
  @ApiParam({ name: 'userId' })
  async getUserInfo(@Param() { userId }) {
    return await this.userService.getUserById(userId);
  }

  @Get(':userId/columns')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user columns' })
  @ApiParam({ name: 'userId' })
  async getUserColumns(@Param() { userId }) {
    return await this.columnService.getUserColumns(userId);
  }

  @Get(':userId/cards')
  @UseGuards()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user cards' })
  @ApiParam({ name: 'userId' })
  async getUserCards(@Param() { userId }) {
    return await this.cardService.getUserCards(userId);
  }

  @Get(':userId/comments')
  @UseGuards()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user comments' })
  @ApiParam({ name: 'userId' })
  async getUserComments(@Param() { userId }) {
    return await this.commentService.getUserComment(userId);
  }
}
