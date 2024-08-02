import moment from 'moment';
import { SearchResponse } from '../services/interfaces';

export const normalizeDate = (date: string | undefined) => {
  if (date) {
    const momentDate = moment(date).format('YYYY-MM-DD');

    return momentDate;
  }

  return undefined;
};

export const filterByAuthor = (
  authors: string[],
  response: SearchResponse
): SearchResponse => {
  const result: SearchResponse = {
    articles: [],
    errors: response.errors,
    totalResults: response.totalResults,
  };

  for (const article of response.articles) {
    if (authors.includes(article.author)) {
      result.articles.push(article);
    }
  }

  return result;
};
