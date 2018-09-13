FROM busybox

VOLUME [ "/data/mongo", "/data/redis", "/data/neo4j", "/data/nginx" ]

# ENTRYPOINT [ "sh", "$(sleep", "infinity)" ]