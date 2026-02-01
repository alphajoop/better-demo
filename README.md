# Better Auth Demo

A complete authentication demo using [Better Auth](https://better-auth.com) with Next.js, MongoDB, and multiple authentication providers.

## Features

- ✅ Email & Password authentication
- ✅ GitHub OAuth integration
- ✅ MongoDB database adapter
- ✅ Session management
- ✅ Protected routes
- ✅ Responsive UI with Tailwind CSS

## Getting Started

### Prerequisites

1. **MongoDB** - Make sure you have MongoDB running locally or have a connection string
2. **GitHub OAuth App** - Create a GitHub OAuth app for social login

### Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/better-demo
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

### Installation

```bash
bun install
```

### Run the Development Server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Authentication Flow

1. **Home Page** (`/`) - Login and signup forms
2. **Dashboard** (`/dashboard`) - Protected route for authenticated users
3. **API Routes** (`/api/auth/*`) - Handle all authentication requests

## Available Authentication Methods

- **Email & Password** - Traditional signup/login with email verification
- **GitHub OAuth** - One-click authentication with GitHub account

## Usage Examples

### Client-side Authentication

```typescript
import { authClient } from "@/lib/auth-client";

// Sign up
const { data, error } = await authClient.signUp.email({
  email: "user@example.com",
  password: "password123",
  name: "John Doe",
});

// Sign in
const { data, error } = await authClient.signIn.email({
  email: "user@example.com",
  password: "password123",
});

// GitHub login
await authClient.signIn.social({
  provider: "github",
  callbackURL: "/dashboard",
});

// Get session
const { data: session } = authClient.useSession();

// Sign out
await authClient.signOut();
```

### Server-side Authentication

```typescript
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// Get session on server
const session = await auth.api.getSession({
  headers: await headers(),
});
```

## Learn More

- [Better Auth Documentation](https://better-auth.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
