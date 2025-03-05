import { render, fireEvent, screen } from '@testing-library/react';
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

// Mock window.matchMedia for testing
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: jest.fn().mockImplementation((query) => ({
		matches: false, // Default to desktop view
		media: query,
		onchange: null,
		addListener: jest.fn(),
		removeListener: jest.fn(),
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
});

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
		// Mock mobile view
		window.matchMedia = jest.fn().mockImplementation((query) => ({
			matches: true, // Set to true to simulate mobile
			media: query,
			onchange: null,
			addListener: jest.fn(),
			removeListener: jest.fn(),
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
			dispatchEvent: jest.fn(),
		}));

		const { getByText } = render(
			<AnimeFilters filters={mockFilters} onFilterChange={mockOnFilterChange} />
		);

		// Initially filter content should not be visible on mobile
		const filterButton = getByText('Filters');

		// Click to show filters
		fireEvent.click(filterButton);

		// Now filter selects should be visible
		expect(screen.getByText('Type')).toBeInTheDocument();
	});

	it('calls onFilterChange when a filter is changed', () => {
		// Mock desktop view
		window.matchMedia = jest.fn().mockImplementation((query) => ({
			matches: false, // Set to false for desktop
			media: query,
			onchange: null,
			addListener: jest.fn(),
			removeListener: jest.fn(),
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
			dispatchEvent: jest.fn(),
		}));

		render(
			<AnimeFilters filters={mockFilters} onFilterChange={mockOnFilterChange} />
		);

		// Find the type filter button by its placeholder text
		const typeButton = screen.getByText('All Types');
		fireEvent.click(typeButton);

		// Find and click the TV option
		const tvOption = screen.getByText('TV');
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

		render(
			<AnimeFilters
				filters={filtersWithValues}
				onFilterChange={mockOnFilterChange}
			/>
		);

		// Find and click the clear button
		const clearButton = screen.getByText('Clear All Filters');
		fireEvent.click(clearButton);

		// Check if onFilterChange was called with empty filters
		expect(mockOnFilterChange).toHaveBeenCalledWith(mockFilters);
	});
});
