'use strict';

// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');

const { FieldValue } = require('firebase-admin/firestore');

const testDBVersion = 'test';

const getUserFunction = require('./getUser');
const getUserWithUUIDFunction = require('./getUserWithUUID');
const getUserWithEmailFunction = require('./getUserWithEmail');
const getVideoFunction = require('./getVideo');
const getCommentFunction = require('./getComment');
const getAllUsersFunction = require('./getAllUsers');
const getCommentsOfVideoFunction = require('./getCommentsOfVideo');
const getCommentsOfUserFunction = require('./getCommentsOfUser');

const updateUserUUIDLogoutFunction = require('./updateUserUUIDLogout');
const updateUserUUIDLoginFunction = require('./updateUserUUIDLogin');
const updateCommentFunction = require('./updateComment');
const updateUserVideosFunction = require('./updateUserVideos');
const updateVideoCommentsFunction = require('./updateVideoComments'); //TODO: Do we need a direct call? 
const updateUserPasswordFunction = require('./updateUserPassword');
const updateStartingVideoTimesOfUserFunction = require('./updateStartingVideoTimesOfUser');

const postUserFunction = require('./postUser');
const postCommentFunction = require('./postComment');
const postVideoFunction = require('./postVideo');

const deleteVideoCommentFunction = require('./deleteVideoComment');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
admin.initializeApp();

/*
exports.testPostUser = functions.https.onRequest((req, res) =>
{
        const data = {
            email: 'uerden',
            password: 'Aa1234',
            role:0
      };
      res.status(200).send(postUserFunction.handler(admin, testDBVersion, data));
      //return postUserFunction.handler(admin, testDBVersion, data);
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
*/

exports.web_getUser = functions.https
    .onRequest((req, res, data) => {
        getUserFunction.handler(admin, testDBVersion, data).then(d => res.set('Access-Control-Allow-Origin', '*').status(200).send(JSON.stringify(d)));
        //return getUserFunction.handler(admin, testDBVersion, data);
    });

exports.web_getUserWithUUID = functions.https
    .onRequest((req, res) => 
    {
        cors(req, res, () => {
            const cookie = req.headers['uuid'];
            console.log("Hereee " + cookie);
            getUserWithUUIDFunction.handler(admin, testDBVersion, cookie).then(d=> res.status(200).send(JSON.stringify(d)));
        //return getUserFunction.handler(admin, testDBVersion, data);
        })
    });

exports.web_getVideo = functions.https
    .onRequest((req, res, data) => {
        getVideoFunction.handler(admin, testDBVersion, data).then(d => res.set('Access-Control-Allow-Origin', '*').status(200).send(JSON.stringify(d)));
        //return getVideoFunction.handler(admin, testDBVersion, data);
    });

exports.web_getComment = functions.https
    .onRequest((req, res) => {
        getCommentFunction.handler(admin, testDBVersion, data).then(d => res.set('Access-Control-Allow-Origin', '*').status(200).send(JSON.stringify(d)));
        //return getCommentFunction.handler(admin, testDBVersion, data);
    });

exports.web_getAllUsers = functions.https
    .onRequest((req, res, data) => {
        const cookie = req.headers['uuid'];
        console.log("Hereee " + cookie);
        getAllUsersFunction.handler(admin, testDBVersion, data).then(d => res.set('Access-Control-Allow-Origin', '*').set('Access-Control-Allow-Headers', '*').status(200).send(JSON.stringify(d)));
    });

exports.web_getCommentsOfVideo = functions.https
    .onRequest((req, res, data) => {
        //return getCommentsOfVideoFunction.handler(admin, testDBVersion, data);
        getCommentsOfVideoFunction.handler(admin, testDBVersion, data).then(d => res.set('Access-Control-Allow-Origin', '*').status(200).send(JSON.stringify(d)));
    });

exports.web_getCommentsOfUser = functions.https
    .onRequest((req, res, data) => {
        //return getCommentsOfUserFunction.handler(admin, testDBVersion, data);
        getCommentsOfUserFunction.handler(admin, testDBVersion, data).then(d => res.set('Access-Control-Allow-Origin', '*').status(200).send(JSON.stringify(d)));

    });

exports.web_updateComment = functions.https
    .onRequest((req, res, data) => {
        updateCommentFunction.handler(admin, testDBVersion, data).then(d => res.set('Access-Control-Allow-Origin', '*').status(200).send(JSON.stringify(d)));
    });

exports.web_updateUserUUIDLogin = functions.https
    .onRequest((req,res) => 
    {
        cors(req, res, () => {
            updateUserUUIDLoginFunction.handler(admin, testDBVersion, JSON.stringify(req.body)).then(d => res.status(200).send(JSON.stringify(d)));
        })
    });


exports.web_updateUserUUIDLogout = functions.https
    .onRequest((req,res) => 
    {
        cors(req, res, () => {
            const cookie = req.headers['uuid'];
            updateUserUUIDLogoutFunction.handler(admin, testDBVersion, cookie).then(d => res.status(200).send(JSON.stringify(d)));
        })
    });

exports.web_updateVideoComments = functions.https
    .onRequest((req, res, data) => {
        //return updateVideoCommentsFunction.handler(admin, testDBVersion, data);
        updateVideoCommentsFunction.handler(admin, testDBVersion, data).then(d => res.set('Access-Control-Allow-Origin', '*').status(200).send(JSON.stringify(d)));
    });

exports.web_updateUserPassword = functions.https
    .onRequest((req, res, data) => {
        //return updateUserPasswordFunction.handler(admin, testDBVersion, data);
        updateUserPasswordFunction.handler(admin, testDBVersion, data).then(d => res.set('Access-Control-Allow-Origin', '*').status(200).send(JSON.stringify(d)));
    });

exports.web_updateStartingVideoTimesOfUser = functions.https
    .onRequest((req, res, data) => {
        //return updateStartingVideoTimesOfUserFunction.handler(admin, testDBVersion, data);
        updateStartingVideoTimesOfUserFunction.handler(admin, testDBVersion, data).then(d => res.set('Access-Control-Allow-Origin', '*').status(200).send(JSON.stringify(d)));
    });

exports.web_postUser = functions.https
    .onRequest((req, res) => {
        //return postUserFunction.handler(admin, testDBVersion, data);
        cors(req, res, () => {
            postUserFunction.handler(admin, testDBVersion, JSON.stringify(req.body)).then(d => res.status(200).send(JSON.stringify(d)));
        //return getUserFunction.handler(admin, testDBVersion, data);
        })
       
    });

exports.web_postVideo = functions.https
    .onRequest((req, res) => {
        cors(req, res, () => {
            const cookie = req.headers['uuid'];
            postVideoFunction.handler(admin, testDBVersion, JSON.stringify(req.body), cookie).then(d => res.status(200).send(JSON.stringify(d)));
        })
    });

exports.web_postComment = functions.https
    .onRequest((req, res, data) => {
        postCommentFunction.handler(admin, testDBVersion, data).then(d => res.set('Access-Control-Allow-Origin', '*').status(200).send(JSON.stringify(d)));
    });

exports.web_deleteVideoComment = functions.https
    .onRequest((req, res, data) => {
        deleteVideoCommentFunction.handler(admin, testDBVersion, data).then(d => res.set('Access-Control-Allow-Origin', '*').status(200).send(JSON.stringify(d)));
    });



exports.unity_getUser = functions.https
    .onCall((data) => {
        return getUserFunction.handler(admin, testDBVersion, data);
    });

exports.unity_getVideo = functions.https
    .onCall((data) => {
        return getVideoFunction.handler(admin, testDBVersion, data);
    });

exports.unity_getComment = functions.https
    .onCall((data) => {
        return getCommentFunction.handler(admin, testDBVersion, data);
    });

exports.unity_getAllUsers = functions.https
    .onCall((data) => {
        //  console.log("SA"+ JSON.stringify(getAllUsersFunction.handler(admin, testDBVersion, req.body).json()));
        // res.status(200).send(JSON.stringify(getAllUsersFunction.handler(admin, testDBVersion, res)));
        //return response.send(200,getAllUsersFunction.handler(admin, testDBVersion, data));
        return getAllUsersFunction.handler(admin, testDBVersion, data);
        //getAllUsersFunction.handler(admin, testDBVersion, res).then(d=> res.status(200).send(JSON.stringify(d)));
    });

exports.unity_getCommentsOfVideo = functions.https
    .onCall((data) => {
        return getCommentsOfVideoFunction.handler(admin, testDBVersion, data);
    });

exports.unity_getCommentsOfUser = functions.https
    .onCall((data) => {
        return getCommentsOfUserFunction.handler(admin, testDBVersion, data);
    });

exports.unity_updateComment = functions.https
    .onCall((data) => {
        return updateCommentFunction.handler(admin, testDBVersion, data);
    });

exports.unity_updateVideoComments = functions.https
    .onCall((data) => {
        return updateVideoCommentsFunction.handler(admin, testDBVersion, data);
    });

exports.unity_updateUserPassword = functions.https
    .onCall((data) => {
        return updateUserPasswordFunction.handler(admin, testDBVersion, data);
    });

exports.unity_updateStartingVideoTimesOfUser = functions.https
    .onCall((data) => {
        return updateStartingVideoTimesOfUserFunction.handler(admin, testDBVersion, data);
    });

exports.unity_postUser = functions.https
    .onCall((data) => {
        return postUserFunction.handler(admin, testDBVersion, data);
    });

exports.unity_postVideo = functions.https
    .onCall((data) => {
        return postVideoFunction.handler(admin, testDBVersion, data);
    });

exports.unity_postComment = functions.https
    .onCall((data) => {
        return postCommentFunction.handler(admin, testDBVersion, data);
    });

exports.unity_deleteVideoComment = functions.https
    .onCall((data) => {
        return deleteVideoCommentFunction.handler(admin, testDBVersion, data);
    });



