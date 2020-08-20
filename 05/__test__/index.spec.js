const fs = require("fs");

test("集成测试,测试生成测试代码文件", () => {
  // 准备环境
  // 删除测试文件夹
  fs.rmdirSync(__dirname + "/data/__test__", {
    recursive: true, // 递归删除字文件夹
  });
  const src = new (require("../index"))();
  src.genJestSource(__dirname + "/data");
});
