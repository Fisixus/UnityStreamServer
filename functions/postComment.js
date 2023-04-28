const updateVideoCommentsFunction = require('./updateVideoComments');
const getUserWithUUIDFunc = require('./getUserWithUUID');
const deleteVideoComment = require('./deleteVideoComment');

exports.handler = function (admin, currentDBVersion, data, cookie) {
    const parsed = JSON.parse(data);
    parsed.comments.forEach(element => {
        const uuid = cookie;
        const videoId = element.videoId;
        const content = element.content;
        const annotationTime = element.annotationTime;
        const actualTime = element.actualTime;

        var commentDoc = admin.firestore().collection(`Versions`).doc(`${currentDBVersion}`).collection('comments').doc();
        const commentId = commentDoc.id;
        return getUserWithUUIDFunc.handler(admin, currentDBVersion, uuid)
            .then(user => {
                return deleteVideoComment.handler(admin, currentDBVersion, videoId, user.userId)
                    .then(() => {
                        const newComment = {
                            commentId: commentId,
                            userId: user.userId,
                            videoId: videoId,
                            content: content,
                            annotationTime: annotationTime,
                            actualTime: actualTime
                        };
                        return commentDoc.set(newComment)
                            .then(() => {
                                const newData =
                                {
                                    videoId: videoId,
                                    commentId: commentId
                                }
                                return updateVideoCommentsFunction.handler(admin, currentDBVersion, newData);
                            })
                    })

            });

    });

}