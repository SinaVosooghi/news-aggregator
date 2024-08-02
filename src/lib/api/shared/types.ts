export interface APIErrorResponse {
  response?: {
    status: number;
    data: {
      code?: string;
      message?: string;
    };
  };
}

export interface APIError {
  status: string;
  code: string;
  message: string;
}
