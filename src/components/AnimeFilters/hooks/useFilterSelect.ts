import { useEffect, useRef, useState } from 'react';

interface UseFilterSelectReturn {
	isSelectOpen: boolean;
	dropdownPosition: 'top' | 'bottom';
	selectRef: React.RefObject<HTMLDivElement>;
	buttonRef: React.RefObject<HTMLButtonElement>;
	toggleSelect: () => void;
	closeSelect: () => void;
}

export function useFilterSelect(): UseFilterSelectReturn {
	const [isSelectOpen, setIsSelectOpen] = useState(false);
	const [dropdownPosition, setDropdownPosition] = useState<'top' | 'bottom'>(
		'bottom'
	);
	const selectRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				selectRef.current &&
				!selectRef.current.contains(event.target as Node)
			) {
				setIsSelectOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	useEffect(() => {
		if (isSelectOpen && buttonRef.current) {
			const buttonRect = buttonRef.current.getBoundingClientRect();
			const windowHeight = window.innerHeight;
			const spaceBelow = windowHeight - buttonRect.bottom;
			const spaceAbove = buttonRect.top;
			const dropdownHeight = 300;

			setDropdownPosition(
				spaceBelow >= dropdownHeight || spaceBelow > spaceAbove
					? 'bottom'
					: 'top'
			);
		}
	}, [isSelectOpen]);

	const toggleSelect = () => setIsSelectOpen(!isSelectOpen);
	const closeSelect = () => setIsSelectOpen(false);

	return {
		isSelectOpen,
		dropdownPosition,
		selectRef: selectRef as React.RefObject<HTMLDivElement>,
		buttonRef: buttonRef as React.RefObject<HTMLButtonElement>,
		toggleSelect,
		closeSelect,
	};
}
