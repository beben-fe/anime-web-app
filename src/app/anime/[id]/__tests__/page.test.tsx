import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '@/test/test-utils';
import { useParams } from 'next/navigation';
import { useAnimeDetail } from '@/hooks/useAnime';
import AnimePage from '../page';

// Mock Next.js modules
jest.mock('next/navigation', () => ({
	useParams: jest.fn(),
}));

// Mock the useAnimeDetail hook
jest.mock('@/hooks/useAnime', () => ({
	useAnimeDetail: jest.fn(),
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
	__esModule: true,
	default: ({
		src,
		alt,
		className,
	}: {
		src: string;
		alt: string;
		className: string;
	}) => <img src={src} alt={alt} className={className} />,
}));

// Mock Lucide icons
jest.mock('lucide-react', () => ({
	ChevronLeft: () => <span data-testid="chevron-left-icon">ChevronLeft</span>,
}));

describe('AnimePage', () => {
	// Mock anime detail data
	const mockAnimeDetail = {
		data: {
			mal_id: 1,
			title: 'Test Anime',
			title_english: 'Test Anime English',
			title_japanese: 'テストアニメ',
			images: {
				webp: { large_image_url: 'https://example.com/test-anime.webp' },
			},
			type: 'TV',
			episodes: 24,
			duration: '24 min per ep',
			status: 'Finished Airing',
			score: 8.75,
			year: 2023,
			rank: 42,
			studios: [{ name: 'Test Studio', url: 'https://example.com/studio' }],
			synopsis: 'This is a test anime synopsis.',
			genres: [
				{ mal_id: 1, name: 'Action' },
				{ mal_id: 2, name: 'Comedy' },
			],
			streaming: [
				{ name: 'Crunchyroll', url: 'https://example.com/crunchyroll' },
				{ name: 'Netflix', url: 'https://example.com/netflix' },
			],
		},
	};

	beforeEach(() => {
		jest.clearAllMocks();
		(useParams as jest.Mock).mockReturnValue({ id: '1' });
	});

	test('renders loading state initially', () => {
		(useAnimeDetail as jest.Mock).mockReturnValue({
			data: undefined,
			isFetching: true,
			error: null,
		});

		render(<AnimePage />);

		// Check for loading skeleton instead of specific text
		expect(screen.getByTestId('anime-loading-skeleton')).toBeInTheDocument();
	});

	test('displays error message when error occurs', () => {
		(useAnimeDetail as jest.Mock).mockReturnValue({
			data: undefined,
			isFetching: false,
			error: new Error('Failed to fetch anime'),
		});

		render(<AnimePage />);

		expect(screen.getByText('Error loading anime details')).toBeInTheDocument();
	});

	test('renders anime details correctly', async () => {
		(useAnimeDetail as jest.Mock).mockReturnValue({
			data: mockAnimeDetail,
			isFetching: false,
			error: null,
		});

		render(<AnimePage />);

		// Check that main elements are rendered
		expect(screen.getByText('Back to list')).toBeInTheDocument();
		expect(screen.getByTestId('chevron-left-icon')).toBeInTheDocument();

		// Check title and subtitle
		expect(screen.getByText('Test Anime')).toBeInTheDocument();
		expect(
			screen.getByText('Test Anime English (テストアニメ)')
		).toBeInTheDocument();

		// Check anime details
		expect(screen.getByText('Type:')).toBeInTheDocument();
		expect(screen.getByText('TV')).toBeInTheDocument();

		expect(screen.getByText('Episodes:')).toBeInTheDocument();
		expect(screen.getByText('24 episodes (24 min per ep)')).toBeInTheDocument();

		expect(screen.getByText('Status:')).toBeInTheDocument();
		expect(screen.getByText('Finished Airing')).toBeInTheDocument();

		expect(screen.getByText('Score:')).toBeInTheDocument();
		expect(screen.getByText('⭐ 8.75')).toBeInTheDocument();

		expect(screen.getByText('Year:')).toBeInTheDocument();
		expect(screen.getByText('2023')).toBeInTheDocument();

		expect(screen.getByText('Rank:')).toBeInTheDocument();
		expect(screen.getByText('42')).toBeInTheDocument();

		// Check synopsis
		expect(screen.getByText('Synopsis')).toBeInTheDocument();
		expect(
			screen.getByText('This is a test anime synopsis.')
		).toBeInTheDocument();

		// Check genres
		expect(screen.getByText('Genres')).toBeInTheDocument();
		expect(screen.getByText('Action')).toBeInTheDocument();
		expect(screen.getByText('Comedy')).toBeInTheDocument();

		// Check streaming services
		expect(screen.getByText('Streaming:')).toBeInTheDocument();
		expect(screen.getByText('Crunchyroll')).toBeInTheDocument();
		expect(screen.getByText('Netflix')).toBeInTheDocument();

		// Check studio
		expect(screen.getByText('Studio:')).toBeInTheDocument();
		expect(screen.getByText('Test Studio')).toBeInTheDocument();
	});

	test('renders null when no data and not fetching', () => {
		(useAnimeDetail as jest.Mock).mockReturnValue({
			data: undefined,
			isFetching: false,
			error: null,
		});

		const { container } = render(<AnimePage />);
		expect(container.firstChild).toBeNull();
	});
});
