import { getAnimeList, getAnimeById } from '../api';
import type { Filters } from '@/types/anime';
import { mockAnimeResponse, mockFilledFilters } from '@/test/mocks';

// Mock global fetch
global.fetch = jest.fn();

describe('API Service', () => {
	beforeEach(() => {
		jest.clearAllMocks();

		// Set up a more realistic mock response
		(global.fetch as jest.Mock).mockResolvedValue({
			ok: true,
			json: () => Promise.resolve(mockAnimeResponse),
		});
	});

	describe('getAnimeList', () => {
		it('fetches anime list with default parameters', async () => {
			const result = await getAnimeList();

			expect(result).toEqual(mockAnimeResponse);
			expect(global.fetch).toHaveBeenCalledTimes(1);
			expect(global.fetch).toHaveBeenCalledWith(
				'https://api.jikan.moe/v4/anime?page=1&limit=24'
			);
		});

		it('fetches anime list with custom parameters', async () => {
			const filters: Filters = mockFilledFilters;

			await getAnimeList(2, 'naruto', filters, 10);

			const fetchCall = (global.fetch as jest.Mock).mock.calls[0][0];

			// Test individual URL components for more reliable testing
			expect(fetchCall).toContain('page=2');
			expect(fetchCall).toContain('q=naruto');
			expect(fetchCall).toContain('type=TV');
			expect(fetchCall).toContain('min_score=8');
			expect(fetchCall).toContain('limit=10');
			expect(fetchCall).toContain('status=Airing');
			expect(fetchCall).toContain('rating=PG-13');
			expect(fetchCall).toContain('genres=Action%2CComedy');
		});

		it('handles failed requests', async () => {
			(global.fetch as jest.Mock).mockResolvedValue({
				ok: false,
				status: 500,
				statusText: 'Server Error',
			});

			await expect(getAnimeList()).rejects.toThrow(
				'Failed to fetch anime list'
			);
		});
	});

	describe('getAnimeById', () => {
		it('fetches anime details by ID', async () => {
			const result = await getAnimeById('123');

			expect(result).toEqual(mockAnimeResponse);
			expect(global.fetch).toHaveBeenCalledWith(
				'https://api.jikan.moe/v4/anime/123/full'
			);
		});

		it('handles failed requests', async () => {
			(global.fetch as jest.Mock).mockResolvedValue({
				ok: false,
				status: 404,
				statusText: 'Not Found',
			});

			await expect(getAnimeById('999')).rejects.toThrow(
				'Failed to fetch anime details'
			);
		});
	});
});
