import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { ArticleCard } from '@src/components/ArticleCard';
import {
  fetchMoreArticlesRequest,
  searchArticlesRequest,
} from '@src/lib/redux/reducers/articleReducer';
import { Header } from '@src/components/Header';
import type { RootState } from '@src/lib/redux/store';

import styles from './NewsFeed.module.scss';

export const NewsFeed: React.FC = () => {
  const articles = useSelector(
    (state: RootState) => state.articles.data.articles
  );

  const { loading, error, hasMore } = useSelector(
    (state: RootState) => state.articles
  );

  const searchParams = useSelector(
    (state: RootState) => state.feed.searchParams
  );

  const dispatch = useDispatch();
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const initSearch = () => {
      dispatch(searchArticlesRequest({ ...searchParams, page: 1 }));
    };

    initSearch();
  }, [dispatch, searchParams]);

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
        title="News Feed"
        buttons={[
          <Link to="/preferences">Customize Feed</Link>,
          <Link to="/search">Search for News</Link>,
        ]}
      ></Header>
      <div className={styles['news-feed-container']}>
        <div className={styles['article-results']}>
          {articles.map((article, index) => (
            <ArticleCard
              key={article.url}
              article={article}
              ref={index === articles.length - 1 ? lastArticleRef : null}
            />
          ))}
          {loading && <p className={styles['loading']}>Loading...</p>}
          {error && <p className={styles['error']}>Error: {error}</p>}
          {articles.length === 0 && (
            <p>No results yet, modify preferences to get news!</p>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
