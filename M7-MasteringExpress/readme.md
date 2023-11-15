# Node.js

### As an asynchronous event-driven JavaScript runtime, Node.js is designed to build scalable network applications. In the following "hello world" example, many connections can be handled concurrently. Upon each connection, the callback is fired, but if there is no work to be done, Node.js will sleep.

# How does node JS work on server?

### It is used as backend service where javascript works on the server-side of the application. This way javascript is used on both frontend and backend. Node. js runs on chrome v8 engine which converts javascript code into machine code, it is highly scalable, lightweight, fast, and data-intensive.

# Dependencies of Node js

## V8 Engine & Libuv

### Node js run time based on v8 Engine which is written with c++ and js. Without v8 node js never understand js code.

### Since V8 lacks its own event loop, when an asynchronous function is encountered, it is not directly executed on the call stack. Instead, V8 forwards the function to either the libuv API or Chrome's internal event loop, depending on where the script is executed.

# file System

```js
//requiure file system
const fs = require("fs");

// read a file text
//syntax : fs.readFileSync("path", "encoding option");
const text = fs.readFileSync("./file.txt", "utf-8");
console.log(text);
```
