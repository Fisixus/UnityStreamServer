'use strict';

// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');

const { FieldValue } = require('firebase-admin/firestore');

const testDBVersion = 'test';

//const getUserFunction = require('./getUser');
const getUserWithUUIDFunction = require('./getUserWithUUID');
const getOnGoingVideoFunction = require('./getOnGoingVideo');
const getUserWithEmailFunction = require('./getUserWithEmail');
//const getVideoFunction = require('./getVideo');
//const getCommentFunction = require('./getComment');
const getAllUsersFunction = require('./getAllUsers');
const getCommentsOfVideoFunction = require('./getCommentsOfVideo');
const getCommentsOfUserFunction = require('./getCommentsOfUser');
const getUserVideosFunction = require('./getUserVideos');

const updateUserUUIDLogoutFunction = require('./updateUserUUIDLogout');
const updateUserUUIDLoginFunction = require('./updateUserUUIDLogin');
const updateCommentFunction = require('./updateComment');
const updateVideoAfterStreamFunction = require('./updateVideoAfterStream');
//const updateUserVideoIdsFunction = require('./updateUserVideoIds');
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


exports.web_getUserWithUUID = functions.https
    .onRequest((req, res) => 
    {
        cors(req, res, () => {
            const cookie = req.headers['uuid'];
            //console.log("Hereee " + cookie);
            getUserWithUUIDFunction.handler(admin, testDBVersion, cookie).then(d=> res.status(200).send(JSON.stringify(d)));
        })
    });

exports.web_getOnGoingVideo = functions.https
    .onRequest((req, res) => 
    {
        cors(req, res, () => {
            const cookie = req.headers['uuid'];
            getOnGoingVideoFunction.handler(admin, testDBVersion, cookie).then(d=> res.status(200).send(JSON.stringify(d)));
        })
    });

exports.web_getAllUsers = functions.https
    .onRequest((req, res) => {
        cors(req, res, () => {
            const data = {};
            getAllUsersFunction.handler(admin, testDBVersion, data).then(d=> res.status(200).send(JSON.stringify(d)));
        })
       
    });


exports.web_getCommentsOfVideo = functions.https
    .onRequest((req, res) => {
        cors(req, res, () => {
            getCommentsOfVideoFunction.handler(admin, testDBVersion, JSON.stringify(req.body)).then(d=> res.status(200).send(JSON.stringify(d)));
        })
    });

exports.web_getCommentsOfUser = functions.https
    .onRequest((req, res) => {
        cors(req, res, () => {
            const cookie = req.headers['uuid'];
            getCommentsOfUserFunction.handler(admin, testDBVersion, JSON.stringify(req.body), cookie).then(d=> res.status(200).send(JSON.stringify(d)));
        })
    });

exports.web_getUserVideos = functions.https
    .onRequest((req, res) => {
        cors(req, res, () => {
            const cookie = req.headers['uuid'];
            getUserVideosFunction.handler(admin, testDBVersion, cookie).then(d=> res.status(200).send(JSON.stringify(d)));
        })
    });

exports.web_updateComment = functions.https
    .onRequest((req, res) => {
        cors(req, res, () => {
            updateCommentFunction.handler(admin, testDBVersion, JSON.stringify(req.body)).then(d=> res.status(200).send(JSON.stringify(d)));
        })

    });

exports.web_updateVideoAfterStream = functions.https
    .onRequest((req,res) => 
    {
        cors(req, res, () => {
            const cookie = req.headers['uuid'];
            updateVideoAfterStreamFunction.handler(admin, testDBVersion, JSON.stringify(req.body),cookie).then(d => res.status(200).send(JSON.stringify(d)));
        })
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
    .onRequest((req, res) => {
        cors(req, res, () => {
            updateVideoCommentsFunction.handler(admin, testDBVersion, JSON.stringify(req.body)).then(d => res.status(200).send(JSON.stringify(d)));
        })
    });

exports.web_updateUserPassword = functions.https
    .onRequest((req, res) => {
        cors(req, res, () => {
            updateUserPasswordFunction.handler(admin, testDBVersion, JSON.stringify(req.body)).then(d=> res.status(200).send(JSON.stringify(d)));
        })

    });

exports.web_updateStartingVideoTimesOfUser = functions.https
    .onRequest((req, res) => {
        cors(req, res, () => {
            const cookie = req.headers['uuid'];
            updateStartingVideoTimesOfUserFunction.handler(admin, testDBVersion, JSON.stringify(req.body), cookie).then(d => res.status(200).send(JSON.stringify(d)));
        })
    });

exports.web_postUser = functions.https
    .onRequest((req, res) => {
        cors(req, res, () => {
            postUserFunction.handler(admin, testDBVersion, JSON.stringify(req.body)).then(d => res.status(200).send(JSON.stringify(d)));
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
    .onRequest((req, res) => {
        cors(req, res, () => {
            const cookie = req.headers['uuid'];
            postCommentFunction.handler(admin, testDBVersion, JSON.stringify(req.body), cookie).then(d => res.status(200).send(JSON.stringify(d)));
        })
    });

exports.web_deleteVideoComment = functions.https
    .onRequest((req, res) => {
        cors(req, res, () => {
            deleteVideoCommentFunction.handler(admin, testDBVersion, JSON.stringify(req.body)).then(d => res.status(200).send(JSON.stringify(d)));
        })
    });



exports.unity_getUserWithEmail = functions.https
    .onCall((data) => {
        return getUserWithEmailFunction.handler(admin, testDBVersion, data);
    });

exports.unity_getAllUsers = functions.https
    .onCall((data) => {
        return getAllUsersFunction.handler(admin, testDBVersion, data);
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

exports.unity_updateVideoAfterStream = functions.https
    .onCall((data) => 
    {
        updateVideoAfterStreamFunction.handler(admin, testDBVersion, data).then(d => res.status(200).send(JSON.stringify(d)));
    });
