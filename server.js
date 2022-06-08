const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./data/db.json");
const middleWare = jsonServer.defaults({
    static:"./build"
})

const port = 8000;

server.use(middleWare);
server.use(
    jsonServer.rewriter({
        "/https://conceptcall.herokuapp.com/*":"/$1",
    })
);

server.use(router);
server.listen(port,console.log(`
server is running on ${port}`))