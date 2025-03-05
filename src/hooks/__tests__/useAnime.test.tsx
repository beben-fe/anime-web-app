import { renderHook, waitFor } from '@testing-library/react';
import { useAnimeList, useAnimeDetail } from '../useAnime';
import { getAnimeList, getAnimeById } from '@/services/api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

// Mock the API service
jest.mock('@/services/api', () => ({
	getAnimeList: jest.fn(),
	getAnimeById: jest.fn(),
}));

// Mock data for tests
const mockAnimeListResponse = {
	data: [
		{
			mal_id: 1,
			title: 'Test Anime',
			images: {
				webp: {
					image_url: 'https://example.com/image.webp',
					large_image_url: 'https://example.com/large.webp',
					small_image_url: 'https://example.com/small.webp',
				},
				jpg: {
					image_url: 'https://example.com/image.jpg',
					large_image_url: 'https://example.com/large.jpg',
					small_image_url: 'https://example.com/small.jpg',
				},
			},
			status: 'Finished Airing',
			rating: 'PG-13',
			score: 8.5,
			episodes: 24,
			type: 'TV',
			// Other required properties
			url: 'https://example.com/anime/1',
			title_english: 'Test Anime',
			title_japanese: 'テストアニメ',
			source: 'Manga',
			year: 2020,
			season: 'Winter',
			synopsis: 'A test anime for unit tests',
			genres: [],
			duration: '24 min',
			aired: { from: '2020-01-01', to: '2020-03-31' },
			popularity: 100,
			members: 1000,
			favorites: 50,
			rank: 10,
			studios: [],
		},
	],
	pagination: {
		last_visible_page: 1,
		has_next_page: false,
		current_page: 1,
		items: {
			count: 1,
			total: 1,
			per_page: 24,
		},
	},
};

const mockAnimeDetailResponse = {
	data: {
		mal_id: 1,
		title: 'Test Anime',
		images: {
			webp: {
				image_url: 'https://example.com/image.webp',
				large_image_url: 'https://example.com/large.webp',
				small_image_url: 'https://example.com/small.webp',
			},
			jpg: {
				image_url: 'https://example.com/image.jpg',
				large_image_url: 'https://example.com/large.jpg',
				small_image_url: 'https://example.com/small.jpg',
			},
		},
		status: 'Finished Airing',
		rating: 'PG-13',
		score: 8.5,
		episodes: 24,
		type: 'TV',
		// Other required properties
		url: 'https://example.com/anime/1',
		title_english: 'Test Anime',
		title_japanese: 'テストアニメ',
		source: 'Manga',
		year: 2020,
		season: 'Winter',
		synopsis: 'A test anime for unit tests',
		genres: [],
		duration: '24 min',
		aired: { from: '2020-01-01', to: '2020-03-31' },
		popularity: 100,
		members: 1000,
		favorites: 50,
		rank: 10,
		studios: [],
	},
};

// Create a wrapper for testing hooks that require QueryClient
const createWrapper = () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});

	const Wrapper = ({ children }: { children: React.ReactNode }) => (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);

	Wrapper.displayName = 'QueryClientWrapper';
	return Wrapper;
};

describe('useAnimeList', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		(getAnimeList as jest.Mock).mockResolvedValue(mockAnimeListResponse);
	});

	it('should fetch anime list with default parameters', async () => {
		const wrapper = createWrapper();
		const { result } = renderHook(() => useAnimeList(), { wrapper });

		await waitFor(() => expect(result.current.isSuccess).toBe(true));

		expect(getAnimeList).toHaveBeenCalledWith(1, undefined, undefined, 24);
		expect(result.current.data).toEqual(mockAnimeListResponse);
	});

	it('should fetch anime list with custom parameters', async () => {
		const wrapper = createWrapper();
		const page = 2;
		const query = 'naruto';
		const filters = {
			type: 'TV',
			score: '8',
			status: '',
			rating: '',
			genres: [],
		};
		const limit = 30;

		const { result } = renderHook(
			() => useAnimeList(page, query, filters, limit),
			{ wrapper }
		);

		await waitFor(() => expect(result.current.isSuccess).toBe(true));

		expect(getAnimeList).toHaveBeenCalledWith(page, query, filters, limit);
		expect(result.current.data).toEqual(mockAnimeListResponse);
	});

	it('should handle fetch errors', async () => {
		(getAnimeList as jest.Mock).mockRejectedValueOnce(new Error('API error'));

		const wrapper = createWrapper();
		const { result } = renderHook(() => useAnimeList(), { wrapper });

		await waitFor(() => expect(result.current.isError).toBe(true));

		expect(result.current.error).toBeDefined();
	});
});

describe('useAnimeDetail', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		(getAnimeById as jest.Mock).mockResolvedValue(mockAnimeDetailResponse);
	});

	it('should fetch anime details by id', async () => {
		const wrapper = createWrapper();
		const id = '1';

		const { result } = renderHook(() => useAnimeDetail(id), { wrapper });

		await waitFor(() => expect(result.current.isSuccess).toBe(true));

		expect(getAnimeById).toHaveBeenCalledWith(id);
		expect(result.current.data).toEqual(mockAnimeDetailResponse);
	});

	it('should handle fetch errors', async () => {
		(getAnimeById as jest.Mock).mockRejectedValueOnce(new Error('API error'));

		const wrapper = createWrapper();
		const id = '1';

		const { result } = renderHook(() => useAnimeDetail(id), { wrapper });

		await waitFor(() => expect(result.current.isError).toBe(true));

		expect(result.current.error).toBeDefined();
	});
});
