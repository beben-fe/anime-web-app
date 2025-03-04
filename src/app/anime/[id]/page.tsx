'use client';

import { ChevronLeft } from 'lucide-react';
import { useAnimeDetail } from '@/hooks/useAnime';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { usePage } from '@/context/PageContext';

export default function AnimePage() {
	const { id } = useParams();
	const { currentPage } = usePage();
	const { data, isFetching, error } = useAnimeDetail(id as string);

	if (isFetching) {
		return (
			<div className="container mx-auto px-4 py-8 animate-pulse">
				<div className="flex flex-col md:flex-row gap-8">
					<div className="w-full md:w-1/3">
						<div className="relative aspect-[3/4] w-full">
							<div className="bg-gray-800 rounded-lg"></div>
						</div>
					</div>
					<div className="w-full md:w-2/3">
						<div className="mb-4">
							<div className="h-10 bg-gray-800 rounded w-3/4 mb-2"></div>
							<div className="h-6 bg-gray-800 rounded w-1/2"></div>
						</div>

						<div className="grid grid-cols-2 gap-4 mb-6">
							{[...Array(8)].map((_, i) => (
								<div key={i} className="flex items-center gap-2">
									<div className="h-4 bg-gray-800 rounded w-20"></div>
									<div className="h-4 bg-gray-800 rounded w-24"></div>
								</div>
							))}
						</div>

						<div className="mb-6">
							<div className="h-6 bg-gray-800 rounded w-24 mb-2"></div>
							<div className="space-y-2">
								{[...Array(6)].map((_, i) => (
									<div key={i} className="h-4 bg-gray-800 rounded w-full"></div>
								))}
							</div>
						</div>

						<div>
							<div className="h-6 bg-gray-800 rounded w-24 mb-2"></div>
							<div className="flex flex-wrap gap-2">
								{[...Array(5)].map((_, i) => (
									<div
										key={i}
										className="h-6 bg-gray-800 rounded-full w-20"></div>
								))}
							</div>
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
				className="inline-flex items-center mb-6 text-white hover:text-gray-300">
				<ChevronLeft size={20} /> &nbsp; Back to list
			</Link>

			<div className="flex flex-col md:flex-row gap-8">
				<div className="w-full md:w-1/3 ">
					<div className="relative aspect-[3/4] w-full">
						<Image
							src={anime.images.webp.large_image_url}
							alt={anime.title}
							className="object-contain"
							fill
							priority={true}
							loading="eager"
						/>
					</div>
				</div>

				<div className="w-full md:w-2/3">
					<div className="mb-4">
						<h1 className="text-3xl font-bold mb-2">{anime.title}</h1>
						{anime.title_english && anime.title_japanese && (
							<h2 className="text-xl text-gray-600">
								{anime.title_english} ({anime.title_japanese})
							</h2>
						)}
					</div>

					<div className="grid grid-cols-2 gap-4 mb-6">
						<div>
							<span className="font-semibold">Type: </span>
							{anime.type}
						</div>
						<div>
							<span className="font-semibold">Episodes: </span>
							{anime.episodes
								? `${anime.episodes} episodes (${anime.duration})`
								: 'Unknown'}
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
						<div>
							<span className="font-semibold">Rank: </span>
							{anime.rank ?? 'Unknown'}
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
						<div className="flex flex-wrap gap-2">
							<span className="font-semibold">
								{anime?.studios?.length > 1 ? 'Studios: ' : 'Studio: '}
							</span>
							{anime.studios?.map((studio, index) => (
								<div key={studio.name}>
									<a href={studio.url} key={studio.name}>
										{studio.name}
									</a>
									{index < (anime.studios?.length ?? 0) - 1 && ', '}
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
