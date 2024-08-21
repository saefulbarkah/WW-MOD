'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 }),
  (exports.ModRuntime = void 0);
const puerts_1 = require('puerts'),
  ResourceSystem_1 = require('../Core/Resource/ResourceSystem'),
  GlobalData_1 = require('../Game/GlobalData'),
  ModUtils_1 = require('./ModMenu/ModUtils'),
  ModManager_1 = require('./Manager/ModManager'),
  InputSetting_1 = require('../Game/InputSettings/InputSettings'),
  ModelManager_1 = require('./Manager/ModelManager'),
  UE = require('ue');

class ModRuntime {
  constructor() {
    this.StartMod();
  }

  StartMod() {
    ModRuntime.loadMenuInterval = setInterval(() => {
      ModRuntime.Start();
    }, 3000);
    setInterval(() => {
      ModRuntime.ListenKey();
    }, 1);
  }

  static keyState = false;
  static loadMenuInterval = null;
  static Menu = null;
  static isMenuShow = false;

  static async Start() {
    this.Menu = UE.UMGManager.CreateWidget(
      GlobalData_1.GlobalData.World,
      ResourceSystem_1.ResourceSystem.Load(
        '/Game/Aki/ModMenu.ModMenu_C',
        UE.Class
      )
    );

    if (this.Menu) {
      clearInterval(this.loadMenuInterval);
      puerts_1.logger.info('[MAUNG-MOD: Working!!!]');
      this.openGithub();
      this.initModMenu();
      return;
    } else {
      isMenuError = true;
      puerts_1.logger.error({
        type: 'Failed load UI',
        msg: 'Failed to create widget. Ensure the asset path and class are correct.',
      });
      return;
    }
  }

  static IsKey(str) {
    var IsInputKeyDown_1 = InputSetting_1.InputSettings.IsInputKeyDown(str);
    var IsInputKeyDown_LeftControl =
      InputSetting_1.InputSettings.IsInputKeyDown('LeftAlt');
    if (IsInputKeyDown_LeftControl && IsInputKeyDown_1 && !this.keyState) {
      IsInputKeyDown_1 = false;
      IsInputKeyDown_LeftControl = false;
      this.keyState = true;
      return true;
    }
    if (IsInputKeyDown_1 === false) {
      this.keyState = false;
      return false;
    }
    return false;
  }

  static ListenKey() {
    try {
      require('./Manager/ModFuncs/ModTpFile');
      ModManager_1.ModManager.settings.HasCustomTpFile = true;
    } catch (error) {
      ModManager_1.ModManager.settings.HasCustomTpFile = false;
    }

    ModManager_1.ModManager.ListenMod();
    InputSetting_1.InputSettings.AddActionMapping('Hold', 'LeftAlt');
    InputSetting_1.InputSettings.AddActionMapping('X', 'X');

    if (this.IsKey('X')) {
      if (this.isMenuShow) {
        ModelManager_1.ModelManager.LoadingModel.SetIsLoadingView(false);
        ModelManager_1.ModelManager.LoadingModel.SetIsLoading(false);
        this.Menu.SetVisibility(2);
      } else {
        ModelManager_1.ModelManager.LoadingModel.SetIsLoadingView(true);
        ModelManager_1.ModelManager.LoadingModel.SetIsLoading(true);
        this.Menu.SetVisibility(0);
      }
      this.isMenuShow = !this.isMenuShow;
    }
    // this.updateMenuState();
  }

  static openGithub() {
    UE.KismetSystemLibrary.LaunchURL('https://github.com/saefulbarkah');
  }

  static initModMenu() {
    ModelManager_1.ModelManager.LoadingModel.SetIsLoadingView(false);
    ModelManager_1.ModelManager.LoadingModel.SetIsLoading(false);
    this.Menu.AddToViewport();
    this.Menu.SetVisibility(2);

    ModUtils_1.ModUtils.addStateChangeHandler(
      ModRuntime.Menu.GodModeCheck,
      'GodMode'
    );
    ModUtils_1.ModUtils.addStateChangeHandler(
      ModRuntime.Menu.NoCDCheck,
      'NoCD'
    );
  }
}
exports.ModRuntime = ModRuntime;
