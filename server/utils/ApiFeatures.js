class ApiFeatures {
  constructor(model, requestQueryStr, requestParams) {
    this.model = model;

    this.requestParams = requestParams;

    this.requestQueryStr = requestQueryStr;
  }

  search() {
    const keyword = this.requestQueryStr.keyword
      ? {
          name: {
            $regex: this.requestQueryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.dbQuery = this.model.find({ ...keyword });
    return this;
  }

  filter() {
    const queryStrCopy = { ...this.requestQueryStr };

    const fieldsToRemove = ["keyword", "page", "limit"];
    fieldsToRemove.forEach((field) => delete queryStrCopy[field]);

    let qry = JSON.stringify(queryStrCopy);
    qry = qry.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    if (this.requestParams.category) {
      let filters = JSON.parse(qry);
      filters.category = this.requestParams.category;

      this.dbQquery = this.dbQuery.find(filters);
    }
    this.dbQquery = this.dbQuery.find(JSON.parse(qry));
    return this;
  }

  pagination(resPerPage) {
    const currentPage = Number(this.requestQueryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    this.dbQuery = this.dbQuery.limit(resPerPage).skip(skip);
    return this;
  }

  sortByDate() {
    this.dbQuery = this.dbQquery.sort({ createdAt: -1 });
    return this;
  }
}

module.exports = ApiFeatures;
