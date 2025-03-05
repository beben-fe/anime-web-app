import '@testing-library/jest-dom';

// Mock Next.js modules
jest.mock('next/navigation', () => ({
	useRouter() {
		return {
			push: jest.fn(),
			replace: jest.fn(),
			prefetch: jest.fn(),
			back: jest.fn(),
		};
	},
	useSearchParams() {
		return {
			get: jest.fn((key) => {
				if (key === 'page') return '1';
				return null;
			}),
		};
	},
	useParams() {
		return { id: '1' };
	},
}));

// Mock next/image
jest.mock('next/image', () => ({
	__esModule: true,
	default: (props) => {
		// eslint-disable-next-line jsx-a11y/alt-text
		return <img {...props} data-testid="next-image" />;
	},
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: jest.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(),
		removeListener: jest.fn(),
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
});

// Reset mocks before each test
beforeEach(() => {
	jest.clearAllMocks();
});
