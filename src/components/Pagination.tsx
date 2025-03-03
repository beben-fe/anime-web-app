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
	const getPageNumbers = () => {
		const pages: (number | string)[] = [];
		const maxVisiblePages = 4;

		pages.push(1);

		if (page > 3) {
			pages.push('start-ellipsis');
		}

		for (
			let i = Math.max(2, page);
			i <= Math.min(page + maxVisiblePages, lastVisiblePage);
			i++
		) {
			if (!pages.includes(i)) {
				pages.push(i);
			}
		}

		if (page + maxVisiblePages < lastVisiblePage - 1) {
			pages.push('end-ellipsis');
		}

		if (lastVisiblePage > 1 && !pages.includes(lastVisiblePage)) {
			pages.push(lastVisiblePage);
		}

		return pages;
	};

	return (
		<div className="mt-8 flex justify-center items-center gap-2">
			<button
				onClick={() => onPageChange(Math.max(1, page - 1))}
				disabled={page === 1}
				className="px-4 py-2 rounded-lg bg-blue-500 text-white disabled:bg-gray-300 cursor-pointer">
				Previous
			</button>
			<div className="flex items-center gap-2">
				{getPageNumbers().map((pageNum) =>
					typeof pageNum === 'string' ? (
						<span key={pageNum} className="px-2">
							...
						</span>
					) : (
						<button
							key={`page-${pageNum}`}
							onClick={() => onPageChange(pageNum)}
							disabled={pageNum === page}
							className={`w-10 h-10 rounded-lg ${
								pageNum === page
									? 'bg-blue-600 text-white'
									: 'bg-blue-400 hover:bg-blue-500'
							}`}>
							{pageNum}
						</button>
					)
				)}
			</div>
			<button
				onClick={() => onPageChange(page + 1)}
				disabled={!hasNextPage}
				className="px-4 py-2 rounded-lg bg-blue-500 text-white disabled:bg-gray-300 cursor-pointer">
				Next
			</button>
		</div>
	);
}
