'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 }),
  (exports.Menu = void 0);
const puerts_1 = require('puerts'),
  ModManager_1 = require('../Manager/ModManager'),
  UE = require('ue');

class ModUtils {
  static addStateChangeHandler(checkBox, settingKey) {
    checkBox.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings[settingKey] = isChecked;
      puerts_1.logger.info(`${settingKey} set to: ${isChecked}`);
    });
  }
}

exports.ModUtils = ModUtils;
