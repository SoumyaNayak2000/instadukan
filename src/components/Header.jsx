"use client";

import { Badge } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CartStore from "../stores/cartStore";

const Header = () => {
  const [itemsLength, setItemsLength] = useState(CartStore.length);

  useEffect(() => {
    setItemsLength(CartStore.length);
  }, [itemsLength]);

  return (
    <div className="header w-full flex gap-4 justify-between items-center text-xl shadow-xl bg-slate-400 h-12 rounded-md ">
      <div className="logo mx-6 flex mt-1">
        <Link href="/" className="hover:text-yellow-200 duration-100 ">
          <h1 className="text-xl font-bold text-slate-700">Insta -Dukan</h1>
        </Link>
      </div>
      <div className="mx-6 flex gap-5">
        <Link href="/" className="text-xl text-stone-900 hover:font-bold text-slate-950 duration-100">
          <span className="">Home</span>
        </Link>

        <Link href="/cart" className="text-xl text-stone-900 hover:font-bold text-slate-950 duration-100">
          <span className="mr-1">Cart</span>
          {itemsLength > 0 && (
            <Badge count={itemsLength} style={{ backgroundColor: "#52c41a" }} />
          )}
        </Link>
        {/* {CartStore.bookedItemsLength > 0 && */}
        <Link href="/booked" className="text-xl text-stone-900 hover:font-bold text-slate-950 duration-100">
          <span>Bookings</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
