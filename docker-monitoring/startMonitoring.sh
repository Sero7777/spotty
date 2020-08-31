cp prometheus.yml /tmp/prometheus.yml

docker run -d \
--volume=/:/rootfs:ro \
--volume=/var/run:/var/run:ro \
--volume=/sys:/sys:ro \
--volume=/var/lib/docker/:/var/lib/docker:ro \
--volume=/dev/disk/:/dev/disk:ro \
--publish=8080:8080 \
--name=cadvisor \
google/cadvisor:latest

docker run -d --name prom -p 9090:9090 -v /tmp/prometheus.yml:/etc/prometheus/prometheus.yml  prom/prometheus

docker run -d --name prom-dashboard -p 3000:3000 grafana/grafana

docker run -d --name node-exporter -p 9100:9100 prom/node-exporter