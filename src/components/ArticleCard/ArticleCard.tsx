import React, { forwardRef } from 'react';
import { Card, CardContent, Typography, Link, CardMedia } from '@mui/material';

import type { Article } from '@src/lib/services/types';
import NoPhoto from '@src/assets/no-image.jpg';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.ForwardRefExoticComponent<
  React.PropsWithoutRef<ArticleCardProps> & React.RefAttributes<HTMLDivElement>
> = forwardRef<HTMLDivElement, ArticleCardProps>(({ article }, ref) => {
  return (
    <Card key={article.title} className="article-card" ref={ref}>
      <CardMedia
        component="img"
        height="200"
        image={article.image || NoPhoto}
        alt={article.title}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {article.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {article.description}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <strong>Author:</strong> {article.author}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <strong>Source:</strong> {article.source}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <strong>Published Date:</strong>{' '}
          {new Date(article.publishDate).toLocaleDateString()}
        </Typography>
        <Link href={article.url} target="_blank" rel="noopener">
          Read more
        </Link>
      </CardContent>
    </Card>
  );
});
