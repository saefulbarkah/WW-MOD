'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 }),
  (exports.ModUtils = void 0);
const puerts_1 = require('puerts'),
  UE = require('ue'),
  LguiUtil_1 = require('../../Module/Util/LguiUtil'),
  AudioSystem_1 = require('../../../Core/Audio/AudioSystem'),
  UiManager_1 = require('../../../Ui/UiManager');

class ModUtils {
  static PlayAudio(string) {
    AudioSystem_1.AudioSystem.PostEvent(string);
  }

  //Kuro SingleInputBox
  static KuroSingleInputBox(options) {
    UiManager_1.UiManager.OpenView('CommonSingleInputView', {
      Title: options.title,
      CustomFunc: options.customFunc,
      InputText: options.inputText,
      DefaultText: options.defaultText,
      IsCheckNone: options.isCheckNone,
      NeedFunctionButton: options.needFunctionButton,
    });
  }
}
//puerts.logger.info(debug)
exports.ModUtils = ModUtils;
//exports.PaintContext = PaintContext;
