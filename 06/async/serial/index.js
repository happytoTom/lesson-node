const logTime = (name) => {
  console.log(`Log...${name}` + new Date().toLocaleDateString());
};

exports.callback = () => {
  //console.log("callback");
  setTimeout(() => {
    logTime("callback1 ");
    setTimeout(() => {
      logTime("callback2 ");
    }, 100);
  }, 100);
};

const promise = (name, delay = 100) =>
  new Promise((resolve) => {
    setTimeout(() => {
      logTime(name);
      resolve();
    }, delay);
  });

exports.promise = () => {
  promise("Promise1").then(promise("Promise 2")).then(promise("Promise3"));
};

exports.generator = () => {
  const generator = function* (name) {
    yield promise("promise 1", 100);
    yield promise("promise 2", 100);
    yield promise("promise 3", 100);
  };
  let co = (generator) => {
    if ((it = generator.next().value)) {
      it.then((res) => {
        co(generator);
      });
    } else {
      return;
    }
  };
  co(generator("Co-generator"));
};

exports.asyncAwait = async () => {
  await promise("Async Await 1");
  await promise("Async Await 2");
  await promise("Async Await 3");
  await promise("Async Await 4");
};

exports.event = async () => {
  const asyncFunc = (name) => (event) => {
    setTimeout(() => {
      logTime(name);
      event.emit("end");
    }, 100);
    return event;
  };

  const ary = [
    asyncFunc("event 1"),
    asyncFunc("event 2"),
    asyncFunc("event 3"),
  ];

  const { EventEmitter } = require("events");
  const event = new EventEmitter();
  let i = 0;
  event.on("end", () => {
    i < ary.length && ary[i++](event);
  });
  event.emit("end");
};
