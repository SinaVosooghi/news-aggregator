import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

interface SourceSelectProps {
  selectedSource: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  sources: string[];
}

export const SourceSelect: React.FC<SourceSelectProps> = ({
  selectedSource,
  onChange,
  sources,
}) => {
  return (
    <FormControl variant="outlined" className="form-control">
      <InputLabel>Source</InputLabel>
      <Select value={selectedSource} onChange={onChange} label="Source">
        {sources.map((source) => (
          <MenuItem key={source} value={source}>
            {source}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
