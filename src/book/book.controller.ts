import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorate/roles.decorate';
import { Role } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('findAll')
  async findAll(): Promise<any> {
    return this.bookService.findAll();
  }

  @Get('findName')
  async findNameBook(@Query() query: ExpressQuery): Promise<Book[]> {
    return await this.bookService.findName(query);
  }

  @Get('findOne/:id')
  async findOneById(@Param('id') id: string): Promise<Book | null> {
    return await this.bookService.findOneById(id);
  }

  @Post('createBook')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.SuperAdmin, Role.RootAdmin, Role.Admin, Role.BookManager)
  async createABook(
    @Body()
    book: CreateBookDto,
    @Req() req,
  ): Promise<Book> {
    console.log(req.user);
    return await this.bookService.create(book, req.user);
  }

  //   @Put('updateBook/:id')
  //   async update(
  //     @Param('id') id: string,
  //     @Body()
  //     book: UpdateBookDto,
  //   ): Promise<Book> {
  //     return await this.bookService.updateOndById(id, book);
  //   }

  @Put('updateBook/:id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Body()
    book: UpdateBookDto,
    @Req() req,
  ): Promise<{ message: string; book: Book }> {
    console.log(req.user);
    const updatedBook = await this.bookService.updateOneById(
      id,
      book,
      req.user,
    );
    return {
      message: 'Book updated successfully',
      book: updatedBook,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('deleteBook/:id')
  async delete(
    @Param('id')
    id: string,
  ): Promise<{ message: string; book: Book }> {
    const deleteBook = await this.bookService.deleteOneById(id);
    return {
      message: 'Book deleted successfully',
      book: deleteBook,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('deleteAll')
  async deleteAll(): Promise<{ message: string }> {
    const deleteAllBook = await this.bookService.deleteAll();
    return {
      message: 'All Book delete successfully',
    };
  }
}
