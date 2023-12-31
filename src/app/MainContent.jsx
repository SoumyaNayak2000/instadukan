import cartStore from "@/stores/cartStore";
import { Button, Card } from "antd";
import Meta from "antd/es/card/Meta";

import React, { useState } from "react";
import { toast } from "react-toastify";

const MainContent = ({ products }) => {
	const addToCart = (product) => {
		cartStore.addToCart(product);
		toast.success(`Product added to cart!`);
	};

	return (
		<div className='flex-col flex-wrap justify-between items-center gap-4 text-center h-screen'>
			<h1 className='text-3xl font-bold text-rose-200 m-10'>Our Products</h1>
			<div className='flex flex-col flex-wrap justify-between items-center gap-4  md:flex-row text-center'>
				{products &&
					products.map((product) => (
						<div className='max-w-[90vw] flex' key={product.id} title={product.name}>
							<Card
								hoverable
								style={{
									width: 310,
								}}
								cover={
									// eslint-disable-next-line @next/next/no-img-element
									<img
										src={`${product.image}`}
										alt={product.name}
										width={300}
										height={300}
									/>
								}
							>
								<Meta className='' title={product.name} />
								<p>Price: ₹{product.price}</p>
								<Button
									onClick={() => addToCart(product)}
									className='border border-blue-500 my-2 hover:bg-blue-100'
								>
									Add to Cart
								</Button>
								<p>{product.description}</p>
							</Card>
						</div>
					))}
			</div>
		</div>
	);
};

export default MainContent;
