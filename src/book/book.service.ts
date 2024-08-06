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
import { User } from 'src/users/schemas/user.schema';
import { Role } from '@/roles/roles.enum';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll() {
    return await this.bookModel.find({});
  }

  async findName(query: Query): Promise<Book[]> {
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

  // async findPagination(query): Promise<Book[]> {
  //   const resPerPage = 2;
  //   const currentPage = Number(query.page) || 1;
  //   const skip = resPerPage * (currentPage - 1);
  //   const books = await this.bookModel.limit(resPerPage).skip(skip);
  //   return books;
  // }

  async findOneById(id: string): Promise<Book | null> {
    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async create(book: Book, user: User): Promise<Book> {
    const allowedRoles = [
      Role.SuperAdmin,
      Role.RootAdmin,
      Role.Admin,
      Role.BookManager,
    ];
    const hasRole = user.role.some((role) => allowedRoles.includes(role));
    if (!hasRole) {
      throw new BadRequestException('You are not allowed to create a book');
    }
    const data = Object.assign(book, { user: user._id }); //luu id user vao quyen sach
    const res = await this.bookModel.create(book);
    return res;
  }

  //   async updateOndById(id: string, book: Book): Promise<Book> {
  //     return await this.bookModel.findByIdAndUpdate(id, book, {
  //       new: true,
  //       runValidators: true,
  //     });
  //   }

  // async updateOneById(id: string, book: Book, user: User): Promise<Book> {
  //   const isValidId = mongoose.isValidObjectId(id);
  //   if (!isValidId) {
  //     throw new BadRequestException(`Please enter correct Id`);
  //   }
  //   const books = await this.bookModel.findByIdAndUpdate(id, book, {
  //     new: true,
  //     runValidators: true,
  //   });
  //   const data = Object.assign(book, { updatedBy: user._id });
  //   if (!books) {
  //     throw new NotFoundException(`Book with ID ${id} not found`);
  //   }
  //   return books;
  // }

  async updateOneById(id: string, book: Book, user: User): Promise<Book> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter a correct Id');
    }
    // Lấy sách hiện tại = search Id book
    const books = await this.bookModel.findById(id);
    if (!books) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    // Thêm trường updatedBy vào dữ liệu cập nhật
    const data = Object.assign(book, { updatedBy: user._id });
    // Cập nhật sách với dữ liệu mới
    const updatedBook = await this.bookModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    return updatedBook;
  }

  async deleteOneById(id: string): Promise<Book> {
    return await this.bookModel.findByIdAndDelete(id);
  }

  async deleteAll(): Promise<{ deletedCount?: number }> {
    return await this.bookModel.deleteMany({});
  }
}
