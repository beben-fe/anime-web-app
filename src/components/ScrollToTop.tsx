import { ArrowUp } from 'lucide-react';

interface ScrollToTopProps {
	visible: boolean;
	onClick: () => void;
}

export function ScrollToTop({ visible, onClick }: ScrollToTopProps) {
	if (!visible) return null;

	return (
		<button
			onClick={onClick}
			className="fixed bottom-8 right-8 p-3 bg-gray-700 text-white rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 z-50 cursor-pointer border border-gray-600"
			aria-label="Scroll to top">
			<ArrowUp size={24} />
		</button>
	);
}
