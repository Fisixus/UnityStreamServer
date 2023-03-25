'use strict';

// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

const testDBVersion = 'test';

const getUserFunction = require('./getUser');
const getVideoFunction = require('./getVideo');
const getAllUsersFunction = require('./getAllUsers');
const getCommentsOfVideoFunction = require('./getCommentsOfVideo');

const updateCommentFunction = require('./updateComment');
const updateVideoCommentsFunction = require('./updateVideoComments'); //TODO: Do we need a direct call? 
const updateUserPasswordFunction = require('./updateUserPassword');

const postUserFunction = require('./postUser');
const postCommentFunction = require('./postComment');
const postVideoFunction = require('./postVideo');

const deleteVideoCommentFunction = require('./deleteVideoComment');

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



