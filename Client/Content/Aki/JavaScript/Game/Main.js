'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 }),
  (exports.ModRuntime = void 0);
const puerts_1 = require('puerts'),
  GameProcedure_1 = require('./GameProcedure');

async function main() {
  const Load = require('./ModRuntime');
  new Load.ModRuntime();
  var e = puerts_1.argv.getByName('GameInstance');
  GameProcedure_1.GameProcedure.Start(e);
}
main();
//# sourceMappingURL=Main.js.map
