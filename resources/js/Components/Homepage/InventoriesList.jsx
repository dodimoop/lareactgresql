import React, { useEffect, useState } from 'react'

const InventoriesList = ({data}) => {
  return (
    <>
      {!data?.length ? (
        <>No items available!</>
      ) : (
        <>
          {data?.map((item, i) => (
            <div key={`${item?.username}${item?.email}${i}`} className="card w-full lg:w-96 bg-base-100 shadow-xl">
              {/* <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure> */}
              <div className="card-body">
                <h2 className="card-title text-bold">{item?.name}</h2>
                <p>{item?.description}</p>
                <div className="flex gap-2">
                  <div className="badge badge-info">Stock: {item?.qty}</div>
                  <div className="badge badge-secondary">Price: {item?.price}</div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  )
}

export default InventoriesList;