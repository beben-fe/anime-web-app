'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface PageContextType {
	currentPage: number;
	setCurrentPage: (page: number) => void;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

export function PageProvider({ children }: { children: ReactNode }) {
	const [currentPage, setCurrentPage] = useState(1);

	return (
		<PageContext.Provider value={{ currentPage, setCurrentPage }}>
			{children}
		</PageContext.Provider>
	);
}

export function usePage() {
	const context = useContext(PageContext);
	if (context === undefined) {
		throw new Error('usePage must be used within a PageProvider');
	}
	return context;
}
