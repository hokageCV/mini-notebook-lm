import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: 'Mini Notebook LM',
	description: 'Chat with your data.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`antialiased`}>{children}</body>
		</html>
	);
}
