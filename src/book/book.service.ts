import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Book } from './schemas/book.schema';
import { Query } from 'express-serve-static-core';
import { title } from 'process';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(query: Query): Promise<Book[]> {
    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};
    const books = await this.bookModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return books;
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
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException(`Please enter correct Id`);
    }
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
