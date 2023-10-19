"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
// import { useObserver } from "mobx-react-lite";
import Header from "@/components/Header";

import CartStore from "../../stores/cartStore";

const BookedData = () => {
  const [items, setItems] = useState(CartStore.bookedItems);

  useEffect(() => {
    setItems(CartStore.bookedItems);
    // console.log(items.passengerNames)
  }, []);
  console.log(items)

  return (
    <>
      <Header />
      <div className="min-h-screen w-full">
        {
          items.length > 0 ? <h1 className="text-center py-5 font-bold text-2xl">Booked Products</h1> : <p className="text-slate-700 font-extrabold text-center py-4 text-3xl">Seems Not yet Booked <Link className="text-slate-400" href="/cart">Click Here</Link></p>
        }
        <div className="flex justify-center gap-4 flex-wrap">

          {items &&
            items.map((item, i) => {
              return (
                <>
                  <div className="max-w-sm bg-white text-center text-slate-700 rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl">
                        Name : {item.passengerNames}
                      </div>
                    </div>
                    <div className="px-6 pb-2 grid pr-[5px]">
                      <span className="inline-block text-slate-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        Email : {item.email}
                      </span>
                      <span className="inline-block text-slate-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        Date : {item.date}
                      </span>
                      <span className="inline-block text-slate-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        No Of Passenger : {item.noOfPassenger}
                      </span>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default BookedData;
