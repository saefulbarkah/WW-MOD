'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 }),
  (exports.ModCustomTp = void 0);
const puerts_1 = require('puerts'),
  UE = require('ue'),
  Info_1 = require('../../../Core/Common/Info'),
  Log_1 = require('../../../Core/Common/Log'),
  ModManager_1 = require('../ModManager'),
  TeleportController_1 = require('../../Module/Teleport/TeleportController'),
  ModUtils_1 = require('../Utils/ModUtils'),
  UiController = require('../Utils/UI'),
  InputKeyController = require('../Utils/InputKeyController'),
  ModLanguage_1 = require('./ModLanguage'),
  ModTr = ModLanguage_1.ModLanguage.ModTr;

let ModTpFile = null;
let isLoaded = false;

let loadInterval = setInterval(() => {
  if (!isLoaded) {
    try {
      ModTpFile = require('./ModTpFile').ModTpFile;
      isLoaded = true;
    } catch (error) {}
  } else {
    clearInterval(loadInterval);
  }
}, 3000);

class ModCustomTp {
  static Settings = {
    CurrFile: 'None',
    PrevFile: 'None',
    NextFile: 'None',
    PrevPos: 'None',
    CurrPos: 'None',
    NextPos: 'None',
    TotalNum: 0,
    CurreNum: -1,
    TotalFileNum: 0,
    CurreFileNum: 0,
    AutoMode: false,
    Delay: 15000,
  };
  static ShowCtpState() {
    this.GetTpInfo();
    var state = ModManager_1.ModManager.settings.CustomTp;
    var title =
      ModTr('TEXT_CUSTOM_TP_STATE') +
      (state ? ModTr('TEXT_ON') : ModTr('TEXT_OFF')) +
      ModTr('TEXT_SHOW_DEL') +
      ' (' +
      (this.Settings.CurreNum + 1).toString() +
      '/' +
      (this.Settings.TotalNum + 1).toString() +
      ')' +
      this.Settings.CurrPos;

    var readme =
      ModTr('TEXT_CURR_FILE') +
      this.Settings.CurrFile +
      ModTr('TEXT_PREV_FILE') +
      this.Settings.PrevFile +
      ModTr('TEXT_NEXT_FILE') +
      this.Settings.NextFile +
      ModTr('TEXT_PREV_POS') +
      this.Settings.PrevPos +
      ModTr('TEXT_NEXT_POS') +
      this.Settings.NextPos +
      ModTr('TEXT_AUTO_MODE_END') +
      (this.Settings.AutoMode ? ModTr('TEXT_ON') : ModTr('TEXT_OFF')) +
      ModTr('TEXT_SET_DELAY_LEFT') +
      (this.Settings.Delay / 1000).toString() +
      ModTr('TEXT_SELECT_RIGHT');

    UiController.UI.ShowConfirmBox({ title: title, desc: readme, id: 50 });
  }
  static CustomTpEnable() {
    InputKeyController.InputKeyController.addKey('PreviousFile', 'PageUp');
    InputKeyController.InputKeyController.addKey('NextFile', 'PageDown');
    InputKeyController.InputKeyController.addKey('PreviousPos', 'Up');
    InputKeyController.InputKeyController.addKey('NextPos', 'Down');
    InputKeyController.InputKeyController.addKey('ShowTpState', 'Delete');
    InputKeyController.InputKeyController.AddToggle('AutoMode', 'End');
    InputKeyController.InputKeyController.addKey('SetDelay', 'Left');
    InputKeyController.InputKeyController.addKey('Select', 'Right');
    this.GetTpInfoFirst();
    this.ShowCtpState();
  }
  static CustomTpDisable() {
    InputKeyController.InputKeyController.RemoveKey('PreviousFile', 'PageUp');
    InputKeyController.InputKeyController.RemoveKey('NextFile', 'PageDown');
    InputKeyController.InputKeyController.RemoveKey('Previous', 'Up');
    InputKeyController.InputKeyController.RemoveKey('Next', 'Down');
    InputKeyController.InputKeyController.RemoveKey('ShowTpState', 'Delete');
    InputKeyController.InputKeyController.RemoveToggle('AutoMode', 'End');
    InputKeyController.InputKeyController.RemoveKey('SetDelay', 'Left');
    InputKeyController.InputKeyController.RemoveKey('Select', 'Right');
    this.Settings.CurrFile = 'None';
    this.Settings.PrevFile = 'None';
    this.Settings.NextFile = 'None';
    this.Settings.PrevPos = 'None';
    this.Settings.CurrPos = 'None';
    this.Settings.NextPos = 'None';
    this.Settings.TotalNum = 0;
    this.Settings.CurreNum = -1;
    this.Settings.TotalFileNum = 0;
    this.Settings.CurreFileNum = 0;
    this.Settings.AutoMode = false;
  }

  static GetTpInfo() {
    this.Settings.TotalNum =
      ModTpFile.CustomTpList[this.Settings.CurreFileNum].length - 1;
    this.Settings.TotalFileNum = ModTpFile.CustomTpList.length - 1;
    this.Settings.CurrFile =
      ModTpFile.CustomTpList[this.Settings.CurreFileNum][0].filename;
    try {
      this.Settings.PrevFile =
        ModTpFile.CustomTpList[this.Settings.CurreFileNum - 1][0].filename;
    } catch (error) {
      this.Settings.PrevFile = 'None';
    }

    try {
      this.Settings.NextFile =
        ModTpFile.CustomTpList[this.Settings.CurreFileNum + 1][0].filename;
    } catch (error) {
      this.Settings.NextFile = 'None';
    }
    try {
      this.Settings.CurrPos = this.GetPosInfo(
        this.Settings.CurreFileNum,
        this.Settings.CurreNum
      );
    } catch {
      this.Settings.CurrPos = 'None';
    }

    try {
      this.Settings.PrevPos = this.GetPosInfo(
        this.Settings.CurreFileNum,
        this.Settings.CurreNum - 1
      );
    } catch (error) {
      this.Settings.PrevPos = 'None';
    }

    try {
      this.Settings.NextPos = this.GetPosInfo(
        this.Settings.CurreFileNum,
        this.Settings.CurreNum + 1
      );
    } catch (error) {
      this.Settings.NextPos = 'None';
    }
  }

  static GetTpInfoFirst() {
    this.Settings.CurrFile = 'None';
    this.Settings.PrevFile = 'None';
    this.Settings.NextFile = 'None';
    this.Settings.PrevPos = 'None';
    this.Settings.CurrPos = 'None';
    this.Settings.NextPos = 'None';
    this.Settings.TotalNum = 0;
    this.Settings.CurreNum = -1;
    this.Settings.TotalFileNum = 0;
    this.Settings.CurreFileNum = 0;
    this.Settings.AutoMode = false;
    this.GetTpInfo();
  }

  static GetPosInfo(num1, num2) {
    var x = ModTpFile.CustomTpList[num1][num2].x;
    var y = ModTpFile.CustomTpList[num1][num2].y;
    var z = ModTpFile.CustomTpList[num1][num2].z;
    var PosInfo =
      '(' +
      Math.floor(x / 100).toString() +
      ',' +
      Math.floor(y / 100).toString() +
      ',' +
      Math.floor(z / 100).toString() +
      ')';
    return PosInfo;
  }

  static AddFile() {
    if (this.Settings.CurreFileNum < this.Settings.TotalFileNum) {
      this.Settings.CurreFileNum = this.Settings.CurreFileNum + 1;
      this.Settings.CurreNum = 0;
      UiController.UI.ShowTip(
        'Switch to' +
          ModTpFile.CustomTpList[this.Settings.CurreFileNum][1].filename
      );
    } else UiController.UI.ShowTip(ModTr('TEXT_IS_LAST_FILE'));

    this.Settings.CurreNum = -1;
    this.GetTpInfo();
  }
  static SubFile() {
    if (this.Settings.CurreFileNum > 0) {
      this.Settings.CurreFileNum = this.Settings.CurreFileNum - 1;
      UiController.UI.ShowTip(
        'Switch to' +
          ModTpFile.CustomTpList[this.Settings.CurreFileNum][1].filename
      );
    } else UiController.UI.ShowTip(ModTr('TEXT_IS_FIRST_FILE'));

    this.Settings.CurreNum = -1;
    this.GetTpInfo();
  }
  static AddPos() {
    if (this.Settings.CurreNum < this.Settings.TotalNum) {
      this.Settings.CurreNum++;
    } else UiController.UI.ShowTip(ModTr('TEXT_IS_LAST_POS'));
    this.GetTpInfo();
  }
  static SubPos() {
    if (this.Settings.CurreNum > 0) {
      this.Settings.CurreNum--;
    } else UiController.UI.ShowTip(ModTr('TEXT_IS_FIRST_POS'));
    this.GetTpInfo();
  }

  static GoTp() {
    var x =
      ModTpFile.CustomTpList[this.Settings.CurreFileNum][this.Settings.CurreNum]
        .x;
    var y =
      ModTpFile.CustomTpList[this.Settings.CurreFileNum][this.Settings.CurreNum]
        .y;
    var z =
      ModTpFile.CustomTpList[this.Settings.CurreFileNum][this.Settings.CurreNum]
        .z;
    var tips = this.GetPosInfo(
      this.Settings.CurreFileNum,
      this.Settings.CurreNum
    );
    UiController.UI.ShowTip(
      'go to' +
        ModTpFile.CustomTpList[this.Settings.CurreFileNum][
          this.Settings.CurreNum
        ].name +
        tips
    );
    TeleportController_1.TeleportController.TeleportToPositionNoLoading(
      new UE.Vector(x, y, z),
      new UE.Rotator(0, 0, 0),
      'comment/message'
    );
  }

  static setDelay() {
    ModUtils_1.ModUtils.KuroSingleInputBox({
      title: ModTr('TEXT_CUSTOM_TP_AUTO_MODE_SET_DELAY'),
      customFunc: async (string) => {
        var s = ModUtils_1.ModUtils.StringToInt(string);
        if (s !== 'error') this.Settings.Delay = s * 1000;
      },
      inputText: (this.Settings.Delay / 1000).toString(),
      defaultText: ModTr('TEXT_ENTER_DELAY'),
      isCheckNone: true,
      needFunctionButton: false,
    });
  }

  static async timer() {
    this.isTimerRunning = true;
    while (this.Settings.AutoMode) {
      while (ModUtils_1.ModUtils.IsTping()) {
        await ModUtils_1.ModUtils.Sleep(1000); // 等待1秒后再次检查
      }
      this.isCountdownActive = true;
      for (
        let i = this.Settings.Delay / 1000;
        i > 0 && this.isCountdownActive;
        i--
      ) {
        UiController.UI.ShowTip(
          i === 1
            ? ModTr('TEXT_GO')
            : `${ModTr('Remaining time')}: ${i} ${ModTr('TEXT_SECONDS')}`
        );
        await ModUtils_1.ModUtils.Sleep(1000);
      }
      if (!ModUtils_1.ModUtils.IsTping()) {
        this.isCountdownActive = false;
        this.AddPos();
        this.GoTp();
        if (this.Settings.TotalNum == this.Settings.CurreNum) {
          this.Settings.AutoMode = false;
        }
      }
    }
    this.isTimerRunning = false;
  }

  static listenAuto() {
    if (InputKeyController.InputKeyController.IsMyKeyUp('End')) {
      this.Settings.AutoMode = !this.Settings.AutoMode;
      var info = 'Unknown';
      var string = ModTr('TEXT_AUTO_MODE');
      if (this.Settings.AutoMode) {
        info = string + ' | ' + ModTr('TEXT_ON');
        UiController.UI.ShowTip(info);
      } else {
        info = string + ' | ' + ModTr('TEXT_OFF');
        UiController.UI.ShowTip(info);
      }

      if (!this.isTimerRunning) {
        this.timer();
      }
    }
  }

  static listenDelay() {
    if (
      InputKeyController.InputKeyController.listenKeyWithSound(
        'SetDelay',
        'Left'
      )
    ) {
      this.setDelay();
    }
  }
  static listenSelect() {
    if (
      InputKeyController.InputKeyController.listenKeyWithSound(
        'Select',
        'Right'
      )
    ) {
      this.Select();
    }
  }
  static Select() {
    ModUtils_1.ModUtils.KuroSingleInputBox({
      title: ModTr('TEXT_CUSTOM_TP_CURR_POS_SELECT'),
      customFunc: async (string) => {
        var s = ModUtils_1.ModUtils.StringToInt(string);
        if (s !== 'error') this.Settings.CurreNum = s - 1;
      },
      inputText: (this.Settings.CurreNum + 1).toString(),
      defaultText: 'TEXT_ENTER_CURR_NUM',
      isCheckNone: true,
      needFunctionButton: false,
    });
  }
}

exports.ModCustomTp = ModCustomTp;
