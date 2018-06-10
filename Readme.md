# Flight Delays Code Test

This is an implementation of a coding challenge to do with producing graphs of when flight delays are.

## Installation and running

Steps
1) clone the repository and open a terminal in the root 
2) Type npm install to get the dependencies (making sure it installs the dev dependencies as well - that is to say do not set the NODE_ENV to production)
3) type npm run dev. This will set the application running under nodemon.
4) go to localhost:3000/ (or whatever you configured the port to be - there is a json file in the config directory - see https://docs.npmjs.com/cli/config for details as the app uses this for configuration)

Notes
- npm run dev runs the backend code under nodemon and watches for changes. 
- The Parcel module bundler is called by the server side code in order to automatically watch and bundle the client side code.

## Roadmap

The application is still in development. But wanted to publish in github right from it being a skeleton app.

## Improvements and concerns

Some notes while developing around things I'm not fully satisfied with, but prioritized getting the application functional quickly over fixing

- do we need to validate the requests for chart data
- should style the app
- should probably use a 3rd party component for the airport selector with autocomplete, as it is currently missing being able to select with arrows, manually closing popup, etc.