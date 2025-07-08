# Bol Multi select filter exercise
This project is a demonstration of a multi-select filter component built with React, TypeScript, and various modern web technologies. It showcases the use of React Router for routing, Tanstack Query for data fetching, and GraphQL for querying data.

## Tech Stack

### React Router
This project uses React Router v7 in framework mode for efficient routing and navigation. Integrated with Vite, it supports both server-side rendering (SSR) and seamless client-side navigation.

### Tanstack Query
Tanstack Query (formerly React Query) is used for data fetching and state management, providing a powerful and flexible way to handle server state in React applications. It simplifies data fetching, caching, synchronization, and background updates, making it easier to manage remote data in React applications.

### GraphQL
GraphQL is used for querying and mutating data, providing a flexible and efficient way to interact with APIs. It allows clients to request only the data they need, reducing over-fetching and under-fetching issues. 

On the client side, GraphQL is integrated with Tanstack Query for seamless data fetching and caching.

On the server side, GraphQL is implemented using GraphQL Yoga, a fully-featured GraphQL server that supports subscriptions, file uploads, and more. It is designed to be easy to use and flexible, making it a great choice for building GraphQL APIs. In this case, a simple demonstration of a GraphQL server is provided.

### Storybook
Storybook is used for developing and testing UI components in isolation. It provides a powerful environment for building and documenting components, making it easier to create reusable and maintainable UI elements.

All components are built with Storybook in mind and using interaction tests to ensure they work as expected. This allows for a more efficient development process and helps catch issues early in the development cycle.

## Running the project

### Requirements

- Node LTS (v22)
- pnpm

### Install dependencies

```bash
pnpm i
```

### Running the app

```bash
pnpm dev
```

Visit [http://localhost:5173](http://localhost:5173)

### Running storybook

```bash
pnpm storybook
```

Visit [http://localhost:6006](http://localhost:6006)
