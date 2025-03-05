import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PageProvider, usePage } from '../PageContext';

// Test component that uses the context
function TestComponent() {
	const { currentPage, setCurrentPage } = usePage();
	return (
		<div>
			<span data-testid="current-page">{currentPage}</span>
			<button onClick={() => setCurrentPage('2')}>Change Page</button>
		</div>
	);
}

describe('PageContext', () => {
	it('provides default page value', () => {
		render(
			<PageProvider>
				<TestComponent />
			</PageProvider>
		);

		expect(screen.getByTestId('current-page')).toHaveTextContent('1');
	});

	it('updates page value when setCurrentPage is called', async () => {
		const user = userEvent.setup();
		render(
			<PageProvider>
				<TestComponent />
			</PageProvider>
		);

		await user.click(screen.getByRole('button', { name: /change page/i }));

		expect(screen.getByTestId('current-page')).toHaveTextContent('2');
	});
});
