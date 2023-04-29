const getVideoFunc = require('./getVideo');
const getCommentFunc = require('./getComment');

exports.handler = function (admin, currentDBVersion, data, cookie) {
    const parsed = JSON.parse(data);

    return getVideoFunc.handler(admin, currentDBVersion, parsed, cookie)
        .then((video) => {
            const commentIds = video.commentIds;
            const promises = commentIds.map(function (commentId) {
                const d =
                {
                    commentId: commentId,
                };
                return getCommentFunc.handler(admin, currentDBVersion, d)
            });
            return Promise.all(promises);
        });
}
