import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`Your Profile`} />
          <div className="container">
            <h2 className="mt-5 ml-5">My Profile</h2>
            <div className="row">
              <div className="col-md-4">
                <Link
                  to="/profile/update"
                  id="edit_profile"
                  className="btn btn-info w-75 mt-5"
                >
                  Edit Profile
                </Link>
              </div>
              <div className="col-md-4">
                <Link
                  to="/password/update"
                  className="btn btn-primary w-75 mt-5"
                >
                  Change Password
                </Link>
              </div>
              <div className="col-md-4">
                {user.role !== "Admin" && (
                  <Link
                    to="/customer/orders"
                    className="btn btn-danger w-75 mt-5"
                  >
                    My Orders
                  </Link>
                )}
              </div>
            </div>
            <div className="row mx-5 mt-3   user-info">
              <div className="col-12 col-md-5">
                <h4>Full Name</h4>
                <p>{user.name}</p>

                <h4>Email Address</h4>
                <p>{user.email}</p>

                <h4>Joined On</h4>
                <p>{String(user.createdAt).substring(0, 10)}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
