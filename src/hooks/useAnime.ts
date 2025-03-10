import { useQuery } from '@tanstack/react-query';
import { getAnimeList, getAnimeById } from '@/services/api';
import type {
	AnimeResponse,
	AnimeDetailResponse,
	Filters,
} from '@/types/anime';

export const useAnimeList = (
	page: number = 1,
	query?: string,
	filters?: Filters,
	limit: number = 24
) => {
	return useQuery<AnimeResponse>({
		queryKey: ['animeList', page, query, filters, limit],
		queryFn: () => getAnimeList(page, query, filters, limit),
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
		networkMode: 'always',
		placeholderData: (previousData) => previousData,
	});
};

export const useAnimeDetail = (id: string) => {
	return useQuery<AnimeDetailResponse>({
		queryKey: ['anime', id],
		queryFn: () => getAnimeById(id),
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
		networkMode: 'always',
	});
};
