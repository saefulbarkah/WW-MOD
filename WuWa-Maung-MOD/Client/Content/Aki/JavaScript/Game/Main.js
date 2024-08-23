'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 }),
  (exports.MainMenu = void 0);
const puerts_1 = require('puerts'),
  GameProcedure_1 = require('./GameProcedure');

async function main() {
  // const Load = require('./ModMenu.js');
  // new Load.MainMenu();
  const ModRuntime = require('./ModRuntime.js');
  new ModRuntime.ModRuntime();
  var e = puerts_1.argv.getByName('GameInstance');
  GameProcedure_1.GameProcedure.Start(e);
}
main();
//# sourceMappingURL=Main.js.map
