import {
  EverythingParams,
  EverythingResponse,
  NewsAPIArticle,
  Source,
  fetchEverything,
  getSources,
} from '../api/newsAPI';
import { isAPIError } from '../api/shared/helpers';
import type { APIError } from '../api/shared/types';
import {
  IAPIService,
  SearchParams,
  SearchResponse,
  TotalResult,
} from './interfaces';
import { Article } from './types';
import { normalizeDate } from '../utils/helpers';

export class NewsAPIService implements IAPIService {
  private categories: string[] = [];
  public serviceName = 'NewsAPI';

  public getSearchCategories = async (): Promise<string[]> => {
    await this.initSearchFilters();

    // NOTE: newsapi does not support category params for now, so we should ommit it's categories!
    // return this.categories;
    return [];
  };

  public searchArticles = async (
    params: SearchParams,
    totalResults?: TotalResult
  ): Promise<SearchResponse> => {
    if (
      params.page * 10 > (totalResults?.newsapi ?? 20) ||
      (params.source?.length && params.source.includes(this.serviceName)) ||
      // // NOTE: newsapi does not support category params for now, so we should ommit it's categories!
      !params.category?.includes('')
    ) {
      return {
        articles: [],
        totalResults: { newsapi: 0 },
        errors: [],
      };
    }

    const articles = [];
    const errors: APIError[] = [];
    let response;

    // Prepare params for NewsAPI
    const searchParams: EverythingParams = {
      q: params.keyword,
      from: normalizeDate(params.from),
      to: normalizeDate(params.to),
      language: 'en',
      pageSize: 10,
      page: params.page,
    };

    const newsAPIResponse = await fetchEverything(searchParams);
    if ('status' in newsAPIResponse && newsAPIResponse.status === 'error') {
      errors.push(newsAPIResponse as APIError);
    } else {
      response = newsAPIResponse as EverythingResponse;
      articles.push(...response.articles);
    }

    const result: SearchResponse = {
      articles: this.normalizeArticles(articles),
      totalResults: {
        newsapi: response?.status === 'ok' ? response.totalResults : 0,
      },
      errors,
    };

    return result;
  };

  private initSearchFilters = async () => {
    let sources: Source[] = [];

    const response = await getSources();
    if (!isAPIError(response)) {
      sources = response;
    }

    sources.map((source) => {
      if (this.categories.indexOf(source.category) < 0) {
        this.categories.push(source.category);
      }
    });
  };

  private normalizeArticles = (articles: NewsAPIArticle[]): Article[] => {
    const Articles: Article[] = [];

    articles.map((article) =>
      Articles.push({
        author: article.author || '',
        description: article.description || '',
        image: article.urlToImage || '',
        publishDate: article.publishedAt,
        source: article.source.name,
        title: article.title,
        url: article.url,
      })
    );

    return Articles;
  };
}
