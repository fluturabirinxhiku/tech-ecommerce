import { Link } from "react-router-dom";

const Breadcrumbs = ({ crumbs }) => {
  // Don't render a single breadcrumb.
  if (crumbs.length <= 1) {
    return null;
  }

  return (
    <div className="mb-4 bg-gray-300">
      {/* Link back to any previous steps of the breadcrumb. */}
      <div className="breadcrumb mt-2">
        {crumbs.map(({ name, path }, key) =>
          key + 1 === crumbs.length ? (
            <span key={key} className="breadcrumb-item active">
              {name}
            </span>
          ) : (
            <Link key={key} className="breadcrumb-item mr-4" to={path}>
              {name}
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default Breadcrumbs;
