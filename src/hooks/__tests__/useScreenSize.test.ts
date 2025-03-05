import { renderHook, act } from '@testing-library/react';
import { useScreenSize } from '../useScreenSize';

describe('useScreenSize', () => {
	// Store original innerWidth
	const originalInnerWidth = window.innerWidth;

	// Restore original window properties after tests
	afterEach(() => {
		window.innerWidth = originalInnerWidth;
		jest.restoreAllMocks();
	});

	it('should return isMobile: true and itemsPerPage: 16 for mobile screens', () => {
		// Mock mobile screen size
		window.innerWidth = 480;

		// Simulate window resize event
		const resizeEvent = new Event('resize');

		const { result } = renderHook(() => useScreenSize());

		// Fire resize event
		act(() => {
			window.dispatchEvent(resizeEvent);
		});

		// Check values for mobile
		expect(result.current.isMobile).toBe(true);
		expect(result.current.itemsPerPage).toBe(16);
	});

	it('should return isMobile: false and itemsPerPage: 24 for desktop screens', () => {
		// Mock desktop screen size
		window.innerWidth = 1024;

		// Simulate window resize event
		const resizeEvent = new Event('resize');

		const { result } = renderHook(() => useScreenSize());

		// Fire resize event
		act(() => {
			window.dispatchEvent(resizeEvent);
		});

		// Check values for desktop
		expect(result.current.isMobile).toBe(false);
		expect(result.current.itemsPerPage).toBe(24);
	});

	it('should update values when window is resized', () => {
		// Start with desktop size
		window.innerWidth = 1024;

		const { result } = renderHook(() => useScreenSize());

		// Initial values should be for desktop
		expect(result.current.isMobile).toBe(false);
		expect(result.current.itemsPerPage).toBe(24);

		// Change to mobile size and trigger resize
		act(() => {
			window.innerWidth = 480;
			window.dispatchEvent(new Event('resize'));
		});

		// Values should update to mobile settings
		expect(result.current.isMobile).toBe(true);
		expect(result.current.itemsPerPage).toBe(16);
	});

	it('should remove event listener on unmount', () => {
		// Spy on window event listeners
		const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

		const { unmount } = renderHook(() => useScreenSize());

		// Unmount hook
		unmount();

		// Check if removeEventListener was called with correct arguments
		expect(removeEventListenerSpy).toHaveBeenCalledWith(
			'resize',
			expect.any(Function)
		);
	});
});
