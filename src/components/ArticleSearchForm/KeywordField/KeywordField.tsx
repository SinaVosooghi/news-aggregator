import React from 'react';
import { TextField } from '@mui/material';

interface KeywordFieldProps {
  keyword: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const KeywordField: React.FC<KeywordFieldProps> = ({
  keyword,
  onChange,
}) => {
  return (
    <TextField
      label="Keyword"
      value={keyword}
      onChange={onChange}
      variant="outlined"
      className="form-control"
    />
  );
};
