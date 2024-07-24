import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Book } from './schemas/book.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    const book = await this.bookModel.find();
    return book;
  }

  async findOneById(id: string): Promise<Book | null> {
    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async create(book: Book): Promise<Book> {
    const res = await this.bookModel.create(book);
    return res;
  }

  //   async updateOndById(id: string, book: Book): Promise<Book> {
  //     return await this.bookModel.findByIdAndUpdate(id, book, {
  //       new: true,
  //       runValidators: true,
  //     });
  //   }

  async updateOneById(id: string, book: Book): Promise<Book> {
    const books = await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
    if (!books) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return books;
  }

  async deleteOneById(id: string): Promise<Book> {
    return await this.bookModel.findByIdAndDelete(id);
  }

  async deleteAll(): Promise<{ deletedCount?: number }> {
    return await this.bookModel.deleteMany({});
  }
}
