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
	const [age, setAge] = useState("");
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
			age,
		};
		CartStore.addToBooked(product);
		CartStore.clearCart();
		router.push("/");
	};

	const handleChange = (value) => {
		setNoOfPassenger(Number(value));
	};
	const dateChange = (date, dateString) => {
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
					<h1 className='text-2xl m-8 w-full'>Cart</h1>
				</div>
			)}
			<div className='cart w-auto flex flex-wrap items-center justify-center gap-10'>
				{CartStore.items.length < 1 ? (
					<div className='flex m-12 flex-col gap-20 justify-center items-center'>
						<h1 className='flex items-center justify-center text-rose-700 font-extrabold text-center py-4 text-3xl'>
							Cart is Empty.
						</h1>
						<Link text-slate-400 href={"/"}>
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
							className='w-[50%] block mx-auto text-slate-800 mb-[30vh]'
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
							backgroundColor: "blue",
						},
					}}
				>
					<Form name='passenger_info' onFinish={onFinish}>
						<Form.Item name='noOfPassenger' label='Number of Passengers'>
							<Select
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
								]}
								value={noOfPassenger}
								onChange={handleChange}
							/>
						</Form.Item>

						<Form.Item name='date' label='Date   &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;'>
							<DatePicker onChange={dateChange} className='w-full' />
						</Form.Item>

						<Form.Item name='email' label='Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'>
							<Input
								type='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Form.Item>
						<Form.Item name='age' label='Age &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'>
							<Input
								type='number'
								value={age}
								onChange={(e) => setAge(e.target.value)}
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
