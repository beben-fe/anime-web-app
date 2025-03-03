import Image from 'next/image';
import Link from 'next/link';
import { truncateText } from '@/lib/utils';
import { AnimeData, AnimeResponse } from '@/types/anime';

interface AnimeGridProps {
	data: AnimeResponse | undefined;
	isFetching: boolean;
}

export function AnimeGrid({ data, isFetching }: AnimeGridProps) {
	if (isFetching) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{[...Array(12)].map(() => (
					<div
						key={`skeleton-${crypto.randomUUID()}`}
						className="animate-pulse">
						<div className="bg-gray-200 h-[300px] rounded-lg mb-2"></div>
						<div className="h-4 bg-gray-200 rounded w-3/4"></div>
					</div>
				))}
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			{data?.data?.map((anime: AnimeData, index: number) => (
				<Link
					href={`/anime/${anime.mal_id}`}
					key={anime.mal_id + anime.title + index}
					className="group hover:transform hover:scale-105 transition-transform duration-200">
					<div className="bg-white rounded-lg shadow-lg overflow-hidden">
						<div className="relative h-[320px] w-full">
							<Image
								src={anime.images.webp.image_url}
								alt={anime.title}
								className="object-cover"
								fill
								priority={true}
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
							/>
						</div>
						<div className="p-4 h-[120px] flex flex-col justify-between">
							<h2 className="font-semibold text-lg line-clamp-2 text-black">
								{truncateText(anime.title, 40)}
							</h2>
							<div className="flex justify-between text-sm text-gray-600">
								<span>{anime.type}</span>
								<span>⭐ {anime.score}</span>
							</div>
						</div>
					</div>
				</Link>
			))}
		</div>
	);
}
