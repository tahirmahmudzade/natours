import { catchAsync } from './catchAsync.js';
import AppError from './appError.js';
import APIFeatures from './apiFeatures.js';

export const getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.id) filter = { tour: req.params.id };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .selectFields()
      .paginate();

    const doc = await features.query;

    res.status(200).json({
      status: 'Success',
      results: doc.length,
      data: doc,
    });
  });

export const getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) query.populate(populateOptions);
    const doc = await query;

    if (!doc) return next(new AppError('This document does not exist', 404));

    res.status(200).json({
      status: 'Success',
      data: doc,
    });
  });

export const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return next(new AppError('This document does not exist', 404));

    res.status(200).json({
      status: 'Deleted',
      message: 'Data deleted',
    });
  });

export const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });

    if (!doc) return next(new AppError('This document does not exist', 404));

    res.status(200).json({
      status: 'Updated',
      data: doc,
    });
  });

export const createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'Created',
      data: doc,
    });
  });
