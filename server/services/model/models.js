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



module.exports = {
    TopicModel: TopicModel
};