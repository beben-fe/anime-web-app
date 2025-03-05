import { render, screen, fireEvent } from '@testing-library/react';
import { ScrollToTop } from '../ScrollToTop';

// Mock the Lucide ArrowUp icon
jest.mock('lucide-react', () => ({
	ArrowUp: () => <div data-testid="arrow-up-icon" />,
}));

describe('ScrollToTop', () => {
	const mockOnClick = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders button when visible is true', () => {
		render(<ScrollToTop visible={true} onClick={mockOnClick} />);

		expect(
			screen.getByRole('button', { name: /scroll to top/i })
		).toBeInTheDocument();
		expect(screen.getByTestId('arrow-up-icon')).toBeInTheDocument();
	});

	it('does not render button when visible is false', () => {
		render(<ScrollToTop visible={false} onClick={mockOnClick} />);

		expect(
			screen.queryByRole('button', { name: /scroll to top/i })
		).not.toBeInTheDocument();
		expect(screen.queryByTestId('arrow-up-icon')).not.toBeInTheDocument();
	});

	it('calls onClick when button is clicked', () => {
		render(<ScrollToTop visible={true} onClick={mockOnClick} />);

		const button = screen.getByRole('button', { name: /scroll to top/i });
		fireEvent.click(button);

		expect(mockOnClick).toHaveBeenCalledTimes(1);
	});
});
