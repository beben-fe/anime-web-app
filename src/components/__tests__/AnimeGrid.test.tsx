import { render, screen } from '@testing-library/react';
import { AnimeGrid } from '../AnimeGrid';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimeResponse } from '@/types/anime';

// Mock data for testing
const mockAnimeData = {
	data: [
		{
			mal_id: 1,
			title: 'Test Anime',
			images: {
				webp: {
					large_image_url: 'https://example.com/test.webp',
					image_url: 'https://example.com/test.webp',
					small_image_url: 'https://example.com/test-small.webp',
				},
				jpg: {
					large_image_url: 'https://example.com/test.jpg',
					image_url: 'https://example.com/test.jpg',
					small_image_url: 'https://example.com/test-small.jpg',
				},
			},
			type: 'TV',
			episodes: 12,
			score: 8.5,
			studios: [{ mal_id: 1, name: 'Test Studio', url: 'https://example.com' }],
			url: 'https://example.com',
			title_english: 'Test Anime',
			title_japanese: 'テストアニメ',
			source: 'Original',
			status: 'Finished Airing',
			rating: 'PG-13',
			synopsis: 'Test synopsis',
			year: 2023,
			season: 'Winter',
			genres: [],
			duration: '24 min per ep',
			aired: { from: '2023-01-01', to: '2023-03-31' },
			popularity: 100,
			members: 1000,
			favorites: 50,
			rank: 10,
		},
	],
	pagination: {
		last_visible_page: 1,
		has_next_page: false,
		current_page: 1,
		items: {
			count: 1,
			total: 1,
			per_page: 25,
		},
	},
} as unknown as AnimeResponse;

// Mock next/image
jest.mock('next/image', () => ({
	__esModule: true,
	default: ({
		src,
		alt,
		...props
	}: {
		src: string;
		alt: string;
		fill?: boolean;
		priority?: boolean;
		loading?: 'eager' | 'lazy';
		className?: string;
	}) => <img src={src} alt={alt} data-testid="next-image" {...props} />,
}));

// Setup wrapper with providers
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('AnimeGrid', () => {
	it('renders loading skeletons when fetching', () => {
		render(<AnimeGrid data={undefined} isFetching={true} />, { wrapper });

		// Check for loading skeletons
		const skeletons = document.querySelectorAll('.animate-pulse');
		expect(skeletons.length).toBeGreaterThan(0);
	});

	it('renders anime cards when data is available', () => {
		render(<AnimeGrid data={mockAnimeData} isFetching={false} />, { wrapper });

		// Check for anime title
		expect(screen.getByText('Test Anime')).toBeInTheDocument();

		// Check for anime type
		expect(screen.getByText('TV')).toBeInTheDocument();

		// Check for anime score
		expect(screen.getByText(/8.5/)).toBeInTheDocument();

		// Check for image
		const image = screen.getByTestId('next-image');
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute('alt', 'Test Anime');
	});

	it('displays empty state when there is no data', () => {
		render(
			<AnimeGrid
				data={{
					data: [],
					pagination: mockAnimeData.pagination,
				}}
				isFetching={false}
			/>,
			{ wrapper }
		);

		expect(screen.getByText(/No anime found/i)).toBeInTheDocument();
	});
});
