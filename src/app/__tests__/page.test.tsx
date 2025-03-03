import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from '../page';

// Mock the useAnimeList hook
jest.mock('@/hooks/useAnime', () => ({
	useAnimeList: () => ({
		data: {
			data: [
				{
					mal_id: 1,
					title: 'Test Anime',
					images: {
						webp: {
							large_image_url: 'test.webp',
						},
					},
					type: 'TV',
					score: 8.5,
				},
			],
			pagination: {
				has_next_page: true,
				last_visible_page: 2,
			},
		},
		isLoading: false,
		error: null,
	}),
}));

describe('Home Page', () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});

	const renderWithClient = (ui: React.ReactElement) => {
		return render(
			<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
		);
	};

	it('renders the anime list', () => {
		renderWithClient(<Home />);

		expect(screen.getByText('Anime Explorer')).toBeInTheDocument();
		expect(screen.getByText('Test Anime')).toBeInTheDocument();
		expect(screen.getByText('TV')).toBeInTheDocument();
		expect(screen.getByText('⭐ 8.5')).toBeInTheDocument();
	});

	it('handles search input', async () => {
		renderWithClient(<Home />);

		const searchInput = screen.getByPlaceholderText('Search anime...');
		fireEvent.change(searchInput, { target: { value: 'naruto' } });

		await waitFor(() => {
			expect(searchInput).toHaveValue('naruto');
		});
	});

	it('handles pagination', () => {
		renderWithClient(<Home />);

		const nextButton = screen.getByText('Next');
		const prevButton = screen.getByText('Previous');

		expect(prevButton).toBeDisabled();
		expect(nextButton).not.toBeDisabled();
	});
});
