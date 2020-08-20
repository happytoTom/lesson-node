const path = require("path");
const fs = require("fs");
module.exports = class TestNow {
  genJestSource(sourcePath = path.resolve("./")) {
    const testPath = `${sourcePath}/__test__`;
    if (!fs.existsSync(testPath)) {
      fs.mkdirSync(testPath);
    }

    // 遍历代码文件
    let list = fs.readdirSync(sourcePath);
    // 添加完整路径
    list
      .map((v) => `${sourcePath}/${v}`)
      // 过滤文件
      .filter((v) => fs.statSync(v).isFile())
      // 排除测试代码
      .filter((v) => v.indexOf(".spec") === -1)
      .map((v) => this.genTestFile(v));
  }
  genTestFile(fileName) {
    console.log("fileName", fileName);
    const testFileName = this.getTestFileName(fileName);

    // 判断文件是否存在
    if (fs.existsSync(testFileName)) {
      console.log("genTestFileName", testFileName);
      return;
    }

    const mod = require(fileName);
    let source;
    if (typeof mod === "object") {
      source = Object.keys(mod)
        .map((v) => this.getTestSource(v, path.basename(fileName)))
        .join("\n");
    } else if (typeof mod == "function") {
      source = this.getTestSource(
        path.basename(fileName).replace(".js", ""),
        basename
      );
    }
    fs.writeFileSync(testFileName, source);
  }
  getTestSource(methodName, classFile, isClass = false) {
    console.log("getTestSource", methodName);
    return `
    test('${"Test " + methodName}',()=>{
      const ${isClass ? "{" + methodName + "}" : methodName} = require('${
      "../" + classFile
    }')
      let ret = ${methodName}()
      // expect(ret)
      //    .toBe('test return')
    })
    `;
  }

  /**
   * 生成测速文件名
   * @param {*} fileName 代码文件名
   */
  getTestFileName(fileName) {
    const dirName = path.dirname(fileName);
    const baseName = path.basename(fileName);
    const extName = path.extname(fileName);
    console.log(dirName, baseName, extName);
    const testName = baseName.replace(extName, `.spec${extName}`);
    return path.format({
      root: dirName + "/__test__/",
      base: testName,
    });
  }
};
