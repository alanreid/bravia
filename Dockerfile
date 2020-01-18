FROM library/node:13-alpine
COPY bravia /bravia

WORKDIR /bravia
ENTRYPOINT ["node", "/bravia/http-bravia-echo.js"]
