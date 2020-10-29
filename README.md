# Venus API (Sample)

Forked from	https://github.com/duccl/customer-api.git to demonstrate the Venus case study for [API Documentation for Developers](http://apidocsfordevs.com).

## Documentation
Documentation is hosted by Postman at https://web.postman.co/collections/1901092-0dcf92c6-fb74-4982-94d9-704a02a39281?version=latest&workspace=a5196713-6bb2-4ae6-8b57-37aa01dcd703

The documentation is only accessible by collaborators (people added to the Postman team). To gain access, speak to the dev manager for Venus.

## Requirements
- Node.js 10+
- MongoDB installed locally or Docker

## Setup
- Install dependencies: `npm install`

- Start a MongoDB server on your local machine on port 27017. An easy way is to use Docker: `docker run -it -p 27017:27017 --name venus-db -d mongo`.

- Run `npm run start` to start the application on http://localhost:3030

## Development
The codebase is written in TypeScript (the src/ directory). Run `npm run build` to start the TypeScript server that will compile the output JS (`dist/ directory) whenever you make a change.

## Contributing to the documentation
The documentation for the Venus API is powered by Postman. To update the documentation, you need to do the following:
- After modifying an endpoint, be sure to test it on your local Postman app in the Postman collection linked above.
- Click "Save" on the endpoint to save the updated endpoint to the collection.
- The documentation linked above will be automatically updated in a couple of minutes.