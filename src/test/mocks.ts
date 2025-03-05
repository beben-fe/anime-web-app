import type { AnimeData, AnimeResponse, Filters } from '@/types/anime';

// Mock anime data for testing
export const mockAnimeData: AnimeData = {
	mal_id: 1,
	url: 'https://myanimelist.net/anime/1',
	title: 'Test Anime',
	title_english: 'Test Anime English',
	title_japanese: 'テストアニメ',
	type: 'TV',
	source: 'Manga',
	episodes: 12,
	status: 'Finished Airing',
	airing: false,
	duration: '24 min per ep',
	rating: 'PG-13',
	score: 8.5,
	scored_by: 100000,
	rank: 1,
	popularity: 1,
	members: 200000,
	favorites: 10000,
	synopsis: 'A test anime synopsis',
	year: 2023,
	images: {
		jpg: {
			image_url: 'https://example.com/image.jpg',
			small_image_url: 'https://example.com/small_image.jpg',
			large_image_url: 'https://example.com/large_image.jpg',
		},
		webp: {
			image_url: 'https://example.com/image.webp',
			small_image_url: 'https://example.com/small_image.webp',
			large_image_url: 'https://example.com/large_image.webp',
		},
	},
	genres: [
		{ mal_id: 1, name: 'Action', type: 'genre' },
		{ mal_id: 2, name: 'Comedy', type: 'genre' },
	],
	studios: [
		{ mal_id: 1, name: 'Test Studio', url: 'https://example.com/studio' },
	],
};

// Mock anime list response
export const mockAnimeResponse: AnimeResponse = {
	data: [mockAnimeData],
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

// Mock filters
export const mockEmptyFilters: Filters = {
	type: '',
	score: '',
	status: '',
	rating: '',
	genres: [],
};

export const mockFilledFilters: Filters = {
	type: 'TV',
	score: '8',
	status: 'Airing',
	rating: 'PG-13',
	genres: ['Action', 'Comedy'],
};
