import { useState, useEffect } from 'react';

export function useScreenSize() {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkScreenSize = () => {
			setIsMobile(window.innerWidth < 640);
		};

		checkScreenSize();

		window.addEventListener('resize', checkScreenSize);

		return () => window.removeEventListener('resize', checkScreenSize);
	}, []);

	return {
		isMobile,
		itemsPerPage: isMobile ? 10 : 24,
	};
}
