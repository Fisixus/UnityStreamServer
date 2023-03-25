const updateVideoCommentsFunction = require('./updateVideoComments');

exports.handler = function(admin, currentDBVersion, data) {

    var commentDoc = admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('comments').doc();
    const commentId = commentDoc.id;
    const userId = data.userId;
    const videoId = data.videoId;
    const content = data.content;
    const videoTime = data.videoTime; //TODO: Control it

    const newComment = {
        commentId: commentId,
        userId: userId,
        videoId: videoId,
        content: content,
        videoTime: videoTime
        //creationTimestamp: admin.firestore.Timestamp.fromDate(new Date()).toDate()
      };
    return commentDoc.set(newComment)
    .then(()=>{
        newData = 
        {
            videoId:videoId,
            commentId:commentId
        }
        return updateVideoCommentsFunction.handler(admin,currentDBVersion,newData)
    })

}