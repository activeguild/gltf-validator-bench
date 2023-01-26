const benchmark = require("benchmark");
const suite = new benchmark.Suite();
const validator = require("gltf-validator");
const fs = require("fs");
const file = fs.readFileSync("./sample.glb");

suite
  .add("validate gltf file", {
    defer: true,
    fn: async (deferred) => {
      const result = await validator.validateBytes(new Uint8Array(file));
      deferred.resolve();
    },
  })
  .on("cycle", function (event) {
    console.log(String(event.target));
  })
  .on("complete", function () {})
  .run({ async: true });
