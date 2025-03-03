import { Loader2, X } from 'lucide-react';

interface SearchBarProps {
	search: string;
	isFetching: boolean;
	onSearch: (value: string) => void;
	onClear: () => void;
}

export function SearchBar({
	search,
	isFetching,
	onSearch,
	onClear,
}: SearchBarProps) {
	return (
		<div className="mb-8">
			<div className="relative w-full max-w-md">
				<input
					type="text"
					placeholder="Search anime..."
					value={search}
					onChange={(e) => onSearch(e.target.value)}
					className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
				/>
				{isFetching ? (
					<div className="absolute right-3 top-1/2 -translate-y-1/2">
						<Loader2 className="w-4 h-4 animate-spin text-gray-400" />
					</div>
				) : (
					search && (
						<button
							onClick={onClear}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
							aria-label="Clear search">
							<X size={18} />
						</button>
					)
				)}
			</div>
		</div>
	);
}
