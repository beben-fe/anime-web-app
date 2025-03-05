import React from 'react';
import { render } from '@testing-library/react';
import RootLayout from '../layout';

// Mock the providers
jest.mock('../providers', () => ({
	Providers: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="providers">{children}</div>
	),
}));

jest.mock('@/context/PageContext', () => ({
	PageProvider: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="page-provider">{children}</div>
	),
}));

// Mock the Inter font
jest.mock('next/font/google', () => ({
	Inter: () => ({
		className: 'mocked-inter-font',
	}),
}));

// Mock the html and body elements
const originalCreateElement = document.createElement.bind(document);
document.createElement = jest.fn((tagName) => {
	if (tagName === 'html') {
		const element = originalCreateElement('div');
		element.setAttribute('lang', 'en');
		return element;
	}
	if (tagName === 'body') {
		const element = originalCreateElement('div');
		element.className = 'mocked-inter-font';
		return element;
	}
	return originalCreateElement(tagName);
}) as typeof document.createElement;

describe('RootLayout', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders the layout with providers and children', () => {
		const { getByTestId, getByText } = render(
			<RootLayout>
				<div>Test Child Content</div>
			</RootLayout>
		);

		// Check that providers are rendered
		expect(getByTestId('page-provider')).toBeInTheDocument();
		expect(getByTestId('providers')).toBeInTheDocument();

		// Check that children are rendered
		expect(getByText('Test Child Content')).toBeInTheDocument();
	});
});
