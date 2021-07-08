FROM library/node:13-alpine
COPY bravia /bravia

WORKDIR /bravia
RUN npm install
ENTRYPOINT ["node", "/bravia/http-bravia-echo.js"]
