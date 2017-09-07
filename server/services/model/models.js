var TopicModel = {
    tableName: 't_topic',
    tableFields: [
        'id',
        'topic_type',
        'title',
        'description',
        'cover_img',
        'content',
        'author_id',
        'author_info',
        'subject_ids',
        'images',
        'category_id',
        'reply_count',
        'view_count',
        'like_count',
        'create_time',
        'update_time'
    ]
};


var ReplyModel = {
    tableName: 't_reply',
    tableFields: [
        'id',
        'topic_id',
        'content',
        'floor_num',
        'author_id',
        'author_info',
        'create_time',
        'update_time',
        'like_count'
    ]
};


var CategoryModel = {
    tableName: 't_category',
    tableFields: [
        'id',
        'title',
        'author_id',
        'author_info',
        'create_time',
        'update_time'
    ]
};


var SubjectModel = {
    tableName: 't_subject',
    tableFields: [
        'id',
        'title',
        'author_id',
        'author_info',
        'create_time',
        'update_time'
    ]
};


var UserModel = {
    tableName: 't_user',
    tableFields: [
        'id',
        'username',
        'nickname',
        'mobile',
        'email',
        'passwd',
        'avatar',
        'description',
        'role_name',
        'sex',
        'create_time',
        'update_time',
        'score'
    ]
};


var UserMsgModel = {
    tableName: 't_user_msg',
    tableFields: [
        'id',
        'owner_id',
        'owner_info',
        'msg',
        'author_id',
        'author_info',
        'create_time',
        'update_time',
        'reply_msg',
        'reply_time'
    ]
};


module.exports = {
    TopicModel: TopicModel,
    ReplyModel: ReplyModel,
    CategoryModel: CategoryModel,
    SubjectModel: SubjectModel,
    UserModel: UserModel,
    UserMsgModel: UserMsgModel
};