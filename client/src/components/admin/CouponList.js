import { useEffect } from "react";

import { MDBDataTable } from "mdbreact";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCoupons,
  deleteCoupon,
  clearErrors,
} from "../../actions/couponActions";
import { DELETE_COUPON_RESET } from "../../constants/couponConstants";

const CouponList = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, coupons } = useSelector((state) => state.allCoupons);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.coupon
  );

  useEffect(() => {
    dispatch(getAllCoupons());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Coupon deleted successfully");
      history.push("/admin/coupons");
      dispatch({ type: DELETE_COUPON_RESET });
    }
  }, [dispatch, alert, error, deleteError, isDeleted, history]);

  const deleteCouponHandler = (id) => {
    dispatch(deleteCoupon(id));
  };

  const setCoupons = () => {
    const data = {
      columns: [
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Expiry",
          field: "expiry",
          sort: "asc",
        },
        {
          label: "Discount",
          field: "discount",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    coupons.forEach((coupon) => {
      data.rows.push({
        name: coupon.name,
        expiry: coupon.expiry,
        discount: coupon.disount,

        actions: (
          <>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteCouponHandler(coupon._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });

    return data;
  };

  return (
    <>
      <MetaData title={"All Coupons"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <>
            <h1 className="my-5">All Coupons</h1>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setCoupons()}
                className="px-3"
                striped
                hover
              />
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default CouponList;
