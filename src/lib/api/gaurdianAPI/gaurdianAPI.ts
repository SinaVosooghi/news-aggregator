import axios from 'axios';
import {
  GaurdianFetchArticlesInput,
  GaurdianSectionsResponse,
  GuardianSearchApiResponse,
  GuardianSearchResponse,
  GuardianSectionsApiResponse,
} from './types';
import { APIErrorResponse, APIError } from '@src/lib/api/shared/types';
import { handleError } from '../shared/helpers';

const NEWS_API_BASE_URL = 'https://content.guardianapis.com';
const API_KEY = import.meta.env.VITE_GAURDIAN_API_KEY;

const axiosInstance = axios.create({
  baseURL: NEWS_API_BASE_URL,
});

// Add an interceptor to append the API key to every request
axiosInstance.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    'api-key': API_KEY,
  };
  return config;
});

export const fetchArticles = async (
  params: GaurdianFetchArticlesInput
): Promise<GuardianSearchResponse | APIError> => {
  try {
    const response = await axiosInstance.get<GuardianSearchApiResponse>(
      `${NEWS_API_BASE_URL}/search`,
      {
        params,
      }
    );
    return response.data.response;
  } catch (error) {
    return handleError(error as APIErrorResponse);
  }
};

export const fetchSections = async (): Promise<
  GaurdianSectionsResponse | APIError
> => {
  try {
    const response = await axiosInstance.get<GuardianSectionsApiResponse>(
      `${NEWS_API_BASE_URL}/sections`
    );
    return response.data.response;
  } catch (error) {
    return handleError(error as APIErrorResponse);
  }
};
