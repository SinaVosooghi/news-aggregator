import { APIError } from '@src/lib/api/shared/types';
import { SearchParams, SearchResponse, TotalResult } from './interfaces';
import { Article } from './types';
import { NewsAPIService, NytimesAPIService } from './';
import moment from 'moment';
import { SearchFilter } from '../redux/reducers/articleReducer';
import { GaurdianAPIService } from './GaurdianAPIService';

interface IArticleSearchService {
  getSearchFilters: () => Promise<SearchFilter>;
  searchArticles: (
    params: SearchParams,
    totalResults?: TotalResult
  ) => Promise<SearchResponse>;
}

export class ArticleSearchService implements IArticleSearchService {
  newsAPIService: NewsAPIService;
  nytimesAPIService: NytimesAPIService;
  gaurdianAPIService: GaurdianAPIService;

  constructor() {
    this.newsAPIService = new NewsAPIService();
    this.nytimesAPIService = new NytimesAPIService();
    this.gaurdianAPIService = new GaurdianAPIService();
  }

  public getSearchFilters = async (): Promise<SearchFilter> => {
    const [
      newsAPISearchCategories,
      nytimesAPISearchCategories,
      gaurdianAPISearchCategories,
    ] = await Promise.all([
      this.newsAPIService.getSearchCategories(),
      this.nytimesAPIService.getSearchCategories(),
      this.gaurdianAPIService.getSearchCategories(),
    ]);

    const sources = [
      this.newsAPIService.serviceName,
      this.nytimesAPIService.serviceName,
      this.gaurdianAPIService.serviceName,
    ];

    const categories = [
      ...newsAPISearchCategories,
      ...nytimesAPISearchCategories,
      ...gaurdianAPISearchCategories,
    ];

    return {
      sources,
      categories: categories.filter(
        (item, index) => categories.indexOf(item) === index
      ),
    };
  };

  // Service to search articles from both APIs
  public searchArticles = async (
    params: SearchParams,
    totalResults?: TotalResult
  ): Promise<SearchResponse> => {
    let errors: APIError[] = [];
    let articles: Article[] = [];

    const [newsAPIResponse, nytimesAPIResponse, gaurdianAPIResponse] =
      await Promise.all([
        this.newsAPIService.searchArticles(params, totalResults),
        this.nytimesAPIService.searchArticles(params, totalResults),
        this.gaurdianAPIService.searchArticles(params, totalResults),
      ]);

    articles = [
      ...newsAPIResponse.articles,
      ...nytimesAPIResponse.articles,
      ...gaurdianAPIResponse.articles,
    ].sort((a: Article, b: Article) =>
      moment(a.publishDate).isBefore(moment(b.publishDate)) ? 1 : -1
    );
    errors = [...newsAPIResponse.errors, ...nytimesAPIResponse.errors];

    return {
      articles,
      totalResults: {
        newsapi: newsAPIResponse.totalResults.newsapi,
        nytimes: nytimesAPIResponse.totalResults.nytimes,
        gaurdian: gaurdianAPIResponse.totalResults.gaurdian,
      },
      errors,
    };
  };
}
