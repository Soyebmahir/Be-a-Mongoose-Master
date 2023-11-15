const fs = require("fs");
// read a file text

const readText = fs.readFileSync("./text/file.txt", "utf-8");
// console.log(readText);

// write file
const written = fs.writeFileSync(
  "./text/write.txt",
  readText + "Hellow Im  testing fs write system "
);
// console.log(written);

// read file async
const readTextAsync = fs.readFile("./text/file.txt", "utf-8", (err, data) => {
  if (err) {
    throw Error("Error reading Text");
  }
  //   console.log(data);
});

// write async
const asyncWrite = fs.writeFile(
  "./text/newWrite.txt",
  "Im created by Async writefile",

  (err) => {
    if (err) {
      throw Error("Error found ");
    }
  }
);
