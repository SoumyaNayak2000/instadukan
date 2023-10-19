"use client";

import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Card, Select, DatePicker, Space } from "antd";
import CartStore from "../../stores/cartStore";
import Header from "@/components/Header";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import CartItem from "@/components/CartItem";
import CustomFormItem from "@/components/CustomFormItem";
import { useObserver } from "mobx-react-lite";

export default function Cart() {
	const [open, setOpen] = useState(false);
	const [noOfPassenger, setNoOfPassenger] = useState(1);
	const [tempArr, setTempArr] = useState([]);
	const [email, setEmail] = useState("");
	const [date, setDate] = useState("");
	const [passengerNames, setPassengerNames] = useState([]);

	const router = useRouter();

	let arr = [];

	useEffect(() => {
		const makeTempArr = () => {
			arr = [];
			for (let i = 0; i < noOfPassenger; i++) {
				arr.push(i);
			}
			setTempArr(arr);
			return arr;
		};
		makeTempArr();
		// console.log(arr);
	}, [noOfPassenger]);

	const showModal = () => {
		setOpen(!open);
	};

	const onFinish = (values) => {
		// Passenger information and checkout

		setOpen(false);
		toast.success(`Successfully Booked`);
		const product = {
			noOfPassenger,
			date,
			email,
			passengerNames,
		};
		CartStore.addToBooked(product);
		// CartStore.clearCart();
		// router.push('/')
	};

	const handleChange = (value) => {
		// console.log(Number(value));
		setNoOfPassenger(Number(value));
	};
	const dateChange = (date, dateString) => {
		// console.log(dateString);
		setDate(dateString);
	};

	return (
		<>
			<div className='header w-full'>
				<Header />
			</div>

			{/* Cart Section */}
			{CartStore.items.length > 0 && (
				<div className='cart block'>
					<h1 className='text-2xl m-8 w-full'>Your Cart</h1>
				</div>
			)}
			<div className='cart w-auto flex flex-wrap items-center justify-center gap-10'>
				{CartStore.items.length < 1 ? (
					<div className='flex m-12 flex-col gap-20 justify-center items-center'>
						<h1 className='text-2xl'>No data - Your cart is Empty !</h1>
						<Link href={"/"}>
							<Button className='text-white mb-[61.5vh]'>Add now</Button>
						</Link>
					</div>
				) : (
					<>
						{CartStore.items.map((item, i) => (
							<div
								key={i}
								className='flex flex-col gap-20 justify-center items-center'
							>
								<CartItem item={item} />
							</div>
						))}
					</>
				)}
				<div className='btn w-full '>
					{CartStore.items.length > 0 && (
						<Button
							onClick={showModal}
							className='w-[50%] block mx-auto text-white mb-[30vh]'
						>
							Checkout
						</Button>
					)}
				</div>
				{/* Passenger Information Modal */}
				<Modal
					title='Passenger Information'
					open={open}
					onOk={onFinish}
					onCancel={showModal}
					okText='Submit'
					okButtonProps={{
						style: {
							color: "white",
							backgroundColor: "blueviolet",
						},
					}}
				>
					<Form name='passenger_info' onFinish={onFinish}>
						<Form.Item name='noOfPassenger' label='Number of Passengers' required>
							<Select
								status='warning'
								showSearch
								initialvalues={1}
								style={{
									width: "100%",
								}}
								placeholder='Number of Passengers'
								optionFilterProp='children'
								filterOption={(input, option) =>
									(option?.label ?? "").includes(input)
								}
								filterSort={(optionA, optionB) =>
									(optionA?.label ?? "")
										.toLowerCase()
										.localeCompare((optionB?.label ?? "").toLowerCase())
								}
								options={[
									{ value: "1", label: "1" },
									{ value: "2", label: "2" },
									{ value: "3", label: "3" },
									{ value: "4", label: "4" },
									{ value: "5", label: "5" },
									{ value: "6", label: "6" },
									{ value: "7", label: "Max (7)" },
								]}
								value={noOfPassenger}
								onChange={handleChange}
							/>
						</Form.Item>

						<Form.Item
							name='date'
							label='Date   &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;'
							required
						>
							<DatePicker status='warning' onChange={dateChange} className='w-full' />
						</Form.Item>

						<Form.Item
							name='email'
							label='Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
							required
						>
							<Input
								type='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								status='warning'
							/>
						</Form.Item>

						{tempArr &&
							tempArr.map((item) => (
								<CustomFormItem
									item={item}
									key={item}
									setPassengerNames={setPassengerNames}
									passengerNames={passengerNames}
									date={date}
								/>
							))}
					</Form>
				</Modal>
			</div>
		</>
	);
}