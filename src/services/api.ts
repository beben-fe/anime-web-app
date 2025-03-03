import type {
	AnimeResponse,
	AnimeDetailResponse,
	Filters,
} from '@/types/anime';

const BASE_URL = 'https://api.jikan.moe/v4';

export async function getAnimeList(
	page: number = 1,
	query?: string,
	filters?: Filters,
	limit: number = 24
): Promise<AnimeResponse> {
	const params = new URLSearchParams({
		page: page.toString(),
		limit: limit.toString(),
		...(query && { q: query }),
		...(filters?.type && { type: filters.type }),
		...(filters?.score && { min_score: filters.score }),
		...(filters?.status && { status: filters.status }),
		...(filters?.rating && { rating: filters.rating }),
		...(filters?.genres?.length && {
			genres: filters.genres.join(','),
		}),
	});

	const response = await fetch(`${BASE_URL}/anime?${params.toString()}`);

	if (!response.ok) {
		throw new Error('Failed to fetch anime list');
	}

	return response.json();
}

export async function getAnimeById(id: string): Promise<AnimeDetailResponse> {
	const response = await fetch(`${BASE_URL}/anime/${id}/full`);

	if (!response.ok) {
		throw new Error('Failed to fetch anime details');
	}

	return response.json();
}
