import { SearchParams } from '../interfaces';

export type Article = {
  title: string;
  description: string;
  author: string;
  url: string;
  image: string;
  source: string;
  publishDate: Date;
};

export type SearchParamsWithCategory = Omit<SearchParams, 'category'> & {
  category: string[];
};
export type CategorizedSearchParams = Omit<SearchParams, 'category'> & {
  category: string;
};
