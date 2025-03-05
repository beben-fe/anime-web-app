import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '../SearchBar';

// Mock the Lucide icons
jest.mock('lucide-react', () => ({
	Loader2: () => <div data-testid="loader-icon" />,
	X: () => <div data-testid="clear-icon" />,
}));

describe('SearchBar', () => {
	const mockOnSearch = jest.fn();
	const mockOnClear = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders with placeholder text', () => {
		render(
			<SearchBar
				search=""
				isFetching={false}
				onSearch={mockOnSearch}
				onClear={mockOnClear}
			/>
		);

		expect(screen.getByPlaceholderText('Search anime...')).toBeInTheDocument();
	});

	it('displays the search value', () => {
		render(
			<SearchBar
				search="Attack on Titan"
				isFetching={false}
				onSearch={mockOnSearch}
				onClear={mockOnClear}
			/>
		);

		const input = screen.getByPlaceholderText(
			'Search anime...'
		) as HTMLInputElement;
		expect(input.value).toBe('Attack on Titan');
	});

	it('calls onSearch when input value changes', () => {
		render(
			<SearchBar
				search=""
				isFetching={false}
				onSearch={mockOnSearch}
				onClear={mockOnClear}
			/>
		);

		const input = screen.getByPlaceholderText('Search anime...');
		fireEvent.change(input, { target: { value: 'Naruto' } });

		expect(mockOnSearch).toHaveBeenCalledWith('Naruto');
	});

	it('shows loading indicator when isFetching is true', () => {
		render(
			<SearchBar
				search="One Piece"
				isFetching={true}
				onSearch={mockOnSearch}
				onClear={mockOnClear}
			/>
		);

		expect(screen.getByTestId('loader-icon')).toBeInTheDocument();
	});

	it('shows clear button when search has value and not fetching', () => {
		render(
			<SearchBar
				search="Death Note"
				isFetching={false}
				onSearch={mockOnSearch}
				onClear={mockOnClear}
			/>
		);

		const clearButton = screen.getByRole('button', { name: /clear search/i });
		expect(clearButton).toBeInTheDocument();
		expect(screen.getByTestId('clear-icon')).toBeInTheDocument();

		fireEvent.click(clearButton);
		expect(mockOnClear).toHaveBeenCalledTimes(1);
	});

	it('does not show clear button when search is empty', () => {
		render(
			<SearchBar
				search=""
				isFetching={false}
				onSearch={mockOnSearch}
				onClear={mockOnClear}
			/>
		);

		expect(
			screen.queryByRole('button', { name: /clear search/i })
		).not.toBeInTheDocument();
		expect(screen.queryByTestId('clear-icon')).not.toBeInTheDocument();
	});
});
