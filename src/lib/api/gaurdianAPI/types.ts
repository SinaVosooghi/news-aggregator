export interface GuardianSearchApiResponse {
  response: GuardianSearchResponse;
}

export interface GuardianSearchResponse {
  status: string;
  userTier: string;
  total: number;
  startIndex: number;
  pageSize: number;
  currentPage: number;
  pages: number;
  orderBy: string;
  results: GaurdianArticle[];
}

export interface GaurdianArticle {
  id: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: Date;
  webTitle: string;
  webUrl: string;
  fields: Fields;
  elements: Element[];
}

export interface GaurdianFetchArticlesInput {
  page: number;
  q?: string;
  'from-date'?: string;
  'to-date'?: string;
  section?: string;
  'show-elements': string;
  'show-fields': string;
  pageSize?: number;
  orderBy?: string;
}

export interface GuardianSectionsApiResponse {
  response: GaurdianSectionsResponse;
}

export interface GaurdianSectionsResponse {
  status: string;
  userTier: string;
  total: number;
  results: GaurdianSection[];
}

export interface GaurdianSection {
  id: string;
  webTitle: string;
}

type Fields = {
  trailText?: string;
  byline?: string;
  publication?: string;
};

type Element = {
  assets: Asset[];
};

type Asset = {
  file: string;
};
