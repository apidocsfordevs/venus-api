# Venus API

Forked from	https://github.com/duccl/customer-api.git to demonstrate the Venus case study for [API Documentation for Developers](http://apidocsfordevs.com).

## Requirements
- Node.js 10+
- MongoDB installed locally or Docker

## Setup
- Install dependencies: `npm install`

- Start a MongoDB server on your local machine on port 27017. An easy way is to use Docker: `docker run -it -p 27017:27017 --name venus-db -d mongo`.

- Run `npm run start` to start the application on http://localhost:3030

## Development
The codebase is written in TypeScript (the src/ directory). Run `npm run build` to start the TypeScript server that will compile the output JS (`dist/ directory) whenever you make a change.