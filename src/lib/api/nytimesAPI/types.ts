export interface ArticleSearchParams {
  q?: string;
  fq?: string;
  sort?: string;
  page?: number;
  begin_date?: string;
  end_date?: string;
}

export interface ArticleSearchResponse {
  status: string;
  response: {
    docs: NytimesArticle[];
    meta: {
      hits: number;
      offset: number;
      time: number;
    };
  };
}

export interface NytimesArticle {
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  abstract: string;
  print_page: string;
  source: string;
  multimedia: Multimedia[];
  headline: {
    main: string;
    kicker: string;
    content_kicker: string;
    print_headline: string;
    name: string;
    seo: string;
    sub: string;
  };
  keywords: Keyword[];
  pub_date: Date;
  document_type: string;
  news_desk: string;
  section_name: string;
  byline: {
    original: string;
    person: Person[];
    organization: string;
  };
  type_of_material: string;
  _id: string;
  word_count: number;
}

export interface Multimedia {
  rank: number;
  subtype: string;
  caption: string;
  credit: string;
  type: string;
  url: string;
  height: number;
  width: number;
  legacy: {
    xlarge: string;
    xlargewidth: number;
    xlargeheight: number;
  };
  crop_name: string;
}

export interface Keyword {
  name: string;
  value: string;
  rank: number;
  major: string;
}

export interface Person {
  firstname: string;
  middlename: string;
  lastname: string;
  qualifier: string;
  title: string;
  role: string;
  organization: string;
  rank: number;
}
