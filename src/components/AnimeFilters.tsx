import { X } from 'lucide-react';
import { Filters } from '@/types/anime';

interface AnimeFiltersProps {
	filters: Filters;
	onFilterChange: (filters: Filters) => void;
}

const ANIME_TYPES = ['TV', 'Movie', 'OVA', 'Special', 'ONA', 'Music'];
const ANIME_STATUS = ['Airing', 'Complete', 'Upcoming'];
const ANIME_RATINGS = ['G', 'PG', 'PG-13', 'R', 'R+', 'Rx'];
const ANIME_GENRES = [
	'Action',
	'Adventure',
	'Comedy',
	'Drama',
	'Fantasy',
	'Horror',
	'Mystery',
	'Romance',
	'Sci-Fi',
	'Slice of Life',
	'Sports',
	'Supernatural',
	'Thriller',
];

export function AnimeFilters({ filters, onFilterChange }: AnimeFiltersProps) {
	const clearFilters = () => {
		onFilterChange({
			type: '',
			score: '',
			status: '',
			rating: '',
			genres: [],
		});
	};

	return (
		<div className="mb-8">
			<div className="bg-white p-4 rounded-lg shadow-md">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
					{/* Type Filter */}
					<FilterSelect
						label="Type"
						id="type"
						value={filters.type}
						onChange={(value) => onFilterChange({ ...filters, type: value })}
						options={ANIME_TYPES}
						placeholder="All Types"
					/>

					{/* Score Filter */}
					<FilterSelect
						label="Minimum Score"
						id="score"
						value={filters.score}
						onChange={(value) => onFilterChange({ ...filters, score: value })}
						options={[9, 8, 7, 6, 5].map((score) => `${score}+ Stars`)}
						placeholder="Any Score"
					/>

					{/* Status Filter */}
					<FilterSelect
						label="Status"
						id="status"
						value={filters.status}
						onChange={(value) => onFilterChange({ ...filters, status: value })}
						options={ANIME_STATUS}
						placeholder="All Status"
					/>

					{/* Rating Filter */}
					<FilterSelect
						label="Age Rating"
						id="rating"
						value={filters.rating}
						onChange={(value) => onFilterChange({ ...filters, rating: value })}
						options={ANIME_RATINGS}
						placeholder="All Ratings"
					/>

					{/* Genres Filter */}
					<FilterSelect
						label="Genre"
						id="genres"
						value={filters.genres.length ? filters.genres[0] : ''}
						onChange={(value) =>
							onFilterChange({ ...filters, genres: value ? [value] : [] })
						}
						options={ANIME_GENRES}
						placeholder="All Genres"
					/>
				</div>

				{/* Clear Filters Button */}
				{(filters.type ||
					filters.score ||
					filters.status ||
					filters.rating ||
					filters.genres.length > 0) && (
					<div className="mt-4 flex justify-end">
						<button
							onClick={clearFilters}
							className="px-4 py-2 text-sm bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2">
							<X size={16} />
							Clear All Filters
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

interface FilterSelectProps {
	label: string;
	id: string;
	value: string;
	onChange: (value: string) => void;
	options: (string | number)[];
	placeholder: string;
}

function FilterSelect({
	label,
	id,
	value,
	onChange,
	options,
	placeholder,
}: FilterSelectProps) {
	return (
		<div className="w-full">
			<label
				htmlFor={id}
				className="block text-sm font-medium text-gray-700 mb-1">
				{label}
			</label>
			<select
				id={id}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="w-full px-3 py-2 h-10 rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
				<option value="">{placeholder}</option>
				{options.map((option) => (
					<option key={option} value={option} className="text-gray-900">
						{option}
					</option>
				))}
			</select>
		</div>
	);
}
