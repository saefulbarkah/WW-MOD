'use strict';
Object.defineProperty(exports, '__esModule', {
  value: !0,
}),
  (exports.ModManager = void 0);
const puerts_1 = require('puerts'),
  ModUtils_1 = require('./ModFuncs/ModUtils'),
  InputSettings_1 = require('../InputSettings/InputSettings'),
  ModLanguage_1 = require('./ModFuncs/ModLanguage'),
  ConfirmBoxController_1 = require('../Module/ConfirmBox/ConfirmBoxController'),
  ScrollingTipsController_1 = require('../Module/ScrollingTips/ScrollingTipsController'),
  UiManager_1 = require('../../Ui/UiManager'),
  keys_State = {},
  UE = require('ue');

class ModManager {
  static Settings = {
    Language: 'English',
    GodMode: true,
    NoCD: true,
    HideDmgUi: false,
    alwasyCrit: false,
    ShowMenu: false,
    UID: '99999999',
    HitMultiplier: true,
    Hitcount: 15,
    changeUID: false,
  };

  static modStart() {
    this.AddToggle('NoCD', 'F7');
    this.AddToggle('HideDmgUi', 'F8');
    this.AddToggle('alwasyCrit', 'F9');
    this.AddToggle('GodMode', 'F10');
    this.AddKey('ShowMenu', 'Home'), this.AddToggle('changeUID', 'Equals');
    this.listenModsToggle();
  }

  static listenModsToggle() {
    this.listenMod('NoCD', 'F7', 'NoCD');
    this.listenMod('HideDmgUi', 'F8', 'HideDmgUi');
    this.listenMod('alwasyCrit', 'F9', 'alwasyCrit');
    this.listenMod('GodMode', 'F10', 'GodMode');
    if (this.listenKey('ShowMenu', 'Home')) {
      this.ShowMenu();
    }
    if (this.listenMod('changeUID', 'Equals', 'changeUID')) {
      if (this.Settings.changeUID) {
        ModUtils_1.ModUtils.KuroSingleInputBox({
          title: 'UID: ',
          customFunc: async (t) => {
            this.ChangeUid(t);
          },
          inputText: this.Settings.UID.toString(),
          defaultText: 'Change UID',
          isCheckNone: true,
          needFunctionButton: false,
        });
      }
    }
  }

  static listenMod(func, key, funcname) {
    if (this.IsMyKeyUp(key)) {
      if (this.Settings.hasOwnProperty(func)) {
        this.Settings[func] = !this.Settings[func];
        ModUtils_1.ModUtils.PlayAudio('play_ui_fx_com_count_number');
        this.ShowFuncStateTip(func, funcname);
      }
      return true;
    }
    return false;
  }

  static ShowFuncStateTip(func, string) {
    string = ModLanguage_1.ModLanguage.ModTr(string);
    var info = 'Unknown';
    if (this.Settings.hasOwnProperty(func)) var state = this.Settings[func];
    if (state) {
      info = string + ' | ' + ModLanguage_1.ModLanguage.ModTr('TEXT_ON');
      this.ShowTip(info);
    } else {
      info = string + ' | ' + ModLanguage_1.ModLanguage.ModTr('TEXT_OFF');
      this.ShowTip(info);
    }
  }

  static ShowMenu() {
    var title = '<i>[Home] By XopH</i>';
    var state =
      this.FuncState('No CD [F7]') +
      this.FuncState('Hide Damage [F8]') +
      this.FuncState('Alwasy Crit [F9]') +
      this.FuncState('God Mode [F10]') +
      'Change UID [=]';
    let formatted = this.formatLines(state, '|', 3, ' ');
    this.ShowConfirmBox(title, formatted, 50);
  }

  static ShowConfirmBox(title, string, id) {
    var newBox = new ConfirmBoxDefine_1.ConfirmBoxDataNew(id);
    newBox.SetTextArgs(string);
    newBox.SetTitle(title);
    ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(newBox);
  }

  static formatLines(str, separator = '|', itemsPerLine = 3, fillChar = '*') {
    const parts = str.split(separator).map((part) => part.trim());
    const maxLength = Math.max(...parts.map((part) => part.length));
    const fillCount = maxLength + 1; // 假设每个元素后面都有一个分隔符
    const paddingCount = Math.max(
      0,
      (fillCount * itemsPerLine - parts.length) % itemsPerLine
    );
    let formattedLines = '';
    let currentLine = '';
    for (let i = 0; i < parts.length; i++) {
      currentLine += parts[i];
      if (i < parts.length - 1 && (i + 1) % itemsPerLine !== 0) {
        currentLine += separator;
      }
      if ((i + 1) % itemsPerLine === 0 || i === parts.length - 1) {
        currentLine += fillChar.repeat(
          Math.max(
            0,
            fillCount * itemsPerLine - currentLine.length - paddingCount
          )
        );
        if (i < parts.length - 1 && paddingCount > 0) {
          currentLine += fillChar.repeat(paddingCount);
        }
        formattedLines += currentLine + '\n';
        currentLine = '';
      }
    }

    return formattedLines.trim();
  }

  static FuncState(func, string) {
    if (func) return string + ModLanguage_1.ModLanguage.ModTr('TEXT_ON');
    else return string + ModLanguage_1.ModLanguage.ModTr('TEXT_OFF');
  }

  static listenKey(desc, key) {
    var press = this.IsMyKeyUp(key);
    if (press) {
      ModUtils_1.ModUtils.PlayAudio('play_ui_fx_com_count_number');
    }
    return press;
  }

  static IsMyKeyUp(str) {
    if (!keys_State[str]) {
      keys_State[str] = { key_Down: false, key_Up: false };
    }
    var keyState = keys_State[str];
    var IsInputKeyDown_1 = InputSettings_1.InputSettings.IsInputKeyDown(str);
    if (IsInputKeyDown_1 && !keyState.key_Down) {
      keyState.key_Down = true;
      keyState.key_Up = false;
    }
    if (!IsInputKeyDown_1 && keyState.key_Down && !keyState.key_Up) {
      keyState.key_Up = true;
    }
    if (keyState.key_Down && keyState.key_Up) {
      keyState.key_Down = false;
      keyState.key_Up = false;
      return true;
    }
    return false;
  }

  static AddToggle(desc, key) {
    InputSettings_1.InputSettings.AddActionMapping(desc, key);
  }

  static AddKey(desc, key) {
    InputSettings_1.InputSettings.AddActionMapping(desc, key);
  }

  static ShowTip(string) {
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(string);
  }

  static ChangeUid(string) {
    this.Settings.UID = string;
    UiManager_1.UiManager.CloseView('UidView');
    UiManager_1.UiManager.OpenView('UidView');
    this.ShowTip('Custom_Skills_id is ' + e);
  }
}

exports.ModManager = ModManager;
