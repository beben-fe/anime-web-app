import React from 'react';
import { render } from '@testing-library/react';
import { Providers } from '../providers';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Mock the react-query components
jest.mock('@tanstack/react-query', () => {
	const actual = jest.requireActual('@tanstack/react-query');
	return {
		...actual,
		QueryClientProvider: jest.fn(({ children }) => (
			<div data-testid="query-provider">{children}</div>
		)),
	};
});

jest.mock('@tanstack/react-query-devtools', () => ({
	ReactQueryDevtools: jest.fn(() => <div data-testid="query-devtools" />),
}));

describe('Providers', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('renders QueryClientProvider with children', () => {
		const { getByTestId, getByText } = render(
			<Providers>
				<div>Test Child</div>
			</Providers>
		);

		// Check if QueryClientProvider is rendered
		expect(getByTestId('query-provider')).toBeInTheDocument();

		// Check if children are rendered
		expect(getByText('Test Child')).toBeInTheDocument();

		// Check if ReactQueryDevtools is rendered
		expect(getByTestId('query-devtools')).toBeInTheDocument();

		// Verify QueryClientProvider was called with the correct props
		expect(QueryClientProvider).toHaveBeenCalledWith(
			expect.objectContaining({
				client: expect.anything(),
			}),
			expect.anything()
		);

		// Verify ReactQueryDevtools was called with initialIsOpen: false
		expect(ReactQueryDevtools).toHaveBeenCalledWith(
			{ initialIsOpen: false },
			expect.anything()
		);
	});
});
