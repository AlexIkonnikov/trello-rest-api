import { Body, Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ColumnService } from 'src/columns/column.service';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(private userService: UserService, private columnService: ColumnService) { }

    @Get(':id/column')
    @UseGuards(JwtAuthGuard)
    async getUserColumns(@Param() params) {
        return await this.columnService.getUserColumns(params.id);
    }

    @Delete(':id/column/:columnId')
    @UseGuards(JwtAuthGuard)
    deleteUserColumn(@Param() params) {
        this.columnService.deleteUserColumn(params.columnId);
    }

    @Put(':id/column/:columnId')
    updateColumn(@Param() params, @Body() { title }) {
        this.columnService.updateColumnTitle(params.columnId, title);
    }
}