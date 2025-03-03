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
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
				{[...Array(12)].map(() => (
					<div
						key={`skeleton-${crypto.randomUUID()}`}
						className="animate-pulse">
						<div className="bg-gray-200 aspect-[3/4] rounded-lg mb-2"></div>
					</div>
				))}
			</div>
		);
	}

	return (
		<div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
			{data?.data?.map((anime: AnimeData, index: number) => (
				<Link
					href={`/anime/${anime.mal_id}`}
					key={anime.mal_id + anime.title + index}
					className="group hover:transform hover:scale-105 transition-transform duration-200">
					<div className="bg-white rounded-lg shadow-lg overflow-hidden">
						<div className="relative aspect-[3/4] w-full flex justify-center">
							<Image
								src={anime.images.webp.large_image_url}
								alt={anime.title}
								className="object-cover rounded-lg"
								fill
								priority={true}
								loading="eager"
							/>
						</div>
						<div className="p-4 h-[120px] flex flex-col justify-between">
							<span className="font-semibold line-clamp-2 text-black text-sm md:text-base">
								{truncateText(anime.title, 40)}
							</span>
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
