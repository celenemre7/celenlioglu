const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/createContent") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      // Alınan içeriği sektor.html dosyasına ekleyin
      fs.appendFile("sektor.html", body, (err) => {
        if (err) {
          console.error("Dosya yazma hatası:", err);
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("500 Internal Server Error");
          return;
        }

        console.log("İçerik başarıyla eklendi.");
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("İçerik başarıyla eklendi.");
      });
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
