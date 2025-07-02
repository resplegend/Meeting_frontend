# Next.js Frontend Application

A modern React app built with Next.js 14 (App Router) for Meeting Management.

## Features

- **Modern UI/UX**: Tailwind CSS, responsive design
- **Authentication**: JWT-based, secure cookies, toast notifications
- **Meeting Management**: Full CRUD, intuitive interface
- **TypeScript**: Full type safety
- **Form Validation**: React Hook Form + Zod
- **Middleware Protection**: Automatic route protection

## Prerequisites

- Node.js (v16+)
- npm or yarn
- Backend API running at `http://localhost:3001`

## Getting Started

### Installation

```bash
npm install
```

### Running the Application

- **Development**:  
  ```bash
  npm run dev
  ```
  Runs at [http://localhost:3000](http://localhost:3000)

- **Production**:  
  ```bash
  npm run build
  npm start
  ```

- **Linting**:  
  ```bash
  npm run lint
  ```

## Project Structure

```
src/
├── app/         # Next.js App Router pages
│   ├── dashboard/
│   ├── login/
│   ├── layout.tsx
│   └── page.tsx
├── components/  # Reusable UI components
├── contexts/    # React contexts (Auth)
├── lib/         # API, types, utils
└── globals.css  # Global styles
```

## Authentication Flow

- **Login**:  
  1. User visits any page → Middleware checks for `auth_token`
  2. No token → Redirect to `/login`
  3. On login, JWT stored in cookie, user redirected to `/dashboard`
- **Protected Routes**:  
  All except `/login` require authentication (middleware + context)
- **Logout**:  
  Clears cookies, redirects to `/login`

## API Integration

- **Login**:  
  `authAPI.login({ email, password })`
- **Meetings**:  
  `meetingsAPI.getAll()`, `meetingsAPI.create(data)`, etc.

## Environment Variables

Create `.env.local` in the root:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
NODE_ENV=development
```

## Styling

- **Tailwind CSS**: Utility-first, responsive
- **Design**: Indigo/gray palette, Inter font

## Notifications

- **react-toastify**: Used for error and success messages (e.g., invalid login)

## License

MIT
