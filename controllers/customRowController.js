// to set static page from build folder
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

import CustomRow from '../models/CustomRow.js';
import { StatusCodes } from 'http-status-codes';
import {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} from '../errors/index.js';
import checkPermissions from '../utils/checkPermissions.js';
import mongoose from 'mongoose';

const createNewCustomRow = async (req, res) => {
  // res.send('createNewCustomRow');
  const {
    rowTitle,
    hideDisplay,
    apiType,
    channelList: channelListItems,
  } = req.body;

  if (!rowTitle) {
    throw new BadRequestError('Please provide at least row title');
  }

  if (!channelListItems) {
    throw new BadRequestError('Please provide at least empty channelList');
  }

  let tempChannelList = [];
  if (channelListItems.length > 0) {
    console.log('channel list ade and tmbah data...');
  }

  const newCustomRow = await CustomRow.create({
    rowTitle,
    channelList: tempChannelList,
    createdBy: req.user.userId,
  });
  res.status(StatusCodes.CREATED).json({ newCustomRow });
};

const getAllCustomRow = async (req, res) => {
  // res.send('getAllCustomRow');
  const customRows = await CustomRow.find({}).sort('createdAt');
  const addIndexCustomRows = customRows.map((item, index) => {
    const {
      _id,
      rowTitle,
      hideDisplay,
      createdBy,
      channelList,
      createdAt,
      updatedAt,
    } = item;
    return {
      _id,
      rowTitle,
      hideDisplay,
      createdBy,
      channelList,
      createdAt,
      updatedAt,
      index,
    };
  });

  res.status(StatusCodes.OK).json({
    customRows: addIndexCustomRows,
    totalCustomRows: addIndexCustomRows.length,
  });
};

const getSingleCustomRow = async (req, res) => {
  // res.send('getSingleCustomRow');
  const { id: rowId } = req.params;
  const customRow = await CustomRow.findOne({ _id: rowId });

  if (!customRow) {
    throw new NotFoundError(`No custom row with id : ${rowId} found`);
  }

  res.status(StatusCodes.OK).json({ customRow });
};

const addNewChannel = async (req, res) => {
  // res.send('addNewChannel');

  const {
    productID,
    channelID,
    channelID_6001,
    channelID_6002,
    channelID_6003,
    channelID_8601,
    title,
    posterURL,
    posterURL_ATV,
  } = req.body;
  const { id: rowId } = req.params;
  const customRow = await CustomRow.findOne({ _id: rowId });

  if (!customRow) {
    throw new NotFoundError(`No custom row with id : ${rowId} found`);
  }

  const singleChannel = {
    productID,
    channelID,
    channelID_6001,
    channelID_6002,
    channelID_6003,
    channelID_8601,
    title,
    posterURL,
    posterURL_ATV,
  };

  const aaa = customRow.channelList.length;
  let bbb = customRow.channelList;
  bbb = [...bbb, singleChannel];
  customRow.channelList = bbb;
  const xxx = await customRow.save();

  res.status(StatusCodes.OK).json({ customRow });
};

const deletePoster = async (req, res) => {
  // res.send('delete poster');
  const { rowId, posterId } = req.params;
  // console.log(`rowId: ${rowId} | posterId: ${posterId}`);
  const customRow = await CustomRow.findOne({ _id: rowId });
  if (!customRow) {
    throw new NotFoundError(`No custom row with id : ${rowId} found`);
  }

  if (customRow.channelList.length === 0) {
    throw new NotFoundError(`No poster found`);
  }

  const channels = customRow.channelList;
  const channel = channels.find((item) => item._id.toString() === posterId);
  if (!channel) {
    throw new NotFoundError(`No poster with id : ${posterId} found`);
  }
  // console.log(channel);

  //proceed delete single channel
  const deleteResult = await CustomRow.findOneAndUpdate(
    {
      _id: mongoose.Types.ObjectId(rowId),
    },
    {
      $pull: {
        channelList: {
          _id: posterId,
        },
      },
    },
    {
      new: true,
    }
  );
  if (!deleteResult) {
    throw new NotFoundError(
      `There is some issue when deleting the channel. Please try again later`
    );
  }

  res.status(StatusCodes.OK).json({ deleteResult });
};

const createPoster = async (req, res) => {
  // res.send('createPoster');
  const { rowId } = req.params;
  const { title, channelId, productId } = req.body;

  if (!title || !channelId || !productId) {
    throw new BadRequestError(
      'Please provide at least title, channelId, and productId'
    );
  }

  const customRow = await CustomRow.findOne({ _id: rowId });
  if (!customRow) {
    throw new NotFoundError(`No custom row with id : ${rowId} found`);
  }

  if (!req.files.ottPosterImage) {
    throw new BadRequestError('No OTT poster image selected');
  }
  if (!req.files.atvPosterImage) {
    throw new BadRequestError('No ATV poster image selected');
  }

  const ottPosterImage = req.files.ottPosterImage;
  const atvPosterImage = req.files.atvPosterImage;
  // console.log(ottPosterImage);
  // console.log(atvPosterImage);
  const ottPathExt = path.extname(ottPosterImage.name);
  // console.log(ottPathExt);
  const atvPathExt = path.extname(atvPosterImage.name);
  // console.log(atvPathExt);
  //check format
  if (
    !(
      ottPosterImage.mimetype.startsWith('image/jpeg') ||
      ottPosterImage.mimetype.startsWith('image/png')
    )
  ) {
    throw new BadRequestError(
      'Please upload image(.png, .jpeg, & .jpg only) file only for OTT Poster'
    );
  }

  if (
    !(
      atvPosterImage.mimetype.startsWith('image/jpeg') ||
      atvPosterImage.mimetype.startsWith('image/png')
    )
  ) {
    throw new BadRequestError(
      'Please upload image(.png, .jpeg, & .jpg only) file only for ATV Poster'
    );
  }

  //check size
  const maxSize = 5000000; //5mb
  if (ottPosterImage.size > maxSize) {
    throw new BadRequestError(
      'Please upload OTT Poster image smaller than 5MB'
    );
  }
  if (atvPosterImage.size > maxSize) {
    throw new BadRequestError(
      'Please upload ATV Poster image smaller than 5MB'
    );
  }

  //proceed uploading
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const nowDateTimeStr = new Date().getTime().toString();

  const ottPosterFilename = `${rowId}_ott_${nowDateTimeStr}${ottPathExt}`;
  const ottPosterImagePath = path.join(
    __dirname,
    '../public/uploads/' + `${ottPosterFilename}`
  );
  await ottPosterImage.mv(ottPosterImagePath);

  const atvPosterFilename = `${rowId}_atv_${nowDateTimeStr}${atvPathExt}`;
  const atvPosterImagePath = path.join(
    __dirname,
    '../public/uploads/' + `${atvPosterFilename}`
  );
  await atvPosterImage.mv(atvPosterImagePath);

  //proceed with database creation
  const newChannelObj = {
    title,
    productID: productId,
    channelID: channelId,
    channelID_6001: channelId,
    channelID_6002: channelId,
    channelID_6003: channelId,
    channelID_8601: channelId,
    posterURL: `/uploads/${ottPosterFilename}`,
    posterURL_ATV: `/uploads/${atvPosterFilename}`,
  };
  let channelList = customRow.channelList;
  channelList = [...channelList, newChannelObj];
  customRow.channelList = channelList;
  const success = await customRow.save();

  res.status(StatusCodes.OK).json({ success });
};

export {
  createNewCustomRow,
  getAllCustomRow,
  addNewChannel,
  getSingleCustomRow,
  deletePoster,
  createPoster,
};
