"use client";
import React, { useEffect, useState } from "react";
import { useObserver } from "mobx-react-lite";
import 'react-toastify/dist/ReactToastify.css';
import Header from "../components/Header";
import Loader from "@/components/Loader";
import MainContent from "./MainContent";

export default function Home() {
	const [isLoading, setIsLoading] = useState(false);
	const [products, setProducts] = useState([]);
	useEffect(() => {
		async function fetchProducts() {
			setIsLoading(true);
			try {


				// const res = await fetch("https://soumyanayak2000.github.io/ferry-products/products.json");
				 const res = await fetch("https://ferry-api.onrender.com/products");
				// const res = await fetch("https://raw.githubusercontent.com/SoumyaNayak2000/ferry-products/master/products.json");
				const data = await res.json();
				setProducts(data);
				console.log(data);
				setIsLoading(false);
			} catch (error) {
				setIsLoading(false);
				console.error(error);
			}
		}
		fetchProducts();
	}, []);

	if (isLoading) {
		return (
			<>
				<Header />
				<Loader />
			</>
		);
	}

	return (
		<>
			<Header />
			<MainContent products={products} />
		</>
	);
}
