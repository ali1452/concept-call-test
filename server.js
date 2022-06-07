const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./data/db.json");
const middleWare = jsonServer.defaults({
    static:"./build"
})

const port = process.env.PORT || 8000;
server.use(middleWare);
server.use(
    jsonServer.rewriter({
        "/http://localhost:8000/projects/*":"/$1",
    })
);

server.use(router);
server.listen(port,console.log(`
server is running on ${port}`))