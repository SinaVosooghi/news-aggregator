import axios from 'axios';
import {
  EverythingParams,
  EverythingResponse,
  Source,
  SourcesResponse,
} from './types';
import { APIErrorResponse, APIError } from '@src/lib/api/shared/types';
import { handleError } from '../shared/helpers';

const NEWS_API_BASE_URL = 'https://newsapi.org/v2';
const API_KEY = import.meta.env.VITE_NEWSAPI_API_KEY;

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: NEWS_API_BASE_URL,
});

// Add an interceptor to append the API key to every request
axiosInstance.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    apiKey: API_KEY,
  };
  return config;
});

export const fetchEverything = async (
  params: EverythingParams
): Promise<EverythingResponse | APIError> => {
  try {
    const response = await axiosInstance.get<EverythingResponse>(
      `${NEWS_API_BASE_URL}/everything`,
      {
        params,
      }
    );
    return response.data;
  } catch (error) {
    return handleError(error as APIErrorResponse);
  }
};

export const getSources = async (): Promise<Source[] | APIError> => {
  try {
    const response = await axiosInstance.get<SourcesResponse>(
      `${NEWS_API_BASE_URL}/sources`
    );
    return response.data.sources;
  } catch (error) {
    return handleError(error as APIErrorResponse);
  }
};
