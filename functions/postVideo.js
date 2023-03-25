exports.handler = function(admin, currentDBVersion, data) {

    var videoDoc = admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('videos').doc();
    const videoId = videoDoc.id;

    const newVideo = {
        videoId: videoId,
        commentIds: [],
        //creationTimestamp: admin.firestore.Timestamp.fromDate(new Date()).toDate()
      };
    return videoDoc.set(newVideo);

}