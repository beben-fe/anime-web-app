# Anime Explorer

A modern web application for exploring and discovering anime using the Jikan API (unofficial MyAnimeList API). Built with Next.js 14, React 18, and Tailwind CSS.

## Features

- Browse anime with pagination
- Real-time search with debouncing
- Advanced filtering system (type, score, status, rating)
- Detailed anime information pages
- Responsive design for all devices
- Modern UI with loading states and animations
- Efficient data fetching and caching with React Query
- TypeScript for better type safety

## Tech Stack

- Next.js 14.1.0
- React 18.2.0
  - Better error handling
  - Improved hooks system
- TanStack Query (React Query) v5
- Tailwind CSS 3.4
- TypeScript 5
- Lucide Icons
- Lodash

## Getting Started

### Prerequisites

- Node.js 20.11.0 or later (for Next.js 14)
- yarn (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd anime-web-app
```

2. Install dependencies:
```bash
yarn install
```

3. Start the development server:
```bash
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

```
src/
├── app/                   # Next.js app router pages
│   ├── page.tsx           # Home page (anime list)
│   └── anime/[id]/        # Dynamic anime detail pages
├── components/            # Reusable React components
├── constant/              # Constant Value for components
├── context/               # Context for global states values
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── services/              # API services
└── test/                  # Mockup data test
└── types/                 # TypeScript type definitions
```

## Features Implementation

### Caching
- Implemented using TanStack Query with configurable stale times
- Anime list: 5 minutes stale time
- Anime details: 5 minutes stale time

### Search
- Debounced search input (500ms)
- Auto-reset to page 1 on new search
- Loading states for better UX

### Responsive Design
- Mobile-first approach
- Responsive grid layout
- Flexible image containers
- Adaptive typography

## Development

### Running Tests
```bash
yarn test
# or
npm run test
```

### Linting
```bash
yarn lint
# or
npm run lint
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- [Jikan API](https://jikan.moe/) for providing the anime data
- [Next.js](https://nextjs.org/) for the amazing framework
- [TanStack Query](https://tanstack.com/query/latest) for efficient data fetching
