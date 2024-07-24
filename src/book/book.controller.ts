import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @Get('findAll')
  async findAllBook(): Promise<Book[]> {
    return await this.bookService.findAll();
  }

  @Get('findOne/:id')
  async findOneById(@Param('id') id: string): Promise<Book | null> {
    return await this.bookService.findOneById(id);
  }

  @Post('createBook')
  async createABook(
    @Body()
    book: CreateBookDto,
  ): Promise<Book> {
    return await this.bookService.create(book);
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
  async update(
    @Param('id') id: string,
    @Body()
    book: UpdateBookDto,
  ): Promise<{ message: string; book: Book }> {
    const updatedBook = await this.bookService.updateOneById(id, book);
    return {
      message: 'Book updated successfully',
      book: updatedBook,
    };
  }

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

  @Delete('deleteAll')
  async deleteAll(): Promise<{ message: string }> {
    const deleteAllBook = await this.bookService.deleteAll();
    return {
      message: 'All Book delete successfully',
    };
  }
}
