cd ./ts/server
deno run -A server.ts &> latest_server_log &
pid=$!
echo $pid > latest_server.pid
