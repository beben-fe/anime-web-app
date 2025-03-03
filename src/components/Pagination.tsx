interface PaginationProps {
	page: number;
	hasNextPage: boolean;
	lastVisiblePage: number;
	onPageChange: (page: number) => void;
}

export function Pagination({
	page,
	hasNextPage,
	lastVisiblePage,
	onPageChange,
}: PaginationProps) {
	return (
		<div className="mt-8 flex justify-center gap-2">
			<button
				onClick={() => onPageChange(Math.max(1, page - 1))}
				disabled={page === 1}
				className="px-4 py-2 rounded-lg bg-blue-500 text-white disabled:bg-gray-300 cursor-pointer">
				Previous
			</button>
			<span className="px-4 py-2">
				Page {page} of {lastVisiblePage}
			</span>
			<button
				onClick={() => onPageChange(page + 1)}
				disabled={!hasNextPage}
				className="px-4 py-2 rounded-lg bg-blue-500 text-white disabled:bg-gray-300 cursor-pointer">
				Next
			</button>
		</div>
	);
}
