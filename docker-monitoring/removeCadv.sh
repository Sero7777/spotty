docker container rm -f prom prom-dashboard node-exporter cadvisor

docker image rm prom/prometheus grafana/grafana prom/node-exporter google/cadvisor