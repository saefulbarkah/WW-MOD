'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 }),
  (exports.ModManager = void 0);
const UE = require('ue'),
  UiManager = require('../Ui/UiManager'),
  InputController_1 = require('./Helper/InputKeyController'),
  ModUtils_1 = require('./Helper/ModUtils'),
  ModLanguage_1 = require('./ModFuncs/ModLanguage'),
  UiUtil_1 = require('./Helper/UI'),
  ACTIVE_AUDIO = 'play_ui_fx_com_count_number';

class ModManager {
  static settings = {
    UID: '99999999',
    GodMode: true,
    HitMultiplier: false,
    Hitcount: 15,
    Language: 'English',
    NoCD: true,
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

  static ShowFuncStateTip(func, string) {
    string = ModLanguage_1.ModLanguage.ModTr(string);
    var info = 'Unknown';
    if (this.settings.hasOwnProperty(func)) var state = this.settings[func];
    if (state) {
      info = string + ' | ' + ModLanguage_1.ModLanguage.ModTr('TEXT_ON');
      UiUtil_1.UI.ShowTip(info);
    } else {
      info = string + ' | ' + ModLanguage_1.ModLanguage.ModTr('TEXT_OFF');
      UiUtil_1.UI.ShowTip(info);
    }
  }

  static listenModToggle(func, key, funcname) {
    if (InputController_1.InputKeyController.IsMyKeyUp(key)) {
      if (this.settings.hasOwnProperty(func)) {
        this.settings[func] = !this.settings[func];
        ModUtils_1.ModUtils.PlayAudio(ACTIVE_AUDIO);
        this.ShowFuncStateTip(func, funcname);
      }
      return true;
    }
    return false;
  }

  static ShowMenu() {}

  static ListenKey() {
    InputController_1.InputKeyController.AddToggle('GodMode', 'F5');
    InputController_1.InputKeyController.AddToggle('HitMultiplier', 'F6');
    InputController_1.InputKeyController.AddToggle('NoCD', 'F7');
    InputController_1.InputKeyController.addKey('ChangeUID', 'Equals');

    // God Mode
    this.listenModToggle('GodMode', 'F5', 'GodMode');

    // No CD
    this.listenModToggle('NoCD', 'F7', 'NoCD');

    // hit multiplier
    if (this.listenModToggle('HitMultiplier', 'F6', 'HitMultiplier')) {
      if (ModManager.settings.HitMultiplier) {
        ModUtils_1.ModUtils.KuroSingleInputBox({
          title: 'Hit Multiplier',
          customFunc: async (t) => {
            ModUtils_1.ModUtils.PlayAudio(ACTIVE_AUDIO);
            var e = ModUtils_1.ModUtils.StringToInt(t);
            if (e !== 'error') {
              ModManager.settings.Hitcount = e;
              UiUtil_1.UI.ShowTip('Hit count change to ' + e);
            }
          },
          inputText: ModManager.settings.Hitcount,
          defaultText: 'Hit Count',
          isCheckNone: true,
          needFunctionButton: false,
        });
      }
    }

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
