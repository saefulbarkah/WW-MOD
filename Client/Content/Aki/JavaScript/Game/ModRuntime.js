Object.defineProperty(exports, '__esModule', { value: !0 }),
  (exports.ModRuntime = void 0);
const UE = require('ue'),
  ModManager_1 = require('./Manager/ModManager'),
  PerceptionRange_1 = require('./Manager/ModFuncs/PerceptionRange.js'),
  ModelManager_1 = require('./Manager/ModelManager'),
  Ui = require('./Manager/Utils/UI.js'),
  ModUtils_1 = require('./Manager/Utils/ModUtils');

class ModRuntime {
  constructor() {
    this.ModStart();
  }

  ModStart() {
    setInterval(() => {
      ModRuntime.FasterRuntime();
    }, 100);
  }

  static FasterRuntime() {
    if (!ModUtils_1.ModUtils.isInGame()) return;

    const entitylist =
      ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
    const count = entitylist.length;
    for (let i = 0; i < count; i++) {
      if (ModManager_1.ModManager.settings.PerceptionRange) {
        PerceptionRange_1.PerceptionRange.SetAll(entitylist[i]);
      }
      if (ModManager_1.ModManager.settings.AutoPickTreasure) {
        PerceptionRange_1.PerceptionRange.SetTreasure(entitylist[i]);
      }
      // if (ModManager_1.ModManager.settings.AutoTeleport) {
      //   PerceptionRange_1.PerceptionRange.SetTeleport(entitylist[i]);
      // }
      if (ModManager_1.ModManager.settings.AutoLoot) {
        PerceptionRange_1.PerceptionRange.SetCollection(entitylist[i]);
      }
      if (ModManager_1.ModManager.settings.AutoAbsorbnew) {
        PerceptionRange_1.PerceptionRange.SetVision(entitylist[i]);
      }
      if (ModManager_1.ModManager.settings.AutoSonanceCasket) {
        PerceptionRange_1.PerceptionRange.SetSonanceCasket(entitylist[i]);
      }
    }
  }
}

exports.ModRuntime = ModRuntime;
