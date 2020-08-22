const http = require("http");

class KKB {
  listen(...args) {
    // 创建http服务
    const server = http.createServer((req, res) => {
      this.callback(req, res);
    });

    // 启动监听
    server.listen(...args);
  }
  use(callback) {
    this.callback = callback;
  }
}

module.exports = KKB;
