import { fetchArticles } from '@src/lib/api/nytimesAPI';
import { nyTimesAddress, nyTimesSections } from '@src/lib/constants';
import type {
  IAPIService,
  SearchParams,
  SearchResponse,
  TotalResult,
} from './interfaces';
import type {
  ArticleSearchParams,
  ArticleSearchResponse,
  NytimesArticle,
} from '@src/lib/api/nytimesAPI';
import type { APIError } from '@src/lib/api/shared/types';
import type {
  Article,
  CategorizedSearchParams,
  SearchParamsWithCategory,
} from './types';
import { filterByAuthor, normalizeDate } from '../utils/helpers';

export class NytimesAPIService implements IAPIService {
  public serviceName = 'New York Times';
  private totalResults: Record<string, number> = {};

  public searchArticles = async (
    params: SearchParams,
    totalResults?: TotalResult
  ): Promise<SearchResponse> => {
    if (
      params.page * 10 > (totalResults?.nytimes ?? 20) ||
      (params.source &&
        params.source.length > 0 &&
        !params.source.includes(this.serviceName))
    ) {
      return {
        articles: [],
        totalResults: { nytimes: 0 },
        errors: [],
      };
    }

    let result: SearchResponse;

    if (params.category && params.category.length) {
      result = await this.fetchArticles(params as SearchParamsWithCategory);
    } else {
      result = await this.fetchArticles({
        ...params,
        category: [''],
      });
    }

    if (params.author && params.author.length > 0) {
      result = filterByAuthor(params.author as string[], result);
    }

    return result;
  };

  public getSearchCategories = async (): Promise<string[]> => {
    return nyTimesSections;
  };

  private normalizeArticles = (articles: NytimesArticle[]): Article[] => {
    const Articles: Article[] = [];

    articles.map((article) =>
      Articles.push({
        author: article.byline.original,
        description: article.lead_paragraph,
        image: article.multimedia[0]
          ? nyTimesAddress + article.multimedia[0]?.url
          : '',
        publishDate: article.pub_date,
        source: article.source,
        title: article.snippet,
        url: article.web_url,
      })
    );

    return Articles;
  };

  private buildArticleSearchParams = (
    params: CategorizedSearchParams
  ): ArticleSearchParams => {
    const query = [];
    if (params.keyword) {
      query.push(params.keyword);
    }
    if (params.category) {
      query.push(`section_name:("${params.category}")`);
    }

    return {
      fq: query.join(' AND '),
      begin_date: normalizeDate(params.from),
      end_date: normalizeDate(params.to),
      page: params.page - 1,
    };
  };

  private fetchArticles = async (
    params: SearchParamsWithCategory
  ): Promise<SearchResponse> => {
    const articles = [];
    const errors: APIError[] = [];

    if (params.page === 1) {
      this.totalResults = {};
    }

    for (const category of params.category) {
      if (
        this.totalResults[`${category}`] &&
        this.totalResults[`${category}`] < (params.page - 1) * 10
      ) {
        continue;
      }
      const searchParams = this.buildArticleSearchParams({
        ...params,
        category: category,
      });

      const gaurdianAPIResponse = await fetchArticles(searchParams);

      if (
        'status' in gaurdianAPIResponse &&
        gaurdianAPIResponse.status === 'error'
      ) {
        errors.push(gaurdianAPIResponse as APIError);
      } else {
        const response = gaurdianAPIResponse as ArticleSearchResponse;

        articles.push(...response.response.docs);
        this.totalResults[`${category}`] = response.response.meta.hits;
      }
    }

    const result: SearchResponse = {
      articles: this.normalizeArticles(articles),
      totalResults: {
        gaurdian: Math.max(...Object.values(this.totalResults)),
      },
      errors,
    };

    return result;
  };
}
