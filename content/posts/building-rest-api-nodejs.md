---
title: "Building a Production-Ready REST API with Node.js"
date: "25-12-2024"
cover: "/pfp.jpeg"
author: "atharva"
description: "Learn how to build a scalable, production-ready REST API using Node.js, Express, and TypeScript with best practices."
---

Building APIs is one of the most common tasks for backend developers. In this guide, I'll walk you through creating a production-ready REST API using Node.js.

## Setting Up the Project

First, let's initialize our project with TypeScript support:

```bash
mkdir my-api && cd my-api
npm init -y
npm install express cors helmet
npm install -D typescript @types/express @types/node ts-node-dev
```

Create a `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Creating the Express Server

Here's our main entry point:

```typescript
import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Adding Routes and Controllers

Let's create a structured approach with routes and controllers:

```typescript
// src/controllers/userController.ts
import { Request, Response } from "express";

interface User {
  id: string;
  name: string;
  email: string;
}

const users: User[] = [];

export const getUsers = (req: Request, res: Response) => {
  res.json(users);
};

export const createUser = (req: Request, res: Response) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const user: User = {
    id: crypto.randomUUID(),
    name,
    email,
  };

  users.push(user);
  res.status(201).json(user);
};
```

## Error Handling

Proper error handling is crucial for production APIs:

```typescript
// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  console.error(err);
  res.status(500).json({
    error: "Internal server error",
  });
};
```

## Best Practices

Here are some key takeaways for building production APIs:

1. **Always validate input** - Use libraries like Zod or Joi
2. **Implement rate limiting** - Protect against abuse
3. **Use proper HTTP status codes** - Be consistent and follow standards
4. **Log everything** - Use structured logging for debugging
5. **Write tests** - Unit and integration tests are essential

### Conclusion

Building a REST API doesn't have to be complicated. With the right structure and best practices, you can create maintainable and scalable APIs that serve your users well.

Happy coding!
