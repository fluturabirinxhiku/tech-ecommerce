import { Link } from "react-router-dom";

const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
  return (
    <ul className="nav nav-tabs justify-content-center  mb-5">
      <li className="nav-item">
        {shipping ? (
          <Link to="/shipping" className="nav-link">
            Shipping
          </Link>
        ) : (
          <Link to="#" className="nav-link disabled" disabled>
            Shipping
          </Link>
        )}
      </li>

      <li className="nav-item">
        {confirmOrder ? (
          <Link to="/order/confirm" className="nav-link">
            Confirm Order
          </Link>
        ) : (
          <Link to="#" className="nav-link disabled" disabled>
            Confirm Order
          </Link>
        )}
      </li>
      <li className="nav-item">
        {payment ? (
          <Link to="/payment" className="nav-link ">
            Payment Method
          </Link>
        ) : (
          <Link to="#" className="nav-link disabled" disabled>
            Payment Method
          </Link>
        )}
      </li>
    </ul>
  );
};

export default CheckoutSteps;
