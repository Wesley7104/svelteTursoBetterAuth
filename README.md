# SvelteKit Authentication Demo

A clean and simple demo project showcasing authentication implementation using BetterAuth, Turso database, and SvelteKit with Svelte 5.

## Tech Stack

- **Frontend**: Svelte 5 + SvelteKit
- **Authentication**: BetterAuth
- **Database**: Turso
- **Language**: TypeScript

## Project Structure

```text
src/
├── lib/
│   ├── auth/         # Authentication related code
│   ├── db/          # Database related code
│   └── components/  # Reusable components
├── routes/
│   ├── auth/        # Authentication routes
│   └── protected/   # Protected routes
└── app.d.ts         # TypeScript declarations
```

## Features

- User registration and login
- Password reset functionality
- Protected routes
- Session management
- Form validation
- Error handling
- Responsive design

## Development Status

See [DEVELOPMENT_PLAN.md](./DEVELOPMENT_PLAN.md) for detailed development phases and [CHECKLIST.md](./CHECKLIST.md) for current progress.

## Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables (see `.env.example`)
4. Start the development server:

   ```bash
   npm run dev
   ```

## Documentation

- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [BetterAuth Documentation](https://www.better-auth.com/docs/installation)
- [Turso Documentation](https://docs.turso.tech/sdk/ts/guides/sveltekit)

## License

MIT
