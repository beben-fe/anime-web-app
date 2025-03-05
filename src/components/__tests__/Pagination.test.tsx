import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '../Pagination';

// Mock window.innerWidth
const originalInnerWidth = window.innerWidth;

describe('Pagination', () => {
	const mockOnPageChange = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		// Reset innerWidth
		Object.defineProperty(window, 'innerWidth', {
			writable: true,
			configurable: true,
			value: 1024, // Default to desktop
		});
	});

	afterEach(() => {
		// Restore original innerWidth
		Object.defineProperty(window, 'innerWidth', {
			writable: true,
			configurable: true,
			value: originalInnerWidth,
		});
	});

	it('renders current page as active', () => {
		render(
			<Pagination
				page={3}
				hasNextPage={true}
				lastVisiblePage={10}
				onPageChange={mockOnPageChange}
			/>
		);

		// Current page button should have a specific background color
		const currentPageButton = screen.getByRole('button', { name: '3' });
		expect(currentPageButton).toHaveClass('bg-gray-700');
		expect(currentPageButton).toBeDisabled();
	});

	it('disables prev button on first page', () => {
		render(
			<Pagination
				page={1}
				hasNextPage={true}
				lastVisiblePage={10}
				onPageChange={mockOnPageChange}
			/>
		);

		// Get the previous button (first button)
		const prevButton = screen.getAllByRole('button')[0];
		expect(prevButton).toBeDisabled();
	});

	it('disables next button on last page', () => {
		render(
			<Pagination
				page={10}
				hasNextPage={false}
				lastVisiblePage={10}
				onPageChange={mockOnPageChange}
			/>
		);

		// Get the next button (last button)
		const buttons = screen.getAllByRole('button');
		const nextButton = buttons[buttons.length - 1];
		expect(nextButton).toBeDisabled();
	});

	it('calls onPageChange with correct page when clicking buttons', () => {
		render(
			<Pagination
				page={5}
				hasNextPage={true}
				lastVisiblePage={10}
				onPageChange={mockOnPageChange}
			/>
		);

		// Click on page 1
		fireEvent.click(screen.getByRole('button', { name: '1' }));
		expect(mockOnPageChange).toHaveBeenCalledWith(1);

		// Click on next button
		const buttons = screen.getAllByRole('button');
		const nextButton = buttons[buttons.length - 1];
		fireEvent.click(nextButton);
		expect(mockOnPageChange).toHaveBeenCalledWith(6);

		// Click on prev button
		const prevButton = buttons[0];
		fireEvent.click(prevButton);
		expect(mockOnPageChange).toHaveBeenCalledWith(4);
	});

	it('shows appropriate page numbers with ellipsis for large page ranges', () => {
		render(
			<Pagination
				page={50}
				hasNextPage={true}
				lastVisiblePage={100}
				onPageChange={mockOnPageChange}
			/>
		);

		// Should show first page
		expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();

		// Should show ellipsis (there are multiple ellipsis elements)
		expect(screen.getAllByText('...')).toHaveLength(2);

		// Should show current page
		expect(screen.getByRole('button', { name: '50' })).toBeInTheDocument();

		// Should show some pages after current
		expect(screen.getByRole('button', { name: '51' })).toBeInTheDocument();

		// Should show last page
		expect(screen.getByRole('button', { name: '100' })).toBeInTheDocument();
	});

	it('shows fewer pages on mobile viewport', () => {
		// Set window to mobile width
		Object.defineProperty(window, 'innerWidth', {
			writable: true,
			configurable: true,
			value: 500, // Mobile size
		});

		render(
			<Pagination
				page={5}
				hasNextPage={true}
				lastVisiblePage={10}
				onPageChange={mockOnPageChange}
			/>
		);

		// Should only show a limited number of buttons on mobile
		const pageButtons = screen.getAllByRole('button');
		// 1 prev + 5 pages + 1 next = 7 maximum
		expect(pageButtons.length).toBeLessThanOrEqual(7);
	});
});
