import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { ArticleSearchForm } from '@src/components/ArticleSearchForm';
import type { RootState } from '@src/lib/redux/store';
import { ArticleCard } from '@src/components/ArticleCard';
import {
  fetchMoreArticlesRequest,
  initSearchFilters,
} from '@src/lib/redux/reducers/articleReducer';
import { Header } from '@src/components/Header';

import styles from './ArticleSearch.module.scss';

export const ArticleSearch: React.FC = () => {
  const articles = useSelector(
    (state: RootState) => state.articles.data.articles
  );

  const { loading, error, hasMore } = useSelector(
    (state: RootState) => state.articles
  );

  const dispatch = useDispatch();
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    dispatch(initSearchFilters());
  }, [dispatch]);

  const lastArticleRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(fetchMoreArticlesRequest());
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore, dispatch]
  );

  return (
    <React.Fragment>
      <Header
        title="Customize News Feed"
        buttons={[<Link to="/">Jump to news feed</Link>]}
      />
      <React.Fragment>
        <ArticleSearchForm />

        <div className={styles['article-results']}>
          {articles.map((article, index) => (
            <ArticleCard
              key={article.url}
              article={article}
              ref={index === articles.length - 1 ? lastArticleRef : null}
            />
          ))}
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {articles.length === 0 && (
            <p>No results yet, modify filters and search to get articles!</p>
          )}
        </div>
      </React.Fragment>
    </React.Fragment>
  );
};
