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
			<div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
				{[...Array(12)].map((_, index) => (
					<div key={`skeleton-${index}`} className="animate-pulse">
						<div className="bg-gray-200 aspect-[3/4] rounded-lg mb-2"></div>
					</div>
				))}
			</div>
		);
	}

	// Show empty state if there's no data or the data array is empty
	if (!data?.data || data.data.length === 0) {
		return (
			<div className="flex justify-center items-center p-10 text-gray-200">
				<p className="text-lg">
					No anime found. Try different filters or search terms.
				</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
			{data.data.map((anime: AnimeData, index: number) => (
				<Link
					href={`/anime/${anime.mal_id}`}
					key={anime.mal_id + anime.title + index}
					className="group hover:transform hover:scale-105 transition-transform duration-200">
					<div className="rounded-lg shadow-lg overflow-hidden">
						<div className="relative aspect-[3/4] w-full flex justify-center">
							<Image
								src={anime.images.webp.large_image_url}
								alt={anime.title}
								className="object-fill rounded-lg"
								fill
								priority={true}
								loading="eager"
							/>
							<div className="absolute top-1 right-1 w-full h-full flex flex-row-reverse">
								<div className="rounded-md bg-orange-600/90 w-12 h-6 flex items-center justify-center">
									<span className="text-white text-xs">
										{anime.type ?? '-'}
									</span>
								</div>
							</div>
							<div className="absolute bottom-1 left-1 w-full h-full flex flex-col-reverse">
								<div className="rounded-md bg-blue-600/90 w-12 h-6 flex items-center justify-center">
									<span className="text-white text-xs">{`${
										anime.episodes ?? '-'
									} eps`}</span>
								</div>
							</div>
							<div className="absolute bottom-1 right-1 w-full h-full flex flex-row-reverse flex-wrap-reverse">
								<div className="rounded-md bg-black/70 w-12 h-6 flex items-center justify-center">
									<span className="text-white text-xs">⭐ {anime.score}</span>
								</div>
							</div>
						</div>
						<div className="p-2 h-[60px] flex flex-col text-center">
							<span className="font-semibold line-clamp-2 text-gray-200 text-sm">
								{truncateText(anime.title, 40)}
							</span>
						</div>
					</div>
				</Link>
			))}
		</div>
	);
}
