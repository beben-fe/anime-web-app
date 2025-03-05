import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PageProvider } from '@/context/PageContext';

// Create a custom render method that includes providers
const createTestQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
				gcTime: 0,
			},
		},
	});

type CustomRenderOptions = {
	queryClient?: QueryClient;
} & Omit<RenderOptions, 'wrapper'>;

function customRender(
	ui: React.ReactElement,
	options: CustomRenderOptions = {}
) {
	const { queryClient = createTestQueryClient(), ...renderOptions } = options;

	const Wrapper = ({ children }: { children: React.ReactNode }) => (
		<QueryClientProvider client={queryClient}>
			<PageProvider>{children}</PageProvider>
		</QueryClientProvider>
	);

	return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// Re-export everything from testing-library
export * from '@testing-library/react';

// Override render method
export { customRender as render };
