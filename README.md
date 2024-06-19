# Movie Search Application

## Overview

This is a React app that allows users to search for movies and view detailed information about them. It uses [OMDB API](https://www.omdbapi.com/) to fetch movie data. 

## Features
- **Movie Search**: Users can search for movies by entering a search term
- **Movie List**: Display a list of movies matching the users search term
- **Movie Details** Clicking on a movie from the list shows its details
- **Pagination**: Users can load more pages by clicking a button
- **404 Page**: Handles unknown routes elegantly with a 404 page

## Getting started
Prerequisties
- Node.js and npm: Make sure you have both installed. You can download them from [nodejs.org](https://nodejs.org/en)

## Installation
1. Clone the repo `git clone 

2. Navigate to the project directory:
`cd movie-search-app`

3. Install dependencies
`npm install`

4. Obtain an OMDB API Key: 
- Sign up for a free API key at OMDB API website
- Update the `API_KEY in the omdbApi.ts file with your API key.`

## Running the App
* Start the development server:
### `npm start`
Open your browser and go to http://localhost:3000.

## Testing the App
`npm run test`
## Building from Production
1. Create a production build
`npm run build`

2. Serve the production build locally (optional)
`npx serve -s build`

## Known issues and warnings:
* Ensure your API key from OMBD is active and has not exceeded its usuage limit



