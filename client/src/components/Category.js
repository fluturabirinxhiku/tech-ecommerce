import { useEffect, useState } from "react";
import MetaData from "./layout/MetaData";
import Message from "./layout/Message";
import Loader from "./layout/Loader";
import Pagination from "react-js-pagination";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { useDispatch, useSelector } from "react-redux";
import { getProductsByCategory } from "../actions/productActions";
import Product from "./product/Product";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const Category = ({ match }) => {
  const { loading, error, products, filteredProductsCount, resPerPage } =
    useSelector((state) => state.categoryProducts);
  const dispatch = useDispatch();
  const category = match.params.category;
  const [currentPage, setCurrentPage] = useState(1);

  const [price, setPrice] = useState([1, 3000]);

  useEffect(() => {
    dispatch(getProductsByCategory(currentPage, price, category));
  }, [currentPage, dispatch, price, category]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let count = filteredProductsCount;

  return (
    <>
      <MetaData title={category.name || "Category"} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="container">
            <section id="products" className="container mt-2">
              <div className="row">
                {error && <Message variant="danger">{error}</Message>}

                <>
                  <div className="col-6 col-md-3 mt-5 mb-5">
                    <h4 className="mb-5">Price Range</h4>

                    <div className="pe-5">
                      <Range
                        marks={{
                          1: `$1`,
                          3000: `$3000`,
                        }}
                        min={1}
                        max={3000}
                        defaultValue={[1, 3000]}
                        tipFormatter={(value) => `$${value}`}
                        tipProps={{
                          placement: "top",
                          visible: true,
                        }}
                        value={price}
                        onChange={(price) => setPrice(price)}
                      />
                      <hr className="my-5" />
                    </div>
                  </div>
                  <div className="col-6 col-md-9">
                    <div className="row">
                      <h1 id="latest_products_heading">
                        {" "}
                        {products ? category : ""}
                      </h1>
                      {products &&
                        products.map((product) => (
                          <Product
                            key={product._id}
                            product={product}
                            col={4}
                          />
                        ))}
                    </div>
                  </div>
                </>
              </div>
            </section>

            {resPerPage <= count && (
              <div className="d-flex justify-content-center mt-5">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resPerPage}
                  totalItemsCount={count}
                  onChange={setCurrentPageNo}
                  nextPageText={"Next"}
                  firstPageText={"First"}
                  lastPageText={"Last"}
                  prevPageText={"Prev"}
                  itemClass="page-item"
                  linkClass="page-link"
                />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Category;
