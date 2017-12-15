FROM library/node:4
COPY bravia /bravia

WORKDIR /bravia
RUN ["npm", "install"]
ENTRYPOINT ["node", "/bravia/http-bravia-echo.js"]
