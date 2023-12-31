# RSS Aggregator

RSS Aggregator is a web application that aggregates RSS feeds from various entrepreneurship sources.

## Features

- Fetches and parses RSS feeds from multiple sources
- Stores articles in a database
- Provides a RESTful API to access the articles
- Displays the articles on the frontend

## Technologies Used

- Django: a high-level Python web framework
- Django REST Framework: a powerful toolkit for building Web APIs
- Python: the programming language used for the backend
- React: a JavaScript library for building user interfaces
- Axios: a popular HTTP client for making API requests

## Installation

1. Clone the repository:

`git clone https://github.com/jaypee15/lux-rss.git`


2. Set up the backend:

- Change to the backend directory: `cd luxovant/rss_feed`
- Install dependencies: `pip install -r requirements.txt`
- Run database migrations: `python manage.py migrate`
- Start the development server: `python manage.py runserver`

3. Set up the frontend:

- Change to the frontend directory: `cd fronted`
- Install dependencies: `npm install`
- Start the development server: `npm start`

4. Access the application at [http://localhost:3000](http://localhost:3000).

## Usage

- To add RSS feed sources, use the Django admin interface and provide the title and URL of each feed.
- Run the `fetchfeeds` management command (`python manage.py fetchfeeds`) to fetch and parse the RSS feeds.
- Access the articles through the RESTful API endpoints provided by the Django backend (`/api/articles/`).
- The frontend displays the articles retrieved from the API.

## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push the changes to your forked repository: `git push origin feature/your-feature-name`
5. Submit a pull request describing your changes

## License

This project is licensed under the [MIT License](LICENSE).
