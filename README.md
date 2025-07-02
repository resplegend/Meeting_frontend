# Next.js Frontend Application

A modern React application built with Next.js 14 (App Router) for the Next.js & Nest.js Skill Test.

## Features

- **Modern UI/UX** - Built with Tailwind CSS and responsive design
- **Authentication** - JWT-based authentication with secure cookie storage
- **Meeting Management** - Full CRUD operations with intuitive interface
- **TypeScript** - Full type safety throughout the application
- **Form Validation** - Client-side validation with React Hook Form and Zod
- **Middleware Protection** - Automatic route protection and redirects

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running on `http://localhost:3001`

## Installation

```bash
npm install
```

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Mode

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Application Structure

```
src/
├── app/                     # Next.js App Router pages
│   ├── dashboard/          # Dashboard page (protected)
│   │   └── page.tsx       # Main dashboard component
│   ├── login/             # Login page
│   │   └── page.tsx       # Login form component
│   ├── layout.tsx         # Root layout with AuthProvider
│   └── page.tsx           # Root page (redirects)
├── components/            # Reusable React components
│   ├── MeetingForm.tsx    # Meeting creation/editing form
│   └── MeetingList.tsx    # Meeting list display
├── contexts/              # React contexts
│   └── AuthContext.tsx    # Authentication context
├── lib/                   # Utility functions and API
│   └── api.ts            # API service and types
└── globals.css           # Global styles
```

## Authentication Flow

### Login Process
1. User visits any page → Middleware checks for `auth_token` cookie
2. No token found → Redirected to `/login`
3. User enters credentials → API call to backend
4. Success → JWT token stored in secure cookie
5. Automatic redirect to `/dashboard`

### Protected Routes
- All routes except `/login` require authentication
- Middleware automatically handles redirects
- Fallback checks in components for additional security

### Logout Process
1. User clicks logout → Clear cookies
2. Redirect to `/login`
3. Middleware prevents access to protected routes

## API Integration

### Authentication API
```typescript
// Login
const response = await authAPI.login({
  email: 'admin@gmail.com',
  password: 'admin123'
});
```

### Meetings API
```typescript
// Get all meetings
const meetings = await meetingsAPI.getAll();

// Create meeting
const newMeeting = await meetingsAPI.create(meetingData);

// Update meeting
const updatedMeeting = await meetingsAPI.update(id, updateData);

// Delete meeting
await meetingsAPI.delete(id);
```

## Components

### MeetingForm
- **Purpose**: Create and edit meetings
- **Features**: Form validation, date/time pickers, attendee management
- **Validation**: Client-side validation with Zod schema

### MeetingList
- **Purpose**: Display all meetings
- **Features**: Edit/delete actions, responsive layout
- **Actions**: Edit meeting, delete meeting with confirmation

### AuthContext
- **Purpose**: Global authentication state management
- **Features**: User state, login/logout functions, loading states
- **Storage**: Secure cookie-based token storage

## Styling

### Tailwind CSS
- Utility-first CSS framework
- Responsive design
- Custom color scheme
- Component-based styling

### Design System
- **Colors**: Indigo primary, gray secondary
- **Typography**: Inter font family
- **Spacing**: Consistent spacing scale
- **Components**: Reusable button and form styles

## Dependencies

### Core Dependencies
- `next` - React framework
- `react` - UI library
- `react-dom` - React DOM rendering
- `typescript` - Type safety

### UI & Styling
- `tailwindcss` - CSS framework
- `@tailwindcss/postcss` - PostCSS integration

### Forms & Validation
- `react-hook-form` - Form management
- `@hookform/resolvers` - Form validation resolvers
- `zod` - Schema validation

### HTTP & State
- `axios` - HTTP client
- `js-cookie` - Cookie management

### Development
- `eslint` - Code linting
- `eslint-config-next` - Next.js ESLint configuration

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NODE_ENV=development
```

## Middleware Configuration

The application uses Next.js middleware for route protection:

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  // Route protection logic
}
```

### Protected Routes
- `/dashboard` - Requires authentication
- `/` - Redirects based on auth status

### Public Routes
- `/login` - Accessible without authentication

## Security Features

- **Secure Cookies**: JWT tokens stored in HTTP-only cookies
- **CORS Protection**: Configured for backend communication
- **Route Protection**: Middleware-based authentication checks
- **Input Validation**: Client-side validation with Zod
- **XSS Protection**: React's built-in XSS protection

## User Experience

### Loading States
- Authentication loading indicators
- Form submission loading states
- Data fetching loading states

### Error Handling
- Form validation errors
- API error messages
- Network error handling

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interactions

## Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm test:watch

# Run tests with coverage
npm test:coverage
```

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Configure environment variables
3. Deploy automatically on push

### Other Platforms
1. Build the application: `npm run build`
2. Start the production server: `npm start`
3. Configure your hosting platform

## Development Notes

- Uses Next.js 14 App Router
- Implements modern React patterns (hooks, context)
- Follows TypeScript best practices
- Implements proper error boundaries
- Uses semantic HTML for accessibility

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend is running on port 3001
2. **Authentication Issues**: Check cookie settings and JWT token
3. **Build Errors**: Verify TypeScript types and dependencies
4. **Styling Issues**: Ensure Tailwind CSS is properly configured

### Debug Mode
```bash
npm run dev -- --debug
```

## Contributing

1. Follow TypeScript best practices
2. Use proper component composition
3. Implement proper error handling
4. Add appropriate loading states
5. Test on multiple devices and browsers
# Meeting_frontend
