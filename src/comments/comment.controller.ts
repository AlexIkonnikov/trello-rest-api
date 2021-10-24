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
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCommentDto } from './comment.dto';
import { CommentService } from './comment.service';
import { UserHasCommentGuard } from './userHasComment.guard';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Put(':commentId')
  @ApiParam({ name: 'commentId' })
  @UseGuards(JwtAuthGuard, UserHasCommentGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update comment' })
  update(@Param() { commentId }, @Body() { text }: CreateCommentDto) {
    this.commentService.updateComment(commentId, text);
  }

  @Get(':commentId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'commentId' })
  @ApiOperation({ summary: 'Get comment' })
  async getComment(@Param() { commentId }) {
    return await this.commentService.getCommentById(commentId);
  }

  @Delete(':commentId')
  @UseGuards(JwtAuthGuard, UserHasCommentGuard)
  @ApiParam({ name: 'commentId' })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete comment' })
  delete(@Param() { commentId }) {
    this.commentService.deleteComment(commentId);
  }
}
