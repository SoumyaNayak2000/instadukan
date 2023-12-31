import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Assignment instaDukan",
	description: "An website for ferry service",
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				{children}
				<ToastContainer position='top-left' autoClose={1200} theme='dark' />
			</body>
		</html>
	);
}
