'use client';

import { useAnimeDetail } from '@/hooks/useAnime';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function AnimePage() {
	const { id } = useParams();
	const { data, isLoading, error } = useAnimeDetail(id as string);

	if (isLoading) {
		return (
			<div className="container mx-auto px-4 py-8 animate-pulse">
				<div className="flex flex-col md:flex-row gap-8">
					<div className="w-full md:w-1/3">
						<div className="bg-gray-200 h-[400px] rounded-lg"></div>
					</div>
					<div className="w-full md:w-2/3">
						<div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
						<div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
						<div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
						<div className="space-y-2">
							{[...Array(6)].map(() => (
								<div
									key={`skeleton-${crypto.randomUUID()}`}
									className="h-4 bg-gray-200 rounded w-full"></div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (error) return <div className="p-4">Error loading anime details</div>;

	if (!data) return null;

	const anime = data.data;

	return (
		<main className="container mx-auto px-4 py-8">
			<Link
				href="/"
				className="inline-flex items-center mb-6 text-blue-500 hover:text-blue-600">
				← Back to list
			</Link>

			<div className="flex flex-col md:flex-row gap-8">
				<div className="w-full md:w-1/3">
					<div className="relative h-full">
						<Image
							src={anime.images.webp.large_image_url}
							alt={anime.title}
							fill
							className="object-cover w-full h-full"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
							priority={true}
							loading="eager"
						/>
					</div>
				</div>

				<div className="w-full md:w-2/3">
					<h1 className="text-3xl font-bold mb-2">{anime.title}</h1>
					{anime.title_english && anime.title_english !== anime.title && (
						<h2 className="text-xl text-gray-600 mb-4">
							{anime.title_english}
						</h2>
					)}

					<div className="grid grid-cols-2 gap-4 mb-6">
						<div>
							<span className="font-semibold">Type: </span>
							{anime.type}
						</div>
						<div>
							<span className="font-semibold">Episodes: </span>
							{anime.episodes ?? 'Unknown'}
						</div>
						<div>
							<span className="font-semibold">Status: </span>
							{anime.status}
						</div>
						<div>
							<span className="font-semibold">Score: </span>⭐ {anime.score}
						</div>
						<div>
							<span className="font-semibold">Year: </span>
							{anime.year ?? 'Unknown'}
						</div>
						<div className="flex flex-wrap gap-2">
							<span className="font-semibold">Streaming: </span>
							{anime.streaming?.map((stream, index) => (
								<div key={stream.name}>
									<a href={stream.url} key={stream.name}>
										{stream.name}
									</a>
									{index < (anime.streaming?.length ?? 0) - 1 && ', '}
								</div>
							))}
						</div>
					</div>

					<div className="mb-6">
						<h3 className="text-xl font-semibold mb-2">Synopsis</h3>
						<p className="text-gray-700 leading-relaxed">{anime.synopsis}</p>
					</div>

					{anime.genres.length > 0 && (
						<div>
							<h3 className="text-xl font-semibold mb-2">Genres</h3>
							<div className="flex flex-wrap gap-2">
								{anime.genres.map((genre) => (
									<span
										key={genre.mal_id}
										className="px-3 py-1 bg-gray-100 rounded-full text-sm text-black">
										{genre.name}
									</span>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</main>
	);
}
