Overview
This project is a news aggregator that provides a news feed at the root path ('/') and a search functionality at '/search'.

Prerequisites
Node.js v20.16.0
Installation
Clone the repository:
Bash
git clone https://github.com/SinaVosooghi/news-aggregator
Use code with caution.

Navigate to the project directory:
Bash
cd news-aggregator
Use code with caution.

Install dependencies:
Bash
yarn

Running the Application
Start the development server:
Bash
cp .env.example .env
yarn dev
Use code with caution.

Access the news aggregator in your web browser at http://localhost:5173/
Available Routes
/: Displays the news feed.
/search: Displays a search interface to filter news articles based on search parameters.


docker:

run docker compose -f docker-compose.yml up -d
app is available at: http://localhost:5173/