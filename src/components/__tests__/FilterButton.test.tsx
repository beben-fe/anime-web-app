import { render, screen, fireEvent } from '@testing-library/react';
import { FilterButton } from '../AnimeFilters/FilterButton';

// Mock Lucide icons
jest.mock('lucide-react', () => ({
	Filter: () => <div data-testid="filter-icon" />,
	ChevronDown: () => <div data-testid="chevron-down-icon" />,
	ChevronUp: () => <div data-testid="chevron-up-icon" />,
}));

describe('FilterButton', () => {
	const defaultProps = {
		isOpen: false,
		hasActiveFilters: false,
		onClick: jest.fn(),
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders basic button with filter text', () => {
		render(<FilterButton {...defaultProps} />);

		expect(screen.getByText('Filters')).toBeInTheDocument();
		expect(screen.getByTestId('filter-icon')).toBeInTheDocument();
	});

	it('shows chevron down icon when closed', () => {
		render(<FilterButton {...defaultProps} isOpen={false} />);

		expect(screen.getByTestId('chevron-down-icon')).toBeInTheDocument();
		expect(screen.queryByTestId('chevron-up-icon')).not.toBeInTheDocument();
	});

	it('shows chevron up icon when open', () => {
		render(<FilterButton {...defaultProps} isOpen={true} />);

		expect(screen.getByTestId('chevron-up-icon')).toBeInTheDocument();
		expect(screen.queryByTestId('chevron-down-icon')).not.toBeInTheDocument();
	});

	it('shows active badge when filters are active', () => {
		render(<FilterButton {...defaultProps} hasActiveFilters={true} />);

		expect(screen.getByText('Active')).toBeInTheDocument();
	});

	it('does not show active badge when no filters are active', () => {
		render(<FilterButton {...defaultProps} hasActiveFilters={false} />);

		expect(screen.queryByText('Active')).not.toBeInTheDocument();
	});

	it('calls onClick handler when clicked', () => {
		render(<FilterButton {...defaultProps} />);

		const button = screen.getByRole('button');
		fireEvent.click(button);

		expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
	});
});
