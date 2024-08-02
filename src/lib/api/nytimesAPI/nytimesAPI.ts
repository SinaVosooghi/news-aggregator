import axios from 'axios';
import { APIErrorResponse, APIError } from '../shared/types';
import { ArticleSearchParams, ArticleSearchResponse } from './types';

const NYTIMES_API_BASE_URL = 'https://api.nytimes.com/svc/search/v2';
const NYTIMES_API_KEY = import.meta.env.VITE_NYTIMES_API_KEY;

const nytimesAxiosInstance = axios.create({
  baseURL: NYTIMES_API_BASE_URL,
});

nytimesAxiosInstance.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
      'api-key': NYTIMES_API_KEY,
    };
    return config;
  },
  (error) => Promise.reject(error)
);

const handleError = (error: APIErrorResponse): APIError => {
  const defaultError = {
    status: 'error',
    code: 'unexpectedError',
    message: 'An unexpected error occurred',
  };

  if (!error.response) {
    return defaultError;
  }

  const { status, data } = error.response;
  let code = 'unexpectedError';
  let message = 'An unexpected error occurred';

  if (status === 400) {
    code = data.code || 'parameterInvalid';
    message =
      data.message ||
      'Bad request. The request was unacceptable, often due to a missing or misconfigured parameter.';
  } else if (status === 401) {
    code = 'apiKeyInvalid';
    message =
      "Unauthorized. Your API key was missing from the request, or wasn't correct.";
  } else if (status === 429) {
    code = 'rateLimited';
    message =
      'Too many requests. You made too many requests within a window of time and have been rate limited. Back off for a while.';
  } else if (status === 500) {
    code = 'unexpectedError';
    message = 'Server error. Something went wrong on our side.';
  } else {
    code = data.code || code;
    message = data.message || message;
  }

  return { status: 'error', code, message };
};

export const fetchArticles = async (
  params: ArticleSearchParams
): Promise<ArticleSearchResponse | APIError> => {
  try {
    const response = await nytimesAxiosInstance.get<ArticleSearchResponse>(
      '/articlesearch.json',
      { params }
    );
    return response.data;
  } catch (error) {
    return handleError(error as APIErrorResponse);
  }
};
