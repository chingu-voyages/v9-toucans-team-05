#unsplash-api

## Introduction

This is a Node.js wrapper for the [Unsplash REST API](https://unsplash.com/developers).

The wrapper encloses all public and private endpoints provided by Unsplash at this time, and will be updated as changes are made. For more information on the data each function returns, visit the [Unsplash REST API Documentation](https://unsplash.com/documentation).

## Installation

```
npm i --save unsplash-api
```

## Usage

#### Initialization

###### Loading the Module

To load the Unsplash API wrapper:
```js
var unsplash = require('unsplash-api');
```

###### .apiInit(clientId)

To initialize Unsplash using your client ID:
```js
var clientId = 'dummyKey'; //this is required to verify your application's requests
unsplash.init(clientId);
```
This **must** be done for any of the following functions to return results. Client IDs can be obtained by signing up for the [Unsplash REST API](https://unsplash.com/developers).

#### Public Scope Functions
Public scope functions require only a client ID, initialized using the function above.

###### .getUserByName(username, callback)

Retrieve information on a specific user.
To access info by username:
```js
unsplash.getUserByName('sampleUser', function(error, userInfo) {
   //Access user information here
});
```
More info on: [get user](https://unsplash.com/documentation/#get-a-users-public-profile).

###### .getUserPhotos(username, callback)

Retrieve a list of photos uploaded by a specific user.
To access photos by username:
```js
unsplash.getUserPhotos('sampleUser', function(error, photos) {
   //Access array of photos here
});
```
More info on: [get user photos](https://unsplash.com/documentation/#list-a-users-photos).

###### .getPhotos(page, perPage, callback)

Retrieve photos from a list of all photos. Results are organized by page, with a default of 10 results per page. The first/prev/next/last pages of results can be accessed through the link object.
To access photos:
```js
unsplash.getPhotos(null, null, function(error, photos, link) {
   //Access default 10 photos from first page of results here
});

//or

unsplash.getPhotos(2, 20, function(error, photos, link) {
   //Access 20 photos from second page of results here
});
```
More info on: [get photos](https://unsplash.com/documentation/#list-photos).

###### .searchPhotos(query, categories, page, perPage, callback)

Retrieve photos filtered by a specific query. Results are organized by page, with a default of 10 results per page, and can be furthered filter by specified categories. The first/prev/next/last pages of results can be accessed through the link object.
To search photos:
```js
unsplash.searchPhotos('sampleQuery', null, null, null, function(error, photos, link) {
   //Access default 10 photos from first page of search results here
});

//or

unsplash.searchPhotos('sampleQuery', [1, 2, 3], 2, 20, function(error, photos, link) {
   //Access 20 photos from second page of search results with filtering categories applied here
});
```
More info on: [search photos](https://unsplash.com/documentation/#search-photos).

###### .getPhoto(id, width, height, rect, callback)

Retrieve a single photo. The photo can be retreived with custom dimensions using width and height, or a specific portion of the photo can be obtained using the rect ([x, y, width, height]) parameter.
To access a photo by ID:
```js
unsplash.getPhoto(sampleID, null, null, null, function(error, photo) {
   //Access photo here
});

//or

unsplash.getPhoto(sampleID, 400, 200, null, function(error, photo) {
   //Access custom sized photo here
});

//or

unsplash.getPhoto(sampleID, null, null, [10, 10, 400, 200], function(error, photo) {
   //Access custom portion of photo here
});
```
More info on: [get a photo](https://unsplash.com/documentation/#get-a-photo).

###### .getAllCategories(callback)

Retrieve a list of all categories.
To access categories:
```js
unsplash.getAllCategories(function(error, categories) {
   //Access array of categories here
});
```
More info on: [get categories](https://unsplash.com/documentation/#list-categories).

###### .getCategory(categoryId, callback)

Retrieve info on a specific category.
To access category info by ID:
```js
unsplash.getCategory(sampleID, function(error, categoryInfo) {
   //Access category info here
});
```
More info on: [get a category](https://unsplash.com/documentation/#get-a-category).

###### .getCategoryPhotos(categoryId, page, perPage, callback)

Retrieve photos by category. Results are organized by page, with a default of 10 results per page. The first/prev/next/last pages of results can be accessed through the link object.
To access photos by category ID:
```js
unsplash.getCategoryPhotos(sampleID, null, null, function(error, photos, link) {
   //Access default 10 photos from first page of category photos here
});

//or

unsplash.getCategoryPhotos(sampleID, 2, 20, function(error, photos, link) {
   //Access 20 photos from second page of category photos here
});
```
More info on: [get category photos](https://unsplash.com/documentation/#get-photos-in-a-given-category).

###### .getCuratedBatches(page, perPage, callback)

Retrieve a list of curated batches. Results are organized by page, with a default of 10 results per page. The first/prev/next/last pages of results can be accessed through the link object.
To access curated batches:
```js
unsplash.getCuratedBatches(null, null, function(error, batches) {
   //Access default 10 curated batches from first page here
});

//or

unsplash.getCuratedBatches(2, 20, function(error, batches) {
   //Access 20 batches from second page of curated batches here
});
```
More info on: [get curated batches](https://unsplash.com/documentation/#list-curated-batches).

###### .getCuratedBatch(id, callback)

Retrieve info on a single curated batch.
To access curated batch info by ID:
```js
unsplash.getCuratedBatch(sampleID, function(error, batch) {
   //Access batch info here
});
```
More info on: [get a curated batch](https://unsplash.com/documentation/#get-a-curated-batch).

###### .getCuratedBatchPhotos(id, callback)

Retrieve 10 photos from a curated batch.
To access photos by curated batch ID:
```js
unsplash.getCuratedBatchPhotos(sampleID, function(error, photos) {
   //Access curated batch photos here
});
```
More info on: [get curated batch photos](https://unsplash.com/documentation/#get-photos-in-a-given-curated-batch).

###### .getTotalStats(callback)

Retrieve total Unsplash download stats.
To access stats:
```js
unsplash.getTotalStats(function(error, stats) {
   //Access stats here
});
```
More info on: [get stats](https://unsplash.com/documentation/#total-download-counts).

#### Private Scope Functions
These functions require an OAuth2 generated token, which can be acquired using [this workflow](https://unsplash.com/documentation/#user-authentication).

###### .getCurrentUser(token, callback)

Retrieve information on the current user. Requires *read_user* scope from authentication.
To access user info:
```js
unsplash.getCurrentUser('sampleToken', function(error, userInfo) {
   //Access current user info here
});
```
More info on: [get current user](https://unsplash.com/documentation/#get-the-users-profile).

###### .updateCurrentUser(token, changes, callback)

Change information for the current user. Requires *write_user* scope from authentication.
To update user info:
```js
var changes = {'username': 'newUsername', 'first_name': 'newName'};
unsplash.updateCurrentUser('sampleToken', changes, function(error, userInfo) {
   //Access updated current user info here
});
```
More info on: [update current user](https://unsplash.com/documentation/#update-the-current-users-profile).

###### .uploadPhoto(token, photo, callback)

Upload photo for the current user. Requires *write_photos* scope from authentication.
To upload a photo:
```js
unsplash.uploadPhoto('sampleToken', photoPath, function(error, photo) {
   //Access the newly uploaded photo here
});
```
More info on: [upload photo](https://unsplash.com/documentation/#upload-a-photo).


License [MIT](https://github.com/noahdietz/unsplash-api/blob/master/LICENSE)

**Disclaimer:** *We are not employees of Unsplash nor do we represent them in any way.*