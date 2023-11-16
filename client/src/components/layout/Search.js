import { useState } from "react";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  const keypressHandler = (e) => {
    if (e.keyCode === 13) {
      searchHandler();
    }
  };
  return (
    <form onSubmit={searchHandler} className="d-flex mx-auto search_form">
      <div className="input-group">
        <input
          className="form-control search_bar"
          type="text"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => setKeyword(e.target.value)}
          onKeyPress={keypressHandler}
        />

        <button className="search_btn btn btn-light " type="submit">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </form>
  );
};

export default Search;
