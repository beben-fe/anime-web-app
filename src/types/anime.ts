export interface AnimeImage {
	image_url: string;
	small_image_url: string;
	large_image_url: string;
}

export interface AnimeImages {
	jpg: AnimeImage;
	webp: AnimeImage;
}

export interface AnimeGenre {
	mal_id: number;
	name: string;
	type?: string;
	url?: string;
}

export interface AnimeStreaming {
	name: string;
	url: string;
}

export interface AnimeData {
	mal_id: number;
	url: string;
	images: AnimeImages;
	title: string;
	title_english: string | null;
	title_japanese: string | null;
	type: string;
	source: string;
	episodes: number | null;
	status: string;
	airing: boolean;
	duration: string;
	rating: string;
	score: number;
	scored_by: number;
	rank: number;
	popularity: number;
	members: number;
	favorites: number;
	synopsis: string;
	year: number | null;
	genres: AnimeGenre[];
	streaming?: AnimeStreaming[];
}

export interface AnimePagination {
	last_visible_page: number;
	has_next_page: boolean;
	current_page: number;
	items: {
		count: number;
		total: number;
		per_page: number;
	};
}

export interface AnimeResponse {
	data: AnimeData[];
	pagination: AnimePagination;
}

export interface AnimeDetailResponse {
	data: AnimeData;
}

export interface Filters {
	type: string;
	score: string;
	status: string;
	rating: string;
	genres: string[];
}
