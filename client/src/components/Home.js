import { useEffect, useState } from "react";
import MetaData from "./layout/MetaData";
import Message from "./layout/Message";
import Loader from "./layout/Loader";
import Pagination from "react-js-pagination";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Product from "./product/Product";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = ({ match }) => {
  const {
    loading,
    products,
    error,
    productCount,
    filteredProductsCount,
    resPerPage,
  } = useSelector((state) => state.products);

  const keyword = match.params.keyword;

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 3000]);
  const [category, setCategory] = useState("");

  const categories = [
    "Cameras",
    "Laptops & PCs",
    "Accessories",
    "Headphones",
    "TV, Video & Audio",
    "Phones & Tablets",
    "Gaming",
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts(keyword, currentPage, price, category));
  }, [currentPage, keyword, dispatch, price, category]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let count = productCount;

  if (keyword) {
    count = filteredProductsCount;
  }
  return (
    <>
      <MetaData title="Home" />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="container">
            {!keyword && <h1 id="latest_products_heading">Latest Products</h1>}

            <section id="products" className="container mt-2">
              <div className="row">
                {error && <Message variant="danger">{error}</Message>}

                {keyword ? (
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
                        <div className="mt-5">
                          <h4 className="mb-3">Categories</h4>
                          <ul className="pl-0">
                            {categories.map((category) => (
                              <li
                                style={{
                                  cursor: "pointer",
                                  listStyleType: "none",
                                }}
                                key={category}
                                onClick={() => setCategory(category)}
                              >
                                {category}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-6 col-md-9">
                      <div className="row">
                        {keyword && (
                          <h1 className="latest_products_heading">
                            Search Results
                          </h1>
                        )}
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
                ) : (
                  products &&
                  products.map((product) => (
                    <Product key={product._id} product={product} col={3} />
                  ))
                )}
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

export default Home;
