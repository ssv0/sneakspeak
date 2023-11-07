# serve interface using deno, install with
# deno install --root "$DENO_INSTALL" --allow-net --allow-read https://deno.land/std@0.194.0/http/file_server.ts

file_server --no-dir-listing -p 5118 ./www &> webserver/latest_denoserver_log &
pid=$!
echo $pid > webserver/latest_denoserver.pid
