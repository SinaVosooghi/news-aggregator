import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SelectChangeEvent } from '@mui/material';
import { Moment } from 'moment';

import { searchArticlesRequest } from '@src/lib/redux/reducers/articleReducer';
import { KeywordField } from '@src/components/ArticleSearchForm/KeywordField';
import { CategorySelect } from '@src/components/ArticleSearchForm/CategorySelect';
import { SourceSelect } from '@src/components/ArticleSearchForm/SourceSelect';
import { SubmitButton } from '@src/components/ArticleSearchForm/SubmitButton';
import { DateFilter } from '@src/components/ArticleSearchForm/DateFilter';
import { SearchParams } from '@src/lib/services/interfaces';
import { RootState } from '@src/lib/redux/store';

import styles from './ArticleSeachForm.module.scss';

export const ArticleSearchForm: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSource, setSelectedSource] = useState('');
  const [selectedFromDate, setSelectedFromDate] = useState<Moment | null>(null);
  const [selectedToDate, setSelectedToDate] = useState<Moment | null>(null);

  const dispatch = useDispatch();
  const { sources, categories } = useSelector(
    (state: RootState) => state.articles.searchFilters
  );

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value);
  };

  const handleSourceChange = (event: SelectChangeEvent<string>) => {
    setSelectedSource(event.target.value);
  };

  const handleFromDateChange = (date: Moment | null) => {
    setSelectedFromDate(date);
  };

  const handleToDateChange = (date: Moment | null) => {
    setSelectedToDate(date);
  };

  const handleResetFilters = () => {
    setKeyword('');
    setSelectedCategory('');
    setSelectedSource('');
    setSelectedFromDate(null);
    setSelectedToDate(null);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const params: SearchParams = {
      keyword,
      category: [selectedCategory],
      source: selectedSource ? [selectedSource] : undefined,
      from: selectedFromDate?.toString() ?? undefined,
      to: selectedToDate?.toString() ?? undefined,
      page: 1,
    };
    dispatch(searchArticlesRequest(params));
  };

  return (
    <form onSubmit={handleSubmit} className={styles['article-search']}>
      <div className={styles['form-group']}>
        <KeywordField keyword={keyword} onChange={handleKeywordChange} />
        <CategorySelect
          selectedCategory={selectedCategory}
          onChange={handleCategoryChange}
          categories={categories}
        />
        <SourceSelect
          selectedSource={selectedSource}
          onChange={handleSourceChange}
          sources={sources}
        />
        <DateFilter
          handleFromDateChange={handleFromDateChange}
          handleToDateChange={handleToDateChange}
        />
        <button
          type="button"
          className={styles['reset-button']}
          onClick={handleResetFilters}
        >
          Reset Filters
        </button>
        <SubmitButton />
      </div>
    </form>
  );
};
