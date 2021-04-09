import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { UserContext } from "../../App";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";
import ProcessPayment from "../ProcessPayment/ProcessPayment";
import "./Shipment.css";

const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [loggedInUser] = useContext(UserContext);

  const [shippingData, setShippingData] = useState(null);
  const onSubmit = (data) => setShippingData(data);

  const handlePaymentSuccess = (paymentId) => {
    const savedCart = getDatabaseCart();
    const orderDetails = {
      ...loggedInUser,
      products: savedCart,
      shipment: shippingData,
      paymentId,
      orderTime: new Date(),
    };

    console.log(orderDetails);
    fetch("https://afternoon-shore-48416.herokuapp.com/addOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDetails),
    })
      .then((res) => res.text())
      .then((data) => {
        if (data) {
          processOrder();
          swal("Congratulations!", "Your order placed successfully", "success");
        }
      });
  };

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div className="row">
      <div
        style={{ display: shippingData ? "none" : "block" }}
        className="col-md-6"
      >
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
          <input
            name="name"
            defaultValue={loggedInUser.name}
            ref={register({ required: true })}
            placeholder="Your Name"
          />
          {errors.name && <span className="error">Name is required</span>}

          <input
            name="email"
            defaultValue={loggedInUser.email}
            ref={register({ required: true })}
            placeholder="Your Email"
          />
          {errors.email && <span className="error">Email is required</span>}

          <input
            name="address"
            ref={register({ required: true })}
            placeholder="Your Address"
          />
          {errors.address && <span className="error">Address is required</span>}

          <input
            name="phone"
            ref={register({ required: true })}
            placeholder="Your Phone Number"
          />
          {errors.phone && (
            <span className="error">Phone Number is required</span>
          )}

          <input type="submit" />
        </form>
      </div>
      <div
        style={{ display: shippingData ? "block" : "none" }}
        className="col-md-6"
      >
        <h1 style={{ marginLeft: "40px" }}>Please pay for me</h1>
        <ProcessPayment handlePayment={handlePaymentSuccess} />
      </div>
    </div>
  );
};

export default Shipment;
