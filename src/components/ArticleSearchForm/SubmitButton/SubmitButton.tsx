import React from 'react';
import { Button } from '@mui/material';

interface SubmitButtonProps {}

export const SubmitButton: React.FC<SubmitButtonProps> = () => {
  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      className="submit-button"
    >
      Search
    </Button>
  );
};
