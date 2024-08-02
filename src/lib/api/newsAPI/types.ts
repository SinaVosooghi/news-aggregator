// All the types are genrated based on https://newsapi.org/docs/endpoints

export type NewsAPIArticle = {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: Date;
  content: string | null;
};

export type EverythingResponse = {
  status: 'ok' | 'error';
  totalResults: number;
  articles: NewsAPIArticle[];
  code?: string;
  message?: string;
};

export type EverythingParams = {
  q?: string;
  category?: string;
  language?: string;
  from?: string | undefined;
  to?: string | undefined;
  pageSize?: number;
  page?: number;
};

export type Source = {
  id: string;
  name: string;
  category: string;
};

export type SourcesResponse = {
  status: string;
  sources: Source[];
};
