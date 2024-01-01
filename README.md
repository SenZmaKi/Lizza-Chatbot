# Lizza-Chatbot
A chatbot web-app for Lapizza, a fictional pizza restaurant.

## Installation

Ensure you have [Node.js](https://nodejs.org/en/) installed.
```bash
git clone https://github.com/SenZmaKi/Lizza-Chatbot.git && cd Lizza-Chatbot && npm install

```

## Running the web-app

```bash
# Development
npm run start

# Development watch mode
npm run start:dev

# Production mode
npm run start:prod
```

## Backend API
Start the server in either of the development modes and navigate to http://localhost:3000/api-docs in your browser. This will open the Swagger UI, where you can read about, test and play around with the API.

By default the database is populated with dummy data on server start, you can find the data at `src/users/users.service.ts:UserService.populateDatabase`

By default the database is refreshed on every server start. To disable this behavior set `src/constants.ts:REFRESH_DATABASE` to `false`. Note that this will also disable the dummy data population.