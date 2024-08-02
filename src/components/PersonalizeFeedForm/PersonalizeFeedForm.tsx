import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  FormControl,
  FormLabel,
  Checkbox,
  MenuItem,
  Select,
  SelectChangeEvent,
  ListItemText,
} from '@mui/material';

import { RootState } from '@src/lib/redux/store';
import { setPreferences } from '@src/lib/redux/reducers/feedReducer';
import { initSearchFilters } from '@src/lib/redux/reducers/articleReducer';

import styles from './PersonalizeFeedForm.module.scss';

export const PersonalizeFeedFrom = () => {
  const dispatch = useDispatch();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [newAuthor, setNewAuthor] = useState('');
  const [authors, setAuthors] = useState<string[]>([]); // Your existing authors list

  const {
    category: currentCategories,
    source: currentSources,
    author: currentAuthors,
  } = useSelector((state: RootState) => state.feed.searchParams);

  const { source: sources, category: categories } = useSelector(
    (state: RootState) => state.articles.searchParams
  );

  useEffect(() => {
    dispatch(initSearchFilters());

    setSelectedCategories(currentCategories || []);
    setSelectedSources(currentSources || []);
    setAuthors(currentAuthors || []);
  }, [currentAuthors, currentCategories, currentSources, dispatch]);

  const handleSave = () => {
    dispatch(
      setPreferences({
        source: selectedSources,
        category: selectedCategories,
        author: authors,
      })
    );
  };

  const handleCategoryChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedCategories(event.target.value as unknown as string[]);
  };

  const handleSourceChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedSources(event.target.value as unknown as string[]);
  };

  const handleNewAuthorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewAuthor(event.target.value);
  };

  const handleAddAuthor = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && newAuthor.trim() !== '') {
      setAuthors([...authors, newAuthor.trim()]);
      setNewAuthor(''); // Clear input after adding
    }
  };

  const handleDeleteAuthor = (author: string) => {
    setAuthors(authors.filter((item) => item !== author));
  };

  return (
    <div className={styles['personalize-feed-container']}>
      <FormControl fullWidth margin="normal">
        <FormLabel id="categories">Categories</FormLabel>
        <Select
          labelId="categories"
          id="categories-select"
          multiple={true}
          value={selectedCategories}
          onChange={handleCategoryChange}
          renderValue={(selected) => selected.join(', ')}
          label="Categories"
        >
          {categories?.map((category) => (
            <MenuItem key={category} value={category}>
              <Checkbox checked={selectedCategories.includes(category)} />
              <ListItemText primary={category} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <FormLabel id="sources">Sources</FormLabel>
        <Select
          labelId="sources"
          id="sources-select"
          multiple
          value={selectedSources}
          onChange={handleSourceChange}
          label="Sources"
        >
          {sources?.map((source) => (
            <MenuItem key={source} value={source}>
              {source}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <FormLabel id="authors">Authors</FormLabel>
        <input
          id="authors-input"
          className={styles['authors-input']}
          value={newAuthor}
          onChange={handleNewAuthorChange}
          onKeyDown={handleAddAuthor}
          placeholder="Type author name and press Enter to add"
        />
      </FormControl>
      <ul>
        {authors.map((author) => (
          <li key={author}>
            {author}
            <button type="button" onClick={() => handleDeleteAuthor(author)}>
              &#x2716; {/* This is the unicode character for a 'x' mark */}
            </button>
          </li>
        ))}
      </ul>
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save Preferences
      </Button>
    </div>
  );
};
