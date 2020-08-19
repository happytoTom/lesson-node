test("测速文件名生成", () => {
  const src = new (require("../index"))();
  const ret = src.getTestFileName("/abc/class.js");
  console.log("getTestName", ret);
  expect(ret).toBe("/abc/__test__/class.spec.js");
});
