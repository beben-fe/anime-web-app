import { render, screen, fireEvent } from '@testing-library/react';
import { FilterSelect } from '../FilterSelect';

// Add types for the ChevronDown props
interface ChevronDownProps {
	className: string;
}

// Mock the Lucide ChevronDown icon with proper types
jest.mock('lucide-react', () => ({
	ChevronDown: ({ className }: ChevronDownProps) => (
		<div data-testid="chevron-icon" className={className} />
	),
}));

// Add types for the useFilterSelect mock return value
interface UseFilterSelectMock {
	isSelectOpen: boolean;
	dropdownPosition: 'top' | 'bottom';
	selectRef: { current: HTMLDivElement | null };
	buttonRef: { current: HTMLButtonElement | null };
	toggleSelect: jest.Mock;
	closeSelect: jest.Mock;
}

// Mock the useFilterSelect hook with proper types
jest.mock('@/components/AnimeFilters/hooks/useFilterSelect', () => ({
	useFilterSelect: (): UseFilterSelectMock => ({
		isSelectOpen: false,
		dropdownPosition: 'bottom',
		selectRef: { current: document.createElement('div') },
		buttonRef: { current: document.createElement('button') },
		toggleSelect: jest.fn(),
		closeSelect: jest.fn(),
	}),
}));

describe('FilterSelect', () => {
	// Add types for the default props
	interface DefaultProps {
		label: string;
		id: string;
		value: string;
		onChange: jest.Mock;
		options: string[];
		placeholder: string;
	}

	const defaultProps: DefaultProps = {
		label: 'Test Filter',
		id: 'test-filter',
		value: '',
		onChange: jest.fn(),
		options: ['Option 1', 'Option 2', 'Option 3'],
		placeholder: 'Select an option',
	};

	beforeEach(() => {
		jest.clearAllMocks();
		// Reset the mock to make isSelectOpen controllable in individual tests
		jest
			.spyOn(
				require('@/components/AnimeFilters/hooks/useFilterSelect'),
				'useFilterSelect'
			)
			.mockImplementation(
				(): UseFilterSelectMock => ({
					isSelectOpen: false,
					dropdownPosition: 'bottom',
					selectRef: { current: document.createElement('div') },
					buttonRef: { current: document.createElement('button') },
					toggleSelect: jest.fn(),
					closeSelect: jest.fn(),
				})
			);
	});

	it('renders with a label and placeholder', () => {
		render(<FilterSelect {...defaultProps} />);

		expect(screen.getByText('Test Filter')).toBeInTheDocument();
		expect(screen.getByText('Select an option')).toBeInTheDocument();
		expect(screen.getByTestId('chevron-icon')).toBeInTheDocument();
	});

	it('displays the selected value when provided', () => {
		render(<FilterSelect {...defaultProps} value="Option 1" />);

		expect(screen.getByText('Option 1')).toBeInTheDocument();
	});

	it('calls toggleSelect when button is clicked', () => {
		const mockToggleSelect = jest.fn();

		jest
			.spyOn(
				require('@/components/AnimeFilters/hooks/useFilterSelect'),
				'useFilterSelect'
			)
			.mockImplementation(() => ({
				isSelectOpen: false,
				dropdownPosition: 'bottom',
				selectRef: { current: document.createElement('div') },
				buttonRef: { current: document.createElement('button') },
				toggleSelect: mockToggleSelect,
				closeSelect: jest.fn(),
			}));

		render(<FilterSelect {...defaultProps} />);

		const button = screen.getByRole('button');
		fireEvent.click(button);

		expect(mockToggleSelect).toHaveBeenCalledTimes(1);
	});

	it('renders options when dropdown is open', () => {
		jest
			.spyOn(
				require('@/components/AnimeFilters/hooks/useFilterSelect'),
				'useFilterSelect'
			)
			.mockImplementation(() => ({
				isSelectOpen: true,
				dropdownPosition: 'bottom',
				selectRef: { current: document.createElement('div') },
				buttonRef: { current: document.createElement('button') },
				toggleSelect: jest.fn(),
				closeSelect: jest.fn(),
			}));

		render(<FilterSelect {...defaultProps} />);

		expect(screen.getByText('Option 1')).toBeInTheDocument();
		expect(screen.getByText('Option 2')).toBeInTheDocument();
		expect(screen.getByText('Option 3')).toBeInTheDocument();
	});

	it('calls onChange and closeSelect when an option is selected', () => {
		const mockOnChange = jest.fn();
		const mockCloseSelect = jest.fn();

		jest
			.spyOn(
				require('@/components/AnimeFilters/hooks/useFilterSelect'),
				'useFilterSelect'
			)
			.mockImplementation(() => ({
				isSelectOpen: true,
				dropdownPosition: 'bottom',
				selectRef: { current: document.createElement('div') },
				buttonRef: { current: document.createElement('button') },
				toggleSelect: jest.fn(),
				closeSelect: mockCloseSelect,
			}));

		render(<FilterSelect {...defaultProps} onChange={mockOnChange} />);

		const option = screen.getByText('Option 2');
		fireEvent.click(option);

		expect(mockOnChange).toHaveBeenCalledWith('Option 2');
		expect(mockCloseSelect).toHaveBeenCalledTimes(1);
	});

	it('calls onChange with empty string when placeholder option is selected', () => {
		const mockOnChange = jest.fn();
		const mockCloseSelect = jest.fn();

		jest
			.spyOn(
				require('@/components/AnimeFilters/hooks/useFilterSelect'),
				'useFilterSelect'
			)
			.mockImplementation(() => ({
				isSelectOpen: true,
				dropdownPosition: 'bottom',
				selectRef: { current: document.createElement('div') },
				buttonRef: { current: document.createElement('button') },
				toggleSelect: jest.fn(),
				closeSelect: mockCloseSelect,
			}));

		render(<FilterSelect {...defaultProps} onChange={mockOnChange} />);

		const placeholderOptions = screen.getAllByText('Select an option');
		fireEvent.click(placeholderOptions[1]);

		expect(mockOnChange).toHaveBeenCalledWith('');
		expect(mockCloseSelect).toHaveBeenCalled();
	});

	it('renders dropdown at the top when dropdownPosition is top', () => {
		jest
			.spyOn(
				require('@/components/AnimeFilters/hooks/useFilterSelect'),
				'useFilterSelect'
			)
			.mockImplementation(() => ({
				isSelectOpen: true,
				dropdownPosition: 'top',
				selectRef: { current: document.createElement('div') },
				buttonRef: { current: document.createElement('button') },
				toggleSelect: jest.fn(),
				closeSelect: jest.fn(),
			}));

		const { container } = render(<FilterSelect {...defaultProps} />);

		const dropdown = container.querySelector(
			'.bottom-\\[calc\\(100\\%\\+0\\.25rem\\)\\]'
		);
		expect(dropdown).toBeInTheDocument();
	});

	it('rotates chevron icon when dropdown is open', () => {
		jest
			.spyOn(
				require('@/components/AnimeFilters/hooks/useFilterSelect'),
				'useFilterSelect'
			)
			.mockImplementation(() => ({
				isSelectOpen: true,
				dropdownPosition: 'bottom',
				selectRef: { current: document.createElement('div') },
				buttonRef: { current: document.createElement('button') },
				toggleSelect: jest.fn(),
				closeSelect: jest.fn(),
			}));

		render(<FilterSelect {...defaultProps} />);

		const chevronIcon = screen.getByTestId('chevron-icon');
		expect(chevronIcon.className).toContain('rotate-180');
	});
});
