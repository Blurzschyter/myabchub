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
import sql from 'mssql';
import config from '../db/sqlconfig.js';

const createNewCustomRow = async (req, res) => {
  // res.send('createNewCustomRow');
  if (process.env.DATABASE_MODE === 'MONGODB') {
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

    const docCount = await CustomRow.countDocuments({}).exec();
    console.log(`docCount : ${docCount}`);

    const newCustomRow = await CustomRow.create({
      rowTitle,
      indexLocation: `${docCount}`,
      apiType: `nm${docCount}`,
      channelList: tempChannelList,
      createdBy: req.user.userId,
    });
    res.status(StatusCodes.CREATED).json({ newCustomRow });
  } else {
    const { rowTitle, hideDisplay, apiType } = req.body;

    if (!rowTitle) {
      throw new BadRequestError('Please provide at least row title');
    }

    let pool = await sql.connect(config);
    let customrows = await pool
      .request()
      .query('SELECT * from myhub_customrows');
    // console.log('total row :' + customrows.recordsets[0].length);
    const docCount = customrows.recordsets[0].length;

    //create customrow
    let user = await pool
      .request()
      .input('input_rowTitle', sql.VarChar, rowTitle)
      .input('input_hideDisplay', sql.Bit, 1)
      .input('input_apiType', sql.VarChar, `nm${docCount}`)
      .input('input_indexLocation', sql.Int, docCount)
      .input('input_createdBy', sql.Int, req.user.userId)
      .query(
        `INSERT INTO myhub_customrows (rowTitle, hideDisplay, apiType, indexLocation, createdBy) VALUES (@input_rowTitle, @input_hideDisplay, @input_apiType, @input_indexLocation, @input_createdBy)`
      );

    //get the new created custom row
    let createdCustomRow = await pool
      .request()
      .input('input_rowTitle', sql.VarChar, rowTitle)
      .input('input_createdBy', sql.Int, req.user.userId)
      .query(
        'SELECT * from myhub_customrows where (rowTitle = @input_rowTitle and createdBy = @input_createdBy)'
      );
    console.log(createdCustomRow.recordsets[0]);

    res
      .status(StatusCodes.CREATED)
      .json({ newCustomRow: createdCustomRow.recordsets[0][0] });
  }
};

const getAllCustomRow = async (req, res) => {
  // res.send('getAllCustomRow');
  if (process.env.DATABASE_MODE === 'MONGODB') {
    const customRows = await CustomRow.find({}).sort('indexLocation');
    const addIndexCustomRows = customRows.map((item) => {
      const {
        _id,
        rowTitle,
        hideDisplay,
        createdBy,
        channelList,
        createdAt,
        updatedAt,
        apiType,
        indexLocation,
      } = item;
      return {
        _id,
        rowTitle,
        hideDisplay,
        createdBy,
        channelList,
        createdAt,
        updatedAt,
        indexLocation,
        apiType,
      };
    });

    res.status(StatusCodes.OK).json({
      customRows: addIndexCustomRows,
      totalCustomRows: addIndexCustomRows.length,
    });
  } else {
    let pool = await sql.connect(config);
    let customrows = await pool
      .request()
      .query(
        'SELECT myhub_customrows.customrow_id, myhub_customrows.rowTitle, myhub_customrows.hideDisplay, myhub_customrows.indexLocation, myhub_customrows.apiType, myhub_customrows.createdAt, myhub_customrows.updatedAt, myhub_posters.poster_id, myhub_posters.title, myhub_posters.posterURL, myhub_posters.posterURL_ATV, myhub_posters.productID, myhub_posters.channelID, myhub_posters.channelID_6001, myhub_posters.channelID_6002, myhub_posters.channelID_6003, myhub_posters.channelID_8601 FROM myhub_customrows LEFT JOIN myhub_posters ON myhub_customrows.customrow_id = myhub_posters.customrow_id'
      );

    const remapping = customrows.recordsets[0].reduce(
      (
        r,
        {
          customrow_id: _id,
          rowTitle,
          hideDisplay,
          indexLocation,
          apiType,
          createdAt,
          updatedAt,
          ...object
        }
      ) => {
        var temp = r.find((o) => o._id === _id);
        if (!temp) {
          r.push(
            (temp = {
              _id,
              rowTitle,
              hideDisplay,
              indexLocation,
              apiType,
              createdAt,
              updatedAt,
              channelList: [],
            })
          );
        }
        if (object.poster_id !== null) {
          temp.channelList.push(object);
        }
        return r;
      },
      []
    );

    //sorting by indexLocatiton
    const sortRemapping = remapping.sort(function (a, b) {
      return a.indexLocation - b.indexLocation;
    }); // Sort youngest first

    res
      .status(StatusCodes.OK)
      .json({ customRows: sortRemapping, totalCustomRows: remapping.length });
  }
};

const getSingleCustomRow = async (req, res) => {
  // res.send('getSingleCustomRow');
  if (process.env.DATABASE_MODE === 'MONGODB') {
    const { id: rowId } = req.params;
    const customRow = await CustomRow.findOne({ _id: rowId });

    if (!customRow) {
      throw new NotFoundError(`No custom row with id : ${rowId} found`);
    }

    res.status(StatusCodes.OK).json({ customRow });
  } else {
    const { id: rowId } = req.params;

    let pool = await sql.connect(config);
    let checkRow = await pool
      .request()
      .input('input_rowId', sql.Int, parseInt(rowId))
      .query(
        'SELECT * from myhub_customrows where customrow_id = @input_rowId'
      );
    if (checkRow.recordsets[0].length === 0) {
      throw new NotFoundError(`No custom row with id : ${rowId} found`);
    }

    let customrows = await pool
      .request()
      .input('input_rowId', sql.Int, parseInt(rowId))
      .query(
        'SELECT myhub_customrows.customrow_id, myhub_customrows.rowTitle, myhub_customrows.hideDisplay, myhub_customrows.indexLocation, myhub_customrows.apiType, myhub_customrows.createdAt, myhub_customrows.updatedAt, myhub_posters.poster_id, myhub_posters.title, myhub_posters.posterURL, myhub_posters.posterURL_ATV, myhub_posters.productID, myhub_posters.channelID, myhub_posters.channelID_6001, myhub_posters.channelID_6002, myhub_posters.channelID_6003, myhub_posters.channelID_8601 FROM myhub_customrows LEFT JOIN myhub_posters ON myhub_customrows.customrow_id = myhub_posters.customrow_id WHERE myhub_customrows.customrow_id = @input_rowId'
      );

    const customRow = customrows.recordsets[0].reduce(
      (
        r,
        {
          customrow_id: _id,
          rowTitle,
          hideDisplay,
          indexLocation,
          apiType,
          createdAt,
          updatedAt,
          ...object
        }
      ) => {
        var temp = r.find((o) => o._id === _id);
        if (!temp) {
          r.push(
            (temp = {
              _id,
              rowTitle,
              hideDisplay,
              indexLocation,
              apiType,
              createdAt,
              updatedAt,
              channelList: [],
            })
          );
        }
        if (object.poster_id !== null) {
          const tempObj = {
            title: object.title,
            posterURL: object.posterURL,
            posterURL_ATV: object.posterURL_ATV,
            productID: object.productID,
            channelID: object.channelID,
            channelID_6001: object.channelID_6001,
            channelID_6002: object.channelID_6002,
            channelID_6003: object.channelID_6003,
            channelID_8601: object.channelID_8601,
            _id: object.poster_id,
          };
          temp.channelList.push(tempObj);
        }
        return r;
      },
      []
    );

    res.status(StatusCodes.OK).json({ customRow: customRow[0] });
  }
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
  if (process.env.DATABASE_MODE === 'MONGODB') {
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
  } else {
    const { rowId, posterId } = req.params;

    let pool = await sql.connect(config);
    let checkPoster = await pool
      .request()
      .input('input_rowId', sql.Int, parseInt(rowId))
      .input('input_posterId', sql.Int, parseInt(posterId))
      .query(
        'SELECT * from myhub_posters WHERE customrow_id = @input_rowId AND poster_id = @input_posterId'
      );
    if (checkPoster.recordsets[0].length === 0) {
      throw new NotFoundError(
        `No custom row with id : ${rowId} & poster id: ${posterId} found`
      );
    }

    //proceed delete the item
    let userDelete = await pool
      .request()
      .input('input_rowId', sql.Int, parseInt(rowId))
      .input('input_posterId', sql.Int, parseInt(posterId))
      .query(
        'DELETE myhub_posters WHERE customrow_id = @input_rowId AND poster_id = @input_posterId'
      );

    res.status(StatusCodes.OK).json({ msg: 'Poster successfully deleted.' });
  }
};

const createPoster = async (req, res) => {
  // res.send('createPoster');
  if (process.env.DATABASE_MODE === 'MONGODB') {
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
  } else {
    const { rowId } = req.params;
    const { title, channelId, productId } = req.body;

    if (!title || !channelId || !productId) {
      throw new BadRequestError(
        'Please provide at least title, channelId, and productId'
      );
    }

    let pool = await sql.connect(config);
    let customRow = await pool
      .request()
      .input('input_rowId', sql.Int, parseInt(rowId))
      .query(
        'SELECT * from myhub_customrows where customrow_id = @input_rowId'
      );
    if (customRow.recordsets[0].length === 0) {
      throw new NotFoundError(`No custom row with id : ${rowId} found`);
    }
    // else {
    //   throw new NotFoundError(`user reg id : ${req.user.userId}`);
    // }

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
    const atvPathExt = path.extname(atvPosterImage.name);

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

    //create new poster
    let newPoster = await pool
      .request()
      .input('input_title', sql.VarChar, title)
      .input('input_productId', sql.VarChar, productId)
      .input('input_channelId', sql.VarChar, channelId)
      .input('input_posterURL', sql.VarChar, `/uploads/${ottPosterFilename}`)
      .input(
        'input_posterURL_ATV',
        sql.VarChar,
        `/uploads/${atvPosterFilename}`
      )
      .input('input_createdBy', sql.Int, req.user.userId)
      .input('input_customrowid', sql.Int, rowId)
      .query(
        `INSERT INTO myhub_posters (title, productID, channelID, channelID_6001, channelID_6002, channelID_6003, channelID_8601, posterURL, posterURL_ATV, createdBy, customrow_id) VALUES (@input_title, @input_productId, @input_channelId, @input_channelId, @input_channelId, @input_channelId, @input_channelId, @input_posterURL, @input_posterURL_ATV, @input_createdBy, @input_customrowid)`
      );

    //query all poster under the same customrow
    let allPoster = await pool
      .request()
      .input('input_rowId', sql.Int, parseInt(rowId))
      .query('SELECT * from myhub_posters where customrow_id = @input_rowId');
    const allPosterObj = allPoster.recordsets[0];

    let success = customRow.recordsets[0][0];
    success['channelList'] = allPosterObj;
    res.status(StatusCodes.CREATED).json({ success });
  }
};

const deleteCustomRow = async (req, res) => {
  if (process.env.DATABASE_MODE === 'MONGODB') {
    const { rowId } = req.params;
    // res.send(`deleteCustomRow: ${rowId}`);
    const selectedCustomRow = await CustomRow.findOne({ _id: rowId });
    if (!selectedCustomRow) {
      throw new NotFoundError(`No custom row with id : ${rowId} found`);
    }

    const customRows = await CustomRow.find({}).sort('indexLocation');
    const customRowsRemovedX = customRows.filter(
      (item) => item._id.toString() !== rowId
    );
    // console.log(customRowsRemovedX);
    for (const [index, row] of customRowsRemovedX.entries()) {
      // console.log(
      //   `rowName : ${row.rowTitle} | indexDB: ${row.index} | indexLoop: ${index}`
      // );
      const singleRow = await CustomRow.findOne({ _id: row._id });
      singleRow.indexLocation = index;
      await singleRow.save();
    }

    const status = await selectedCustomRow.remove();
    res
      .status(StatusCodes.OK)
      .json({ msg: 'Specific row successfully deleted' });
  } else {
    const { rowId } = req.params;

    let pool = await sql.connect(config);
    let customRow = await pool
      .request()
      .input('input_rowId', sql.Int, parseInt(rowId))
      .query(
        'SELECT * from myhub_customrows where customrow_id = @input_rowId'
      );

    // console.log('nizar check jap...');
    // console.log(customRow.recordsets[0]);
    if (customRow.recordsets[0].length === 0) {
      throw new NotFoundError(`No custom row with id : ${rowId} found`);
    }

    let customRowAll = await pool
      .request()
      .query('SELECT * FROM myhub_customrows ORDER BY indexLocation ASC');
    const customRowAllObj = customRowAll.recordsets[0];

    const customRowsRemovedX = customRowAllObj.filter(
      (item) => item.customrow_id !== parseInt(rowId)
    );
    // console.log(customRowsRemovedX);
    for (const [index, row] of customRowsRemovedX.entries()) {
      // console.log(
      //   `rowName : ${row.rowTitle} | indexDB: ${row.indexLocation} | indexLoop: ${index}`
      // );

      let userUpdate = await pool
        .request()
        .input('input_rowId', sql.Int, row.customrow_id)
        .input('input_indexLocation', sql.Int, index)
        .query(
          'UPDATE myhub_customrows SET indexLocation = @input_indexLocation WHERE customrow_id = @input_rowId'
        );
      // console.log('customrow_id: ' + row.customrow_id);
    }

    //proceed delete the item
    let userDelete = await pool
      .request()
      .input('input_rowId', sql.Int, parseInt(rowId))
      .query('DELETE myhub_customrows WHERE customrow_id = @input_rowId');

    res
      .status(StatusCodes.OK)
      .json({ msg: 'Specific row successfully deleted' });
  }
};

const updateCustomRow = async (req, res) => {
  if (process.env.DATABASE_MODE === 'MONGODB') {
    const { rowId } = req.params;
    const { newIndex, indexUpdate, rowTitle, hideDisplay, apiType } = req.body;

    const customRow = await CustomRow.findOne({ _id: rowId });
    if (!customRow) {
      throw new NotFoundError(`No custom row with id : ${rowId} found`);
    }

    if (indexUpdate) {
      // if (!newIndex) {//to recheck this again.
      //   throw new BadRequestError('Please provide newIndex value');
      // }

      customRow.indexLocation = newIndex;
      const abc = await customRow.save();
      res
        .status(StatusCodes.OK)
        .json({ msg: 'New index succesffully updated', customRow: abc });
    } else {
      // console.log(req.body);
      // console.log(rowTitle);
      // if (!rowTitle || !hideDisplay || !apiType) { //to recheck this again.
      //   throw new BadRequestError(
      //     'Please provide rowTitle, hideDisplay, and, apiType'
      //   );
      // }

      customRow.rowTitle = rowTitle;
      customRow.hideDisplay = hideDisplay;
      customRow.apiType = apiType;
      const abc = await customRow.save();
      res.status(StatusCodes.OK).json({
        msg: `Row ${abc._id} details succesfully updated`,
        customRow: abc,
      });
    }
  } else {
    const { rowId } = req.params;
    const { newIndex, indexUpdate, rowTitle, hideDisplay, apiType } = req.body;

    let pool = await sql.connect(config);
    let customRow = await pool
      .request()
      .input('input_rowId', sql.Int, parseInt(rowId))
      .query(
        'SELECT * from myhub_customrows where customrow_id = @input_rowId'
      );
    // console.log(customRow.recordsets[0]);
    if (customRow.recordsets[0].length === 0) {
      throw new NotFoundError(`No custom row with id : ${rowId} found`);
    }

    if (indexUpdate) {
      let userUpdate = await pool
        .request()
        .input('input_rowId', sql.Int, parseInt(rowId))
        .input('input_indexLocation', sql.Int, newIndex)
        .query(
          'UPDATE myhub_customrows SET indexLocation = @input_indexLocation WHERE customrow_id = @input_rowId'
        );
      res
        .status(StatusCodes.OK)
        .json({ msg: 'New index succesffully updated', userUpdate });
    } else {
      // if (!rowTitle || !hideDisplay || !apiType) {//to recheck this again.
      //   throw new BadRequestError(
      //     'Please provide rowTitle, hideDisplay, and, apiType'
      //   );
      // }

      let userUpdate = await pool
        .request()
        .input('input_rowId', sql.Int, parseInt(rowId))
        .input('input_rowTitle', sql.VarChar, rowTitle)
        .input('input_hideDisplay', sql.Bit, hideDisplay === true ? 1 : 0)
        .input('input_apiType', sql.VarChar, apiType)
        .query(
          'UPDATE myhub_customrows SET rowTitle = @input_rowTitle, hideDisplay = @input_hideDisplay, apiType = @input_apiType WHERE customrow_id = @input_rowId'
        );

      res
        .status(StatusCodes.OK)
        .json({ msg: 'New index succesffully updated', userUpdate });
    }
  }
};

export {
  createNewCustomRow,
  getAllCustomRow,
  addNewChannel,
  getSingleCustomRow,
  deletePoster,
  createPoster,
  deleteCustomRow,
  updateCustomRow,
};
