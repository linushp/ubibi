rm -f tpid

nohup node ../server/ubibi_node_server.js > /root/logs/ubibi_node_server/ubibi_node_server.log 2>&1 &

echo Start Success!