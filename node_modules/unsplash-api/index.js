/**
 * This file contains the main functionality for the unsplash-api module
 *
 * @author Noah Dietz - noahdietz
 * @author Jacob Copus  - jcopus
 */

'use strict';

var request = require('request');
var path = require('path');
var fs = require('fs');

var HOST = 'https://api.unsplash.com/'
var client_id;

module.exports = {
  init: apiInit,
  getUserPhotos: getUserPhotos,
  getUserByName: getUserByName,
  getPhotos: getPhotos,
  searchPhotos: searchPhotos,
  getPhoto: getPhoto,
  getAllCategories: getAllCategories,
  getCategory: getCategory,
  getCategoryPhotos: getCategoryPhotos,
  getCuratedBatches: getCuratedBatches,
  getCuratedBatch: getCuratedBatch,
  getCuratedBatchPhotos: getCuratedBatchPhotos,
  getTotalStats: getTotalStats,
  getCurrentUser: getCurrentUser,
  updateCurrentUser: updateCurrentUser,
  uploadPhoto: uploadPhoto
};

/**
 * initiation function required to handle application client_id
 * @param  {string} client_id application's client_id
 */
function apiInit(client_id){
  this.client_id = client_id;
}

/**
 * Callback that returns retrieved user photos
 *
 * @callback getUserPhotosCallback
 * @param {object}  Error response error object
 * @param {Array}   photos array of photos from specified user
 */

/**
 * gets photos of specified user
 * @param  {string}   userName username of target user
 * @param  {getUserPhotosCallback} callback called upon completion of API call
 */
function getUserPhotos(userName, callback) {
  request({
    url: (HOST + path.join('users', userName, 'photos')),
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Client-ID ' + this.client_id
    }
  },
  function(err, res, body){
    if (err) return callback(err);

    if (res.statusCode !== 200) return callback(new Error(body), null);

    return callback(null, JSON.parse(body));
  });
}

/**
 * Callback that returns target user information
 *
 * @callback getUserByNameCallback
 * @param {object}  Error response error object
 * @param {object}  user  specified user's information
 */

/**
 * gets the public info of the specified user
 * @param  {string}   userName username of target user
 * @param  {getUserByNameCallback} callback called upon completion of API call
 */
function getUserByName(userName, callback) {
  request({
    url: (HOST + path.join('users', userName)),
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Client-ID ' + this.client_id
    }
  },
  function(err, res, body) {
    if (err) return callback(err);

    if (res.statusCode !== 200) return callback(new Error(body), null);

    return callback(null, JSON.parse(body));
  });
}

/**
 * Callback that returns retrieved categories
 *
 * @callback getAllCategoriesCallback
 * @param {object} Error response error object
 * @param {array} categories array of all available categories
 */

/**
 * gets all of the available photo categories
 * @param  {getAllCategoriesCallback} callback called upon completion of API call
 */
function getAllCategories(callback) {
  request({
    url: (HOST + 'categories'),
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Client-ID ' + this.client_id
    }
  },
  function(err, res, body) {
    if (err) return callback(err);

    if (res.statusCode !== 200) return callback(new Error(body), null);

    return callback(null, JSON.parse(body));
  });
}

/**
 * Callback that returns retrieved photos and links
 *
 * @callback getPhotosCallback
 * @param {object} Error response error object
 * @param {Array} photos array of retrieved photos
 * @param {string} link string of links for prev/next page
 */

/**
 * gets a single page of photos from the list of all photos
 * @param  {int}      page     target page number
 * @param  {int}      perPage  number of photos returned per page
 * @param  {getPhotosCallback} callback called upon completion of API call
 */
function getPhotos(page, perPage, callback) {
   var params = {};

   if (page != null)
      params.page = page;

   if (perPage != null)
      params.per_page = perPage;

   request({
      url: (HOST + path.join('photos')),
      method: 'GET',
      qs: params,
      headers: {
         'Content-type': 'application/json',
         'Authorization': 'Client-ID ' + this.client_id
      }
   },
   function(err, res, body){
      if (err) return callback(err);

      if (res.statusCode !== 200) return callback(new Error(body), null);

      return callback(null, JSON.parse(body), res.headers.link);
   });
}

/**
 * Callback that returns array of search results and links
 *
 * @callback searchPhotosCallback
 * @param {object} Error response error object
 * @param {array} photos search results
 * @param {string} link string of links for prev/next page
 */

/**
 * gets a single page of photos by search query
 * @param  {string}   query      term to search by
 * @param  {Array}    categories ids of categories to filter by, as an array of ints
 * @param  {int}      page       target page number
 * @param  {int}      perPage    number of photos returned per page
 * @param  {searchPhotosCallback} callback  called upon completion of API call
 */
function searchPhotos(query, categories, page, perPage, callback) {
   var params = {};

   if (query != null)
      params.query = query;

   if (categories != null) {
      params.category = '';
      for (var index = 0; index < categories; index++) {
         params.category += categories[index];

         if (index != categories.length - 1)
            params.category += ',';
      }
   }


   if (page != null)
      params.page = page;

   if (perPage != null)
      params.per_page = perPage;

   request({
      url: (HOST + path.join('photos', 'search')),
      method: 'GET',
      qs: params,
      headers: {
         'Content-type': 'application/json',
         'Authorization': 'Client-ID ' + this.client_id
      }
   },
   function(err, res, body){
      if (err) return callback(err);

      if (res.statusCode !== 200) return callback(new Error(body), null);

      return callback(null, JSON.parse(body), res.headers.link);
   });
}

/**
 * Callback that returns the request photo information
 *
 * @callback getPhotoCallback
 * @param {object} Error response error object
 * @param {object} photo requested photo information
 */

/**
 * gets a single photo by id
 * @param  {string}   id       id of photo to request
 * @param  {int}      width    custom width to apply
 * @param  {int}      height   custom height to apply
 * @param  {Array}    rect     custom rectangle to apply [x, y, width, height]
 * @param  {getPhotoCallback} callback called upon completion of API call
 */
function getPhoto(id, width, height, rect, callback) {
   var params = {};

   if (width != null)
      params.w = width;

   if (height != null)
      params.h = height;

   if (rect != null)
      params.rect = rect[0] + ',' + rect[1] + ',' + rect[2] + ',' + rect[3];

   request({
      url: (HOST + path.join('photos', id)),
      method: 'GET',
      qs: params,
      headers: {
         'Content-type': 'application/json',
         'Authorization': 'Client-ID ' + this.client_id
      }
   },
   function(err, res, body){
      if (err) return callback(err);

      if (res.statusCode !== 200) return callback(new Error(body), null);

      return callback(null, JSON.parse(body));
   });
}

/**
 * Callback that returns specified category information
 *
 * @callback getCategoryCallback
 * @param {object} Error response error object
 * @param {object} category target category information
 */

/**
 * get category information by ID
 * @param  {int} categoryId ID of target category
 * @param  {getCategoryCallback} callback  called upon completion of API call
 */
function getCategory(categoryId, callback) {
  request({
    url: (HOST + path.join('categories', categoryId.toString())),
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Client-ID ' + this.client_id
    }
  },
  function(err, res, body) {
    if (err) return callback(err);

    if (res.statusCode !== 200) return callback(new Error(body), null);

    return callback(null, JSON.parse(body));
  });
}

/**
 * Callback that returns photos of specified category
 *
 * @callback getCategoryPhotosCallback
 * @param {object} Error response error object
 * @param {array} photos retrieved photos
 * @param {string} link string of prev/next page links
 */

/**
 * get photos from a specific category
 * @param {int} categoryId id of the target category
 * @param {int} page target page of photos to return
 * @param {int} perPage number of photos per page
 * @param {getCategoryPhotosCallback} callback called upon completion of API call
 */
function getCategoryPhotos(categoryId, page, perPage, callback) {
  var params = {};

  if (page != null)
     params.page = page;

  if (perPage != null)
     params.per_page = perPage;

  request({
    url: (HOST + path.join('categories', categoryId.toString(), 'photos')),
    method: 'GET',
    qs: params,
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Client-ID ' + this.client_id
    }
  },
  function(err, res, body) {
    if (err) return callback(err);

    if (res.statusCode !== 200) return callback(new Error(body), null);

    return callback(null, JSON.parse(body), res.headers.link);
  });
}

/**
 * Callback to return the curated batches
 *
 * @callback getCuratedBatchesCallback
 * @param {object} Error response error object
 * @param {array} batches set of curated batch information
 */

/**
 * get a single page of curated batches
 * @param  {int}      page       target page number
 * @param  {int}      perPage    number of results per page
 * @param  {getCuratedBatchesCallback} callback   called upon completion of API call
 */
function getCuratedBatches(page, perPage, callback) {
  var params = {};

  if (page != null)
     params.page = page;

  if (perPage != null)
  params.per_page = perPage;

  request({
    url: (HOST + path.join('curated_batches')),
    method: 'GET',
    qs: params,
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Client-ID ' + this.client_id
    }
  },
  function(err, res, body) {
    if (err) return callback(err);

    if (res.statusCode !== 200) return callback(new Error(body), null);

    return callback(null, JSON.parse(body), res.headers.link);
  });
}

/**
 * Callback that returns the info for a specific curated batch
 *
 * @callback getCuratedBatchCallback
 * @param {object} Error response error object
 * @param {object} batch target batch information
 */

/**
 * get info from a curated batch
 * @param  {int}      id         target page number
 * @param  {getCuratedBatchCallback} callback   called upon completion of API call
 */
function getCuratedBatch(id, callback) {
  request({
    url: (HOST + path.join('curated_batches', id.toString())),
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Client-ID ' + this.client_id
    }
  },
  function(err, res, body) {
    if (err) return callback(err);

    if (res.statusCode !== 200) return callback(new Error(body), null);

    return callback(null, JSON.parse(body));
  });
}

/**
 * Callback that returns photos of a curated batch
 *
 * @callback getCuratedBatchPhotosCallback
 * @param {object} Error response error object
 * @param {array} photos set of photos in target batch
 */

/**
 * get photos from a curated batch
 * @param  {int}      id         target page number
 * @param  {getCuratedBatchPhotosCallback} callback   called upon completion of API call
 */
function getCuratedBatchPhotos(id, callback) {
  request({
    url: (HOST + path.join('curated_batches', id.toString(), 'photos')),
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Client-ID ' + this.client_id
    }
  },
  function(err, res, body) {
    if (err) return callback(err);

    if (res.statusCode !== 200) return callback(new Error(body), null);

    return callback(null, JSON.parse(body));
  });
}

/**
 * Callback that returns the overall stats
 *
 * @callback getTotalStatsCallback
 * @param {object} Error response error object
 * @param {object} stats overall stats of the Unsplash site
 */

/**
 * get total download stats
 * @param  {getTotalStatsCallback} callback   called upon completion of API call
 */
function getTotalStats(callback) {
  request({
    url: (HOST + path.join('stats', 'total')),
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Client-ID ' + this.client_id
    }
  },
  function(err, res, body) {
    if (err) return callback(err);

    if (res.statusCode !== 200) return callback(new Error(body), null);

    return callback(null, JSON.parse(body));
  });
}

/**
 * Callback that returns the current logged-in user's information
 *
 * @callback geCurrentUserCallback
 * @param {object} Error response error object
 * @param {object} user information of current, logged-in user
 */

/**
 * retrieves personal information about the logged-in user
 * @param  {string}   token    OAuth token for target user
 * @param  {getCurrentUserCallback} callback called upon completion of API call
 */
function getCurrentUser(token, callback) {
  request({
    url: (HOST + 'me'),
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  },
  function(err, res, body) {
    if (err) return callback(err);

    if (res.statusCode !== 200) return callback(new Error(body), null);

    return callback(null, JSON.parse(body));
  });
}

/**
 * Callback that returns updated information of logged-in user
 *
 * @callback updateCurrentUserCallback
 * @param {object} Error response error object
 * @param {object} user updated information of logged-in user
 */

/**
 * update the current logged-in user's personal information
 * @param  {string}   token    OAuth token for target user
 * @param  {object}   changes  information to be changed in logged-in user
 * @param  {updateCurrentUserCallback} callback called upon completion of API call
 */
function updateCurrentUser(token, changes, callback) {
  request({
    url: (HOST + 'me'),
    method: 'PUT',
    qs: changes,
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  },
  function(err, res, body) {
    if (err) return callback(err);

    if (res.statusCode !== 200) return callback(new Error(body), null);

    return callback(null, JSON.parse(body));
  });
}

/**
 * Callback that returns newly submitted photo's information
 *
 * @callback uploadPhotoCallback
 * @param {object} Error response error object
 * @param {object} photo information of the uploaded photo
 */

/**
 * submits a photo to the current logged-in account
 * @param  {string}   token     OAuth token for target user
 * @param  {string}   photoPath location of photo to be uploaded
 * @param  {uploadPhotoCallback} callback  called upon cpmletion of API call
 */
function uploadPhoto(token, photoPath, callback) {

  request({
      url: (HOST + 'photos'),
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      formData: {
        photo: fs.createReadStream(path.join(process.cwd(), photoPath))
      }
    },
    function(err, res, body) {
      if (err) return callback(err);

      if (res.statusCode !== 201) return callback(new Error(body), null);

      return callback(null, JSON.parse(body));
    });
}
