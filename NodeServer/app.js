// import the modules
const http = require("http");
const path = require("path");
const fs = require("fs");

// declare the PORT
const PORT = 5000;

// create the server
// (req,res)=>{} will be called whenver there
// is a client request for server
const app = http.createServer((req, res) => {
  console.log("request url is ", req.url);
  console.log("request method is", req.method);
  if (req.url == "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("This text is from backend app");
  } else if (req.url == "/api/user") {
    res.writeHead(200, { "Content-Type": "application/json" });
    // create a js object to return
    const user = {
      name: "Sudeep",
      gender: "Male",
    };
    // convert javascript object to JSON
    res.end(JSON.stringify(user));
  } else if (req.url == "/api/image") {
    // created the path for the given image
    const imagePath = path.join(__dirname, "statuscodes.png");
    console.log(imagePath);
    // fs module to read the image file and convert it into data
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Image not found");
      } else {
        res.writeHead(200, { "Content-Type": "image/png" });
        res.end(data);
      }
    });
  } else if (req.url == "/api/html") {
    const htmlPath = path.join(__dirname, "contact.html");
    fs.readFile(htmlPath, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("HTML file not found");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
});

// start the server
app.listen(PORT, () => {
  console.log(`Server listening on the port ${PORT}`);
});
