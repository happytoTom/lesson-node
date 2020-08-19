const path = require("path");
module.exports = class TestNow {
   
  getTestSource()

  /**
   * 生成测速文件名
   * @param {*} fileName 代码文件名
   */
  getTestFileName(fileName) {
    const dirName = path.dirname(fileName);
    const baseName = path.basename(fileName);
    const extName = path.extname(fileName);
    console.log(dirName,baseName,extName);
    const testName = baseName.replace(extName, `.spec${extName}`);
    return path.format({
      root: dirName + "/__test__/",
      base: testName,
    });
  }
};
