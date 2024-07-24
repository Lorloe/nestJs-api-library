import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Category {
  ADVENTURE = 'Adventure',
  CLASSIC = 'Classic',
  FANTASY = 'Fantasy',
  HORROR = 'Horror',
  CRIME = 'Crime',
  MYSTERY = 'Mystery',
  ROMANCE = 'Romance',
  SCIENCE_FICTION = 'Science Fiction',
  THRILLER = 'Thriller',
  WESTERN = 'Western',
  DOCUMENT = 'Document',
  HISTORY = 'History',
  BIOGRAPHY = 'Biography',
  AUTOBIOGRAPHY = 'Autobiography',
  DICTIONARY = 'Dictionary',
  FUNNY = 'Funny',
  POETRY = 'Poetry',
  RELIGION = 'Religion',
  SELF_HELP = 'Self Help',
  SPORTS = 'Sports',
  TRAVEL = 'Travel',
  COMIC = 'Comic',
  HENTAI = 'HENTAI',
  MANGA = 'Manga',
  OTHER = 'Other',
}
@Schema({
  timestamps: true,
})
export class Book {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  author: string;

  @Prop()
  price: number;

  @Prop()
  category: Category;
}

export const BookSchema = SchemaFactory.createForClass(Book);
