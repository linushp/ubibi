rm -f tpid

nohup /home/luanhaipeng/apps/ubibi/bin/node-v8.5.0-linux-x64/bin/node /home/luanhaipeng/apps/ubibi/server/ubibi_node_server.js > /home/luanhaipeng/logs/ubibi_node_server/ubibi_node_server.log 2>&1 &

echo Start Success!