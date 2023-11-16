import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";

const OrderSuccess = ({ history }) => {
  const orderInfo = sessionStorage.getItem("orderInfo");
  if (!orderInfo) {
  }
  return (
    <>
      <MetaData title={"Order Success"} />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-6 mt-5 text-center">
            <i className="fa fa-check-circle fa-3x my-5 img-fluid d-block mx-auto"></i>

            <h2>Your Order has been placed successfully</h2>

            <Link to="/customer/orders">Go to Orders</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;
