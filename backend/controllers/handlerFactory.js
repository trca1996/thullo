const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const APIFeatures = require("./../utils/apiFeatures");

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });

exports.updateOne = (Model, filter = []) =>
  catchAsync(async (req, res, next) => {
    let newObj = {};

    if (filter.length) {
      Object.keys(req.body).forEach((key) => {
        if (filter.includes(key)) {
          newObj[key] = req.body[key];
        }
      });
    } else {
      newObj = req.body;
    }

    const doc = await Model.findByIdAndUpdate(req.params.id, newObj, {
      new: true, // new updated document will be returned
      runValidators: true, // again look schema for validation
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    let returnFields = {};

    for (const key in newObj) {
      returnFields[key] = doc[key];
    }

    res.status(200).json({
      status: "success",
      data: returnFields,
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: newDoc,
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);

    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

exports.getAll = (Model, filterObj = {}, searchKey) =>
  catchAsync(async (req, res, next) => {
    // EXECUTE QUERY
    const features = new APIFeatures(Model.find(filterObj), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
      .search(searchKey);

    const doc = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: doc.length,
      data: doc,
    });
  });
