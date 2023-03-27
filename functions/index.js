'use strict';

// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');

const { FieldValue } = require('firebase-admin/firestore');

const testDBVersion = 'test';

const getUserFunction = require('./getUser');
const getVideoFunction = require('./getVideo');
const getCommentFunction = require('./getComment');
const getAllUsersFunction = require('./getAllUsers');
const getCommentsOfVideoFunction = require('./getCommentsOfVideo');
const getCommentsOfUserFunction = require('./getCommentsOfUser');

const updateCommentFunction = require('./updateComment');
const updateVideoCommentsFunction = require('./updateVideoComments'); //TODO: Do we need a direct call? 
const updateUserPasswordFunction = require('./updateUserPassword');
const updateStartingVideoTimesOfUserFunction = require('./updateStartingVideoTimesOfUser');

const postUserFunction = require('./postUser');
const postCommentFunction = require('./postComment');
const postVideoFunction = require('./postVideo');

const deleteVideoCommentFunction = require('./deleteVideoComment');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

exports.testPostUser = functions.https.onRequest((req, res) =>
{
        const data = {
            userId: '1',
            email: 'uerden',
            password: 'Aa1234',
            role:0
      };
      return postUserFunction.handler(admin, testDBVersion, data);
});
exports.testPostVideo = functions.https.onRequest((req, res) =>
{
        const data = {

      };
      return postVideoFunction.handler(admin, testDBVersion, data);
});
exports.testPostComment = functions.https.onRequest((req, res) =>
{
        const data = {
            userId: 'RwioHO81tNK1JqP6jLNF',
            videoId: 'WwYBiX9aSOXL3WOWvtDs',
            content: 'super important!!',
            videoRelativeTime:5.23
      };
      return postCommentFunction.handler(admin, testDBVersion, data);
});

exports.testUpdateStartingVideoTimesOfUser = functions.https.onRequest((req, res) =>
{
        const data = {
            userId: 'RwioHO81tNK1JqP6jLNF',
            videoId: 'WwYBiX9aSOXL3WOWvtDs',
            startingTime: FieldValue.fromDate(new Date()).toDate()
      };
      return updateStartingVideoTimesOfUserFunction.handler(admin, testDBVersion, data);
});



exports.test_getUser = functions.https
    .onCall((data) => 
    {
        return getUserFunction.handler(admin, testDBVersion, data);
    });

exports.test_getVideo = functions.https
    .onCall((data) => 
    {
        return getVideoFunction.handler(admin, testDBVersion, data);
    });

exports.test_getComment = functions.https
    .onCall((data) => 
    {
        return getCommentFunction.handler(admin, testDBVersion, data);
    });

exports.test_getAllUsers = functions.https
    .onCall((data) => 
    {
        return getAllUsersFunction.handler(admin, testDBVersion, data);
    });

exports.test_getCommentsOfVideo = functions.https
    .onCall((data) => 
    {
        return getCommentsOfVideoFunction.handler(admin, testDBVersion, data);
    });

exports.test_getCommentsOfUser = functions.https
    .onCall((data) => 
    {
        return getCommentsOfUserFunction.handler(admin, testDBVersion, data);
    });

exports.test_updateComment = functions.https
    .onCall((data) => 
    {
        return updateCommentFunction.handler(admin, testDBVersion, data);
    });

exports.test_updateVideoComments = functions.https
    .onCall((data) => 
    {
        return updateVideoCommentsFunction.handler(admin, testDBVersion, data);
    });

exports.test_updateUserPassword = functions.https
    .onCall((data) => 
    {
        return updateUserPasswordFunction.handler(admin, testDBVersion, data);
    });

exports.test_updateStartingVideoTimesOfUser = functions.https
    .onCall((data) => 
    {
        return updateStartingVideoTimesOfUserFunction.handler(admin, testDBVersion, data);
    });

exports.test_postUser = functions.https
    .onCall((data) => 
    {
        return postUserFunction.handler(admin, testDBVersion, data);
    });

exports.test_postVideo = functions.https
    .onCall((data) => 
    {
        return postVideoFunction.handler(admin, testDBVersion, data);
    });

exports.test_postComment = functions.https
    .onCall((data) => 
    {
        return postCommentFunction.handler(admin, testDBVersion, data);
    });

exports.test_deleteVideoComment = functions.https
    .onCall((data) => 
    {
        return deleteVideoCommentFunction.handler(admin, testDBVersion, data);
    });



