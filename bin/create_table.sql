create table ubibi.t_category
(
	id int auto_increment
		primary key,
	title varchar(100) null,
	author_id int null,
	author_info text null,
	create_time varchar(100) null,
	update_time varchar(100) null,
	constraint t_category_id_uindex
		unique (id)
)
;

create table ubibi.t_reply
(
	id int auto_increment
		primary key,
	topic_id int null,
	content longtext null,
	floor_num int null,
	author_id int null,
	author_info text null,
	create_time varchar(100) null,
	update_time varchar(100) null,
	like_count int default '0' null,
	constraint t_reply_id_uindex
		unique (id)
)
;

create index t_reply_topic_id_index
	on t_reply (topic_id)
;

create table ubibi.t_subject
(
	id int auto_increment
		primary key,
	title varchar(200) null,
	author_id int null,
	author_info text null,
	create_time varchar(100) null,
	update_time varchar(100) null,
	constraint t_topics_id_uindex
		unique (id)
)
;

create table ubibi.t_topic
(
	id int auto_increment
		primary key,
	topic_type int null comment '1 article 2 discuss',
	title varchar(400) null,
	description text null,
	cover_img varchar(100) null,
	content longtext null,
	author_id int null,
	author_info text null,
	subject_ids varchar(400) null,
	images text null,
	category_id int null,
	reply_count int default '0' null,
	view_count int default '0' null,
	like_count int default '0' null,
	create_time varchar(30) null,
	update_time varchar(30) null,
	constraint t_articels_id_uindex
		unique (id)
)
;

create table ubibi.t_user
(
	id int auto_increment
		primary key,
	nickname varchar(100) null,
	mobile varchar(30) null,
	email varchar(200) null,
	passwd varchar(400) null,
	avatar varchar(300) null,
	description varchar(500) null,
	role_name varchar(10) null,
	sex tinyint null,
	create_time varchar(100) null,
	score int default '0' null,
	constraint t_user_id_uindex
		unique (id),
	constraint t_user_email_uindex
		unique (email)
)
;

create table ubibi.t_user_msg
(
	id int auto_increment
		primary key,
	owner_id int null,
	owner_info int null,
	msg varchar(500) null,
	author_id int null,
	author_info text null,
	create_time varchar(30) null,
	reply_msg varchar(500) null,
	reply_time varchar(30) null,
	constraint t_user_msg_id_uindex
		unique (id)
)
;

create index t_user_msg_owner_id_index
	on t_user_msg (owner_id)
;

create index t_user_msg_author_id_index
	on t_user_msg (author_id)
;

