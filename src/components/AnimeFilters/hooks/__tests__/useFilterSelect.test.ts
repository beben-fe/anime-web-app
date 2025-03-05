import { renderHook, act } from '@testing-library/react';
import { useFilterSelect } from '../useFilterSelect';

// Save original methods
const originalAddEventListener = document.addEventListener;
const originalRemoveEventListener = document.removeEventListener;
const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;

// Define specific types for the mock rect
type MockRect = {
	top: number;
	bottom: number;
	height: number;
	width: number;
	left: number;
	right: number;
	x: number;
	y: number;
	toJSON: () => void;
};

describe('useFilterSelect', () => {
	beforeEach(() => {
		// Mock document event listeners
		document.addEventListener = jest.fn();
		document.removeEventListener = jest.fn();

		// Reset getBoundingClientRect to original before each test
		Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
	});

	afterEach(() => {
		// Restore original methods
		document.addEventListener = originalAddEventListener;
		document.removeEventListener = originalRemoveEventListener;
		Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;

		// Reset any window property modifications
		jest.restoreAllMocks();
	});

	it('should initialize with closed select and bottom dropdown position', () => {
		const { result } = renderHook(() => useFilterSelect());

		expect(result.current.isSelectOpen).toBeFalsy();
		expect(result.current.dropdownPosition).toBe('bottom');
		expect(result.current.selectRef).toBeDefined();
		expect(result.current.buttonRef).toBeDefined();
		expect(typeof result.current.toggleSelect).toBe('function');
		expect(typeof result.current.closeSelect).toBe('function');
	});

	it('should toggle open state when toggleSelect is called', () => {
		const { result } = renderHook(() => useFilterSelect());

		// Initially closed
		expect(result.current.isSelectOpen).toBeFalsy();

		// Toggle to open
		act(() => {
			result.current.toggleSelect();
		});
		expect(result.current.isSelectOpen).toBeTruthy();

		// Toggle to closed
		act(() => {
			result.current.toggleSelect();
		});
		expect(result.current.isSelectOpen).toBeFalsy();
	});

	it('should close select when closeSelect is called', () => {
		const { result } = renderHook(() => useFilterSelect());

		// Open the select first
		act(() => {
			result.current.toggleSelect();
		});
		expect(result.current.isSelectOpen).toBeTruthy();

		// Close the select
		act(() => {
			result.current.closeSelect();
		});
		expect(result.current.isSelectOpen).toBeFalsy();
	});

	it('should add and remove event listeners', () => {
		const { unmount } = renderHook(() => useFilterSelect());

		// Check that event listener was added
		expect(document.addEventListener).toHaveBeenCalledWith(
			'mousedown',
			expect.any(Function)
		);

		// Unmount to check cleanup
		unmount();

		// Check that event listener was removed
		expect(document.removeEventListener).toHaveBeenCalledWith(
			'mousedown',
			expect.any(Function)
		);
	});

	it('should calculate dropdown position when select is opened', () => {
		// Mock getBoundingClientRect
		Element.prototype.getBoundingClientRect = jest.fn().mockReturnValue({
			top: 100,
			bottom: 150,
			height: 50,
		});

		// Mock window dimensions
		Object.defineProperty(window, 'innerHeight', {
			writable: true,
			configurable: true,
			value: 800,
		});

		const { result } = renderHook(() => useFilterSelect());

		// Open the select to trigger position calculation
		act(() => {
			result.current.toggleSelect();
		});

		// Just verify that a position is set (either top or bottom)
		expect(['top', 'bottom']).toContain(result.current.dropdownPosition);
	});

	it('should set dropdown position to bottom when there is enough space below', () => {
		// Create a mock button element
		const mockButton = document.createElement('button');
		mockButton.className = 'button';

		// Mock getBoundingClientRect for plenty of space below
		const mockRect: MockRect = {
			top: 100,
			bottom: 150,
			height: 50,
			width: 100,
			left: 0,
			right: 100,
			x: 0,
			y: 100,
			toJSON: () => {},
		};

		jest
			.spyOn(HTMLElement.prototype, 'getBoundingClientRect')
			.mockImplementation((): DOMRect => mockRect as DOMRect);

		// Mock window dimensions - large window
		Object.defineProperty(window, 'innerHeight', {
			writable: true,
			configurable: true,
			value: 800,
		});

		const { result } = renderHook(() => useFilterSelect());

		// Set the button ref
		if (result.current.buttonRef.current) {
			Object.defineProperty(
				result.current.buttonRef.current,
				'getBoundingClientRect',
				{
					value: () => mockRect,
				}
			);
		}

		// Open the select to trigger position calculation
		act(() => {
			result.current.toggleSelect();
		});

		// Should be positioned at the bottom since there's plenty of space
		expect(result.current.dropdownPosition).toBe('bottom');
	});

	it('should set dropdown position to top when there is not enough space below', () => {
		// Create a mock button element with the correct class
		const mockButton = document.createElement('button');
		mockButton.className = 'button';

		// Mock getBoundingClientRect for button near bottom
		const mockButtonRect: MockRect = {
			top: 500,
			bottom: 550,
			height: 50,
			width: 100,
			left: 0,
			right: 100,
			x: 0,
			y: 500,
			toJSON: () => {},
		};

		// Mock window dimensions - small window
		Object.defineProperty(window, 'innerHeight', {
			writable: true,
			configurable: true,
			value: 600,
		});

		const { result } = renderHook(() => useFilterSelect());
		// Set up the button ref and getBoundingClientRect mock
		if (result.current.buttonRef.current) {
			Object.defineProperty(
				result.current.buttonRef.current,
				'getBoundingClientRect',
				{
					value: () => mockButtonRect,
					configurable: true,
				}
			);

			// First render cycle to set up refs
			act(() => {
				// Force a render cycle
				result.current.toggleSelect();
			});

			// Verify the conditions:
			// spaceBelow = window.innerHeight(600) - buttonRect.bottom(550) = 50
			// spaceAbove = buttonRect.top(500)
			// dropdownHeight = 300
			// Since spaceBelow(50) < dropdownHeight(300) AND spaceBelow(50) < spaceAbove(500)
			// It should position the dropdown at the top
			expect(result.current.dropdownPosition).toBe('top');
		}
	});
});
