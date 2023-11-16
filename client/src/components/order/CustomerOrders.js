import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import MetaData from "../layout/MetaData";
import Message from "../layout/Message";
import Loader from "../layout/Loader";

import generateInvoice from "./InvoiceTemplate";

import { useDispatch, useSelector } from "react-redux";
import { getCustomerOrders } from "../../actions/orderActions";

const CustomerOrders = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector(
    (state) => state.customerOrders
  );

  useEffect(() => {
    dispatch(getCustomerOrders());
  }, [dispatch]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Num of Items",
          field: "numOfItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        status:
          order.orderStatus &&
          String(order.orderStatus).includes("Delivered") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),
        actions: (
          <>
            <Link to={`/orders/${order._id}`} className="btn btn-primary   ">
              <i className="fa fa-eye"></i>
            </Link>
            <div
              onClick={() => generateInvoice(order)}
              className="btn  btn-light ml-2 "
            >
              Download as <i className="fa fa-file-pdf-o text-danger"></i>
            </div>
          </>
        ),
      });
    });

    return data;
  };

  return (
    <>
      <MetaData title={"My Orders"} />
      <div className="container">
        <h1 className="my-5">My Orders</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading ? (
          <Loader />
        ) : (
          <MDBDataTable data={setOrders()} className="px-3" striped hover />
        )}
      </div>
    </>
  );
};

export default CustomerOrders;
