'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 }),
  (exports.ModUtils = void 0);
const puerts_1 = require('puerts'),
  UE = require('ue'),
  LguiUtil_1 = require('../../Module/Util/LguiUtil'),
  UIUtil_1 = require('./UI'),
  TimerSystem_1 = require('../../../Core/Timer/TimerSystem'),
  ModelManager_1 = require('../ModelManager'),
  LoginDefine_1 = require('../../Module/Login/Data/LoginDefine'),
  EntityManager_1 = require('../ModFuncs/EntityManager'),
  AudioSystem_1 = require('../../../Core/Audio/AudioSystem'),
  UiManager_1 = require('../../../Ui/UiManager');

class ModUtils {
  static isInGame() {
    let state = ModelManager_1.ModelManager.LoginModel.IsLoginStatus(
      LoginDefine_1.ELoginStatus.EnterGameRet
    );
    return state;
  }

  static IsInMapView() {
    return UiManager_1.UiManager.IsViewShow('WorldMapView');
  }

  static Getdistance2Player(pos1) {
    let pos2 = EntityManager_1.EntityManager.GetPlayerPos();
    let dis = UE.KismetMathLibrary.Vector_Distance(pos1, pos2);
    return dis;
  }

  static Getdistance2Player(pos1) {
    let pos2 = EntityManager_1.EntityManager.GetPlayerPos();
    let dis = UE.KismetMathLibrary.Vector_Distance(pos1, pos2);
    return dis;
  }

  static IsTping() {
    return ModelManager_1.ModelManager.TeleportModel.IsTeleport;
  }

  static async Sleep(time) {
    await TimerSystem_1.TimerSystem.Wait(time);
  }

  static PlayAudio(string) {
    AudioSystem_1.AudioSystem.PostEvent(string);
  }

  static StringToInt(str) {
    var num = parseInt(str);
    if (isNaN(num)) {
      UIUtil_1.UI.ShowTip('str is not int');
      return 'error';
    } else {
      return num;
    }
  }

  static KunLog(string) {
    var info = string.toString();
    puerts_1.logger.info('[KUNMOD:]' + info);
  }

  //Kuro SingleInputBox
  static KuroSingleInputBox({
    title,
    customFunc,
    inputText,
    defaultText,
    isCheckNone,
    needFunctionButton,
  }) {
    UiManager_1.UiManager.OpenView('CommonSingleInputView', {
      Title: title,
      CustomFunc: customFunc,
      InputText: inputText,
      DefaultText: defaultText,
      IsCheckNone: isCheckNone,
      NeedFunctionButton: needFunctionButton,
    });
  }
}
//puerts.logger.info(debug)
exports.ModUtils = ModUtils;
//exports.PaintContext = PaintContext;
