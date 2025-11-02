FROM mongo:7

COPY ./init-mongo.js /docker-entrypoint-initdb.d/init-mongo.js
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]