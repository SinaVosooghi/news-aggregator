import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

interface CategorySelectProps {
  selectedCategory: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  categories: string[];
}

export const CategorySelect: React.FC<CategorySelectProps> = ({
  selectedCategory,
  onChange,
  categories,
}) => {
  return (
    <FormControl variant="outlined">
      <InputLabel>Category</InputLabel>
      <Select value={selectedCategory} onChange={onChange} label="Category">
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
