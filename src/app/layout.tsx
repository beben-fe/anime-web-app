import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { PageProvider } from '@/context/PageContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Anime Explorer',
	description: 'Explore and discover anime',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<PageProvider>
					<Providers>{children}</Providers>
				</PageProvider>
			</body>
		</html>
	);
}
