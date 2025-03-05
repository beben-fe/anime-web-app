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
	});

	afterEach(() => {
		// Restore original methods
		document.addEventListener = originalAddEventListener;
		document.removeEventListener = originalRemoveEventListener;
		Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
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
		// Mock getBoundingClientRect - plenty of space below
		Element.prototype.getBoundingClientRect = jest.fn().mockReturnValue({
			top: 100,
			bottom: 150,
			height: 50,
		});

		// Mock window dimensions - large window
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

		// Should be positioned at the bottom since there's plenty of space
		expect(result.current.dropdownPosition).toBe('bottom');
	});

	it('should set dropdown position to top when there is not enough space below', () => {
		// Mock getBoundingClientRect with proper types
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

		const mockDefaultRect: MockRect = {
			top: 0,
			bottom: 0,
			height: 0,
			width: 0,
			left: 0,
			right: 0,
			x: 0,
			y: 0,
			toJSON: () => {},
		};

		jest
			.spyOn(HTMLElement.prototype, 'getBoundingClientRect')
			.mockImplementation(function (this: HTMLElement): DOMRect {
				return (
					this.className?.includes('button') ? mockButtonRect : mockDefaultRect
				) as DOMRect;
			});

		// Mock window dimensions - small window with very little space below
		Object.defineProperty(window, 'innerHeight', {
			writable: true,
			configurable: true,
			value: 600,
		});

		// In the hook, we're comparing:
		// spaceBelow (600 - 550 = 50) vs dropdownHeight (300)
		// AND spaceBelow (50) vs spaceAbove (500)
		// Since 50 < 300 AND 50 < 500, it should choose 'top'

		const { result } = renderHook(() => useFilterSelect());

		// Open the select to trigger position calculation
		act(() => {
			result.current.toggleSelect();
		});

		// Should be positioned at the top since there's not enough space below
		// and more space above than below
		expect(result.current.dropdownPosition).toBe('top');
	});
});
