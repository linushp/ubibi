
function toAuthorInfo(userInfo) {
    return {
        uid: userInfo.id,
        nickname: userInfo.nickname,
        avatar: userInfo.avatar,
        description: userInfo.description
    };
}




module.exports = {
    toAuthorInfo:toAuthorInfo
};