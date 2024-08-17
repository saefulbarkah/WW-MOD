'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 }),
  (exports.ModManager = void 0);
const UE = require('ue'),
  UiManager = require('../Ui/UiManager'),
  InputController_1 = require('./Helper/InputKeyController'),
  ModUtils_1 = require('./Helper/ModUtils'),
  ACTIVE_AUDIO = 'play_ui_fx_com_count_number';

class ModManager {
  static settings = {
    UID: '99999999',
  };

  static StartMod() {
    setInterval(() => {
      ModManager.ListenKey();
    }, 15);
  }

  static changeUID(str) {
    ModManager.settings.UID = str;
    UiManager.UiManager.CloseView('UidView');
    UiManager.UiManager.OpenView('UidView');
  }

  static ListenKey() {
    InputController_1.InputKeyController.addKey('ChangeUID', 'Equals');

    // Change UID
    if (InputController_1.InputKeyController.IsKey('Equals')) {
      ModUtils_1.ModUtils.PlayAudio(ACTIVE_AUDIO);
      ModUtils_1.ModUtils.KuroSingleInputBox({
        title: 'Change UID:',
        customFunc: async (e) => {
          ModManager.changeUID(e);
        },
        inputText: ModManager.settings.UID,
        defaultText: ModManager.settings.UID,
        isCheckNone: true,
        needFunctionButton: false,
      });
    }
  }
}

exports.ModManager = ModManager;
//# sourceMappingURL=Main.js.map
