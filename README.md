# [Zero](https://github.com/RootbeerComputer/zero) to GraphQL Server Generator (Inactive)

This README is GPT generated lmao

## Overview

This project provides a simple yet powerful tool to generate GraphQL servers from user-provided schema definitions. It leverages Docker to containerize each GraphQL server instance and configures routing dynamically using Nginx. The current setup is designed to run on a single VM.

## How It Works

1. **GraphQL Schema Submission**: Users submit their GraphQL schema definitions through a POST request to the `/create-api` endpoint.
2. **Server Generation**: The submitted schema is saved as a `.graphql` file, and a Docker container is spun up to host the GraphQL server using the provided schema.
3. **Dynamic Routing**: An Nginx configuration is dynamically updated to route requests to the new server instance. Each server is given a unique subdomain under `zerotogql.com`.
4. **Server Access**: Users are provided with a unique URL to access their newly created GraphQL API.

## Setup

To get started with this setup on a VM, ensure you have the following prerequisites installed:

- Node.js
- Docker
- Nginx

Clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd <repository-directory>
npm install
```

```bash
npm start
```

## Usage

To create a new GraphQL server, send a POST request to `/create-api` with the GraphQL schema in the request body:

```bash
curl -X POST http://localhost:3000/create-api -H "Content-Type: application/json" -d '{"schema": "type Query { hello: String }"}'
```

You will receive a response with the URL to access your GraphQL server:

```json
{
  "message": "API Created!",
  "url": "https://unique-subdomain.zerotogql.com"
}
```

Should probably update to have a serverless apporoach instead of running on a single VM
