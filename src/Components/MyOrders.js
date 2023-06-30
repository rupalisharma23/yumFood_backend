import React from "react";
import Navigation from "./NavBar";
import { useState, useEffect } from "react";
import axios from "axios";

export default function () {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    OrderListApi();
  }, []);

  const OrderListApi = () => {
    return axios
      .post(`http://localhost:5000/api/getOrders`, {
        email: localStorage.getItem("email"),
      })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((error) => {});
  };

  const groupOrdersByDate = (ordersData) => {
    const groupedOrders = ordersData.reduce((result, user) => {
      user.orders.forEach((order) => {
        const date = order.date;
        if (!result[date]) {
          result[date] = [];
        }
        result[date].push({
          name: order.name,
          price: order.price,
          quantity: order.quantity,
        });
      });
      return result;
    }, {});
    return groupedOrders;
  };

  const groupedOrders = groupOrdersByDate(orders);

  return (
    <div>
      <Navigation />
      {Object.keys(groupedOrders).map((date) => {
        return (
          <>
            <h3 style={{ marginLeft: "10px" }}>Date: {date}</h3>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {groupedOrders[date].map((order, index) => (
                <div className="product-card">
                  <div className="image-container-product">
                    <img src="/background.jpg" />
                  </div>
                  <div className="details-container">
                    <h3>{order.name}</h3>
                    <p> quantity :{order.quantity}</p>
                    <p>
                      {" "}
                      total price:Rs {parseInt(order.price) * order.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        );
      })}
    </div>
  );
}
