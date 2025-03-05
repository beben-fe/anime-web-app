import { truncateText } from '../index';

describe('truncateText', () => {
	it('returns the original text if it is shorter than maxLength', () => {
		const text = 'Hello, world!';
		const maxLength = 20;

		expect(truncateText(text, maxLength)).toBe(text);
	});

	it('truncates text and adds ellipsis if longer than maxLength', () => {
		const text = 'This is a very long text that needs to be truncated';
		const maxLength = 10;

		expect(truncateText(text, maxLength)).toBe('This is a ...');
	});

	it('handles edge case with maxLength of 0', () => {
		const text = 'Some text';
		const maxLength = 0;

		expect(truncateText(text, maxLength)).toBe('...');
	});

	it('handles edge case with empty string', () => {
		const text = '';
		const maxLength = 5;

		expect(truncateText(text, maxLength)).toBe('');
	});
});
