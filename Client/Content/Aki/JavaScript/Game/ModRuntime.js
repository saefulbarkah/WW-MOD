Object.defineProperty(exports, '__esModule', { value: !0 }),
  (exports.ModRuntime = void 0);
const UE = require('ue'),
  puerts_1 = require('puerts'),
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
    ModRuntime.loadMenuInterval = setInterval(() => {
      ModRuntime.InitialLoad();
    }, 3000);
    setInterval(() => {
      ModRuntime.waitTpFile();
    }, 1);
    setInterval(() => {
      ModRuntime.FasterRuntime();
    }, 100);
  }

  static loadMenuInterval = null;
  static InitialLoad() {
    Ui.UI.ShowConfirmBox({
      id: 50,
      title: 'WUWA MOD 1.2',
      desc: '<color=red> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, accusantium? </color>',
      closeFunc: () => {
        clearInterval(this.loadMenuInterval);
      },
    });
    puerts_1.logger.info('[WW-MOD]: Loaded!!');
  }

  static waitTpFile() {
    try {
      require('./Manager/ModFuncs/ModTpFile');
      ModManager_1.ModManager.settings.HasCustomTpFile = true;
    } catch (error) {
      ModManager_1.ModManager.settings.HasCustomTpFile = false;
    }
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
