import axios from 'axios';
import { AnimeResponse, AnimeDetailResponse, Filters } from '@/types/anime';

const api = axios.create({
	baseURL: 'https://api.jikan.moe/v4',
});

export const getAnimeList = async (
	page: number = 1,
	query?: string,
	filters?: Filters
) => {
	const params = new URLSearchParams({
		page: page.toString(),
		limit: '24',
		...(query ? { q: query } : {}),
		...(filters?.type ? { type: filters.type } : {}),
		...(filters?.score ? { min_score: filters.score } : {}),
		...(filters?.status ? { status: filters.status } : {}),
		...(filters?.rating ? { rating: filters.rating } : {}),
		...(filters?.genres.length ? { genres: filters.genres.join(',') } : {}),
	});

	const response = await api.get<AnimeResponse>(`/anime?${params}`);
	return response.data;
};

export const getAnimeById = async (id: string) => {
	const response = await api.get<AnimeDetailResponse>(`/anime/${id}/full`);
	return response.data;
};

api.interceptors.request.use(async (config) => {
	await new Promise((resolve) => setTimeout(resolve, 1000));
	return config;
});
