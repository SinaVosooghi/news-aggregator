import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  ArticleSearch,
  NewsFeed,
  PersonalizedFeed,
  NotFound,
} from '@src/pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/search" element={<ArticleSearch />} />
        <Route path="/" element={<NewsFeed />} />
        <Route path="/preferences" element={<PersonalizedFeed />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
