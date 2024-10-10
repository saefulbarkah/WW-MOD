'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 }),
  (exports.MainMenu = void 0);
const puerts_1 = require('puerts'),
  GameProcedure_1 = require('./GameProcedure');

async function main() {
  const ModRuntime = require('./ModRuntime.js');
  new ModRuntime.ModRuntime();
  GameProcedure_1.GameProcedure.Start(puerts_1.argv.getByName('GameInstance'));
}
main();
//# sourceMappingURL=Main.js.map
