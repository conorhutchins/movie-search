# Movie Search Application

## Overview

This is a React app that allows users to search for movies and view detailed information about them. It uses the [OMDB API](https://www.omdbapi.com/) to fetch movie data.

## Features
- **Movie Search**: Users can search for movies by entering a search term.
- **Movie List**: Displays a list of movies matching the search term.
- **Movie Details**: Clicking on a movie from the list shows its details.
- **Pagination**: Users can load more movies by clicking a button.
- **404 Page**: Handles unknown routes gracefully with a 404 page.

## Getting Started

### Prerequisites
- **Node.js and npm**: Ensure you have both installed. You can download them from [nodejs.org](https://nodejs.org/en).

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/conorhutchins/movie-search.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd movie-search-app
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Obtain an OMDB API Key**:
   - Sign up for a free API key at the [OMDB API](https://www.omdbapi.com/apikey.aspx) website.
   - Update the `API_KEY` in the `omdbApi.ts` file with your API key.

### Running the Application

1. **Start the development server**:
   ```bash
   npm start
   ```
   - Open your browser and go to [http://localhost:3000](http://localhost:3000).

### Testing the Application

1. **Run the tests**:
   ```bash
   npm run test
   ```

### Building for Production

1. **Create a production build**:
   ```bash
   npm run build
   ```

2. **Serve the production build locally (optional)**:
   ```bash
   npx serve -s build
   ```
   - This serves the production build at [http://localhost:5000](http://localhost:5000).

## Known Issues and Warnings

- Ensure your API key from OMDB is active and has not exceeded its usage limit.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

- **Conor Hutchins**: [conorhutchins@btinternet.com](mailto:conorhutchins@btinternet.com)
- **GitHub**: [conorhutchins](https://github.com/conorhutchins)
