const { callback } = require("../serial/index");

// test("callback", (done) => {
//   callback();
//   // jest本身不支持异步调用,所以callback没有完成之后用例就已经执行完成了
//   setTimeout(done, 1000);
// });

// test("generator", (done) => {
//   const { generator } = require("../serial/index");
//   generator();
//   setTimeout(done, 1000);
// });
// test("promise", (done) => {
//   const { promise } = require("../serial/index");
//   promise();
//   // jest本身不支持异步调用,所以callback没有完成之后用例就已经执行完成了
//   setTimeout(done, 1000);
// });

// test("asyncAwait", (done) => {
//   const { asyncAwait } = require("../serial/index");
//   asyncAwait();
//   setTimeout(done, 1000);
// });

test("event", (done) => {
  const { event } = require("../serial/index");
  event();
  setTimeout(done, 1000);
});
