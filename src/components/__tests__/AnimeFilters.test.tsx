import { render, fireEvent } from '@testing-library/react';
import { AnimeFilters } from '../AnimeFilters';

// Mock data
const mockFilters = {
	type: '',
	score: '',
	status: '',
	rating: '',
	genres: [],
};

const mockOnFilterChange = jest.fn();

describe('AnimeFilters', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders the filter buttons', () => {
		const { getByText } = render(
			<AnimeFilters filters={mockFilters} onFilterChange={mockOnFilterChange} />
		);

		expect(getByText('Filters')).toBeInTheDocument();
	});

	it('toggles the filter panel when filter button is clicked', () => {
		const { getByText, queryByText } = render(
			<AnimeFilters filters={mockFilters} onFilterChange={mockOnFilterChange} />
		);

		// Initially filter content should not be visible on mobile
		const filterButton = getByText('Filters');
		expect(queryByText('Type')).not.toBeInTheDocument();

		// Click to show filters
		fireEvent.click(filterButton);

		// Now filter selects should be visible
		expect(queryByText('Type')).toBeInTheDocument();
	});

	it('calls onFilterChange when a filter is changed', () => {
		// Set initial viewport to desktop size
		global.innerWidth = 1024;

		const { getByLabelText, getAllByRole } = render(
			<AnimeFilters filters={mockFilters} onFilterChange={mockOnFilterChange} />
		);

		// Find the type filter
		const typeLabel = getByLabelText('Type');
		fireEvent.click(typeLabel.nextElementSibling);

		// Select TV option
		const options = getAllByRole('button');
		const tvOption = options.find((option) => option.textContent === 'TV');
		fireEvent.click(tvOption);

		// Check if onFilterChange was called with correct params
		expect(mockOnFilterChange).toHaveBeenCalledWith({
			...mockFilters,
			type: 'TV',
		});
	});

	it('clears all filters when clear button is clicked', () => {
		const filtersWithValues = {
			type: 'TV',
			score: '8',
			status: 'Airing',
			rating: 'PG-13',
			genres: ['Action'],
		};

		const { getByText } = render(
			<AnimeFilters
				filters={filtersWithValues}
				onFilterChange={mockOnFilterChange}
			/>
		);

		// Find and click the clear button
		const clearButton = getByText('Clear all');
		fireEvent.click(clearButton);

		// Check if onFilterChange was called with empty filters
		expect(mockOnFilterChange).toHaveBeenCalledWith(mockFilters);
	});
});
