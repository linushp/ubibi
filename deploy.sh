rsync -rave 'ssh -p 10087' --exclude-from=./rsync_exclude.txt --progress ./* luanhaipeng@47.74.130.99:/home/luanhaipeng/apps/ubibi/


#  deply nginx
#   rsync -rave 'ssh -p 10087' --progress ./tmp/nginx.conf root@47.74.130.99:/etc/nginx/