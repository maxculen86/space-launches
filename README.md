# Space Launches Project

This project is a React-based web application that displays information about space launches using GraphQL and Apollo Client. It fetches data from a space launches API and presents it in both table and grid views.

## Features

- Displays a list of space launches with details like mission name, rocket name, and launch site
- Supports both table and grid view layouts
- Implements infinite scrolling to load more launches as the user scrolls
- Uses GraphQL for efficient data fetching
- Fully typed with TypeScript
- Responsive design for various screen sizes

## Technologies Used

- React
- TypeScript
- Apollo Client
- GraphQL
- Vite (for build tooling)
- Tailwind CSS (for styling)
- Vitest (for testing)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## Installation

To install the Space Launches project, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/your-username/space-launches.git
   ```

2. Navigate to the project directory:
   ```
   cd space-launches
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory of the project.
2. Add the following environment variable:
   ```
   VITE_GRAPHQL_API_URL=https://your-graphql-api-url.com
   ```
   Replace `https://your-graphql-api-url.com` with the actual URL of your GraphQL API.

## Usage

To run the project locally:

1. Start the development server:
   ```
   npm run dev
   ```

2. Open your browser and visit `http://localhost:5173` (or the port shown in your terminal).

## Building for Production

To create a production build:

1. Run the build command:
   ```
   npm run build
   ```

2. The built files will be in the `dist` directory, which you can then deploy to your hosting service.

## Running Tests

To run the test suite:

```
npm run test
```

## Contributing

Contributions to the Space Launches project are welcome. Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b <branch_name>`.
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to the original branch: `git push origin <project_name>/<location>`
5. Create the pull request.

Alternatively, see the GitHub documentation on [creating a pull request](https://help.github.com/articles/creating-a-pull-request/).

## License

This project is licensed under the [MIT License](LICENSE.md).

## Contact

If you want to contact me, you can reach me at `<your_email@example.com>`.

## Acknowledgements

- [Apollo GraphQL](https://www.apollographql.com/)
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)