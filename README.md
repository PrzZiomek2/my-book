# MyBooks

A web application for book lovers. The app uses an OpenAI model to provide reading suggestions based on the user profile, preferences, and reading history. Additionally, the app includes book search, a book rating system, and a user account that allows users to create lists of favourites and reads. Furthermore, a user can rate books and add opinions. Based on those rates a book ranking is created. Project includes partial test coverage of routes, components and user actions.

### Tech stack

- TypeScript, Next.js, React.js, Material UI, MongoDB
- OpenAI API, Google Books API
- Cypress, JEST, RTL

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Requirements

Install [npm and node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) on your local machine.

## Installation

1. Enter `my-books` directory
2. Run in terminal:

```bash
npm install
```

It installs all packages listed in `package.json` file. If installation was successfull you are going to see `node_modules` folder created in `my-books` directory.

## Configuration

Create `.env` file and setup there environmental variables:

```bash
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

To make use of OpenAI backed functionalities you need to set `OPEN_AI_URL` and `OPENAI_API_KEY` in `.env` with your values.

## Run dev server

Run npm script in your terminal

```bash
npm run dev
```

## Run tests

Run npm script in your terminal

```bash
npm run test
```
