import {
  fetchArticles,
  fetchSections,
  GaurdianArticle,
  GaurdianFetchArticlesInput,
  GaurdianSection,
  GuardianSearchResponse,
} from '@src/lib/api/gaurdianAPI';
import type {
  IAPIService,
  SearchParams,
  SearchResponse,
  TotalResult,
} from './interfaces';
import type { APIError } from '@src/lib/api/shared/types';
import type { Article } from './types';
import { isAPIError } from '../api/shared/helpers';
import { filterByAuthor, normalizeDate } from '../utils/helpers';

type SearchParamsWithCategory = Omit<SearchParams, 'category'> & {
  category: string[];
};
type CategorizedSearchParams = Omit<SearchParams, 'category'> & {
  category: string;
};

export class GaurdianAPIService implements IAPIService {
  private categories: GaurdianSection[] = [];
  public serviceName = 'Gaurdian News';
  private totalResults: Record<string, number> = {};

  public searchArticles = async (
    params: SearchParams,
    totalResults?: TotalResult
  ): Promise<SearchResponse> => {
    if (
      params.page * 10 > (totalResults?.gaurdian ?? 20) ||
      (params.source?.length && !params.source?.includes(this.serviceName))
    ) {
      return {
        articles: [],
        totalResults: { gaurdian: 0 },
        errors: [],
      };
    }

    let result: SearchResponse;

    if (params.category && params.category.length > 0) {
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
    const response = await fetchSections();
    if (!isAPIError(response)) {
      this.categories = response.results;
    }

    return this.categories.map((category) => category.webTitle);
  };

  private normalizeArticles = (articles: GaurdianArticle[]): Article[] => {
    const Articles: Article[] = [];

    articles.map((article) =>
      Articles.push({
        author: article.fields?.byline ?? '',
        description: article.fields?.trailText ?? 'No Body',
        image: article.elements?.[0]?.assets?.[0]?.file ?? '',
        publishDate: article.webPublicationDate,
        source: article.fields?.publication ?? '',
        title: article.webTitle,
        url: article.webUrl,
      })
    );

    return Articles;
  };

  private buildArticleSearchParams = (
    params: CategorizedSearchParams
  ): GaurdianFetchArticlesInput => {
    const result: GaurdianFetchArticlesInput = {
      q: params.keyword,
      'from-date': normalizeDate(params.from),
      'to-date': normalizeDate(params.to),
      'show-fields': 'trailText,byline,publication',
      'show-elements': 'image',
      page: params.page,
    };

    result.section = params.category.toLowerCase().replace(/\s+/g, '-');

    if (result.section === '') {
      delete result.section;
    }

    return result;
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
        const response = gaurdianAPIResponse as GuardianSearchResponse;

        articles.push(...response.results);
        this.totalResults[`${category}`] = response.total;
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
