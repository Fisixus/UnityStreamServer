const getVideoFunc = require('./getVideo');
const getUserWithUUIDFunc = require('./getUserWithUUID')

exports.handler = function(admin, currentDBVersion, cookie) {
    
    const uuid = cookie;

    return getUserWithUUIDFunc.handler(admin,currentDBVersion,uuid)
    .then((user)=>
    {
        const videoIds = user.videoIds;
        const promises = videoIds.map(function(videoId)
            {
                const newData = 
                    {
                        videoId: videoId,
                    };
                return getVideoFunc.handler(admin,currentDBVersion,newData)
            });
            return Promise.all(promises);
    });
}
