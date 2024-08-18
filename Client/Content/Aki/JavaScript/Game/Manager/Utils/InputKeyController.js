'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 }),
  (exports.InputKeyController = void 0);
const UE = require('ue'),
  keys_State = {},
  InputSetting_1 = require('../../InputSettings/InputSettings');

class InputKeyController {
  static keyState = false;

  static IsKey(str) {
    var IsInputKeyDown_1 = InputSetting_1.InputSettings.IsInputKeyDown(str);
    // var IsAltKeyDown_1 = InputSetting_1.InputSettings.IsInputKeyDown('LeftAlt');
    // if (IsAltKeyDown_1 && IsInputKeyDown_1 && !this.keyState) {
    if (IsInputKeyDown_1 && !this.keyState) {
      IsInputKeyDown_1 = false;
      // IsAltKeyDown_1 = false;
      this.keyState = true;
      return true;
    }
    if (!IsInputKeyDown_1) {
      this.keyState = false;
      return false;
    }
    return false;
  }

  static addKey(desc, key) {
    InputSetting_1.InputSettings.AddActionMapping(desc, key);
  }

  static IsMyKeyUp(str) {
    if (!keys_State[str]) {
      keys_State[str] = { key_Down: false, key_Up: false };
    }
    var keyState = keys_State[str];
    var IsInputKeyDown_1 = InputSetting_1.InputSettings.IsInputKeyDown(str);
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
    InputSetting_1.InputSettings.AddActionMapping(desc, key);
  }
}

exports.InputKeyController = InputKeyController;
