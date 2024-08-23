'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 }),
  (exports.ModRuntime = void 0);
const puerts_1 = require('puerts'),
  ResourceSystem_1 = require('../Core/Resource/ResourceSystem'),
  GlobalData_1 = require('../Game/GlobalData'),
  ModUtils_1 = require('./Manager/Utils/ModUtils'),
  ModManager_1 = require('./Manager/ModManager'),
  InputSetting_1 = require('../Game/InputSettings/InputSettings'),
  EntityListener_1 = require('./EntityListener'),
  ModelManager_1 = require('./Manager/ModelManager'),
  UiUtils_1 = require('./Manager/Utils/UI'),
  UE = require('ue');

class ModRuntime {
  constructor() {
    this.StartMod();
  }

  StartMod() {
    ModRuntime.loadMenuInterval = setInterval(() => {
      ModRuntime.Start();
    }, 4000);
    setInterval(() => {
      ModRuntime.ListenKey();
    }, 1);
    setInterval(() => {
      EntityListener_1.EntityListener.Runtime();
    }, 2000);
    setInterval(() => {
      EntityListener_1.EntityListener.FasterRuntime();
    }, 100);
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
      this.loadMenu();
      UiUtils_1.UI.ShowTip('MAUNG MOD LOADED');
      puerts_1.logger.info('[MAUNG-MOD: Working!!!]');
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
    this.state;
  }

  static openGithub() {
    UE.KismetSystemLibrary.LaunchURL('https://github.com/saefulbarkah');
  }

  static loadMenu() {
    ModelManager_1.ModelManager.LoadingModel.SetIsLoadingView(false);
    ModelManager_1.ModelManager.LoadingModel.SetIsLoading(false);
    this.Menu.AddToViewport();
    this.Menu.SetVisibility(2);

    // Init mod menu
    this.initMenuPlayer();
    this.updateMenuState();
  }

  static initMenuPlayer() {
    this.Menu.GodModeCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.GodMode = isChecked;
    });

    this.Menu.NoCDCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.NoCD = isChecked;
    });

    this.Menu.HitMultiplierCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.HitMultiplier = isChecked;
    });

    this.Menu.HitMultiplierSlider.OnValueChanged.Add((value) => {
      value = value.toFixed();
      this.Menu.HitMultiplierValue.SetText(value);
      ModManager_1.ModManager.settings.Hitcount = value;
    });

    this.Menu.AlwaysCritCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.AlwaysCrit = isChecked;
    });

    this.Menu.InfiniteStaminaCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.InfiniteStamina = isChecked;
    });

    this.Menu.customSkillCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.Custom_Skills = isChecked;
    });

    // Custom Skills
    this.Menu.customSkillCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.Custom_Skills = isChecked;
    });
    this.Menu.CustomSkillId.SetText(
      ModManager_1.ModManager.settings.Custom_Skills_id
    );
    this.Menu.SubmitCustomSkiil.OnClicked.Add(() => {
      let value = this.Menu.CustomSkillId.GetValue();
      value = ModUtils_1.ModUtils.StringToInt(value);
      if (value === 'error') return;
      ModManager_1.ModManager.settings.Custom_Skills_id = value;
    });

    // Teleport
    this.Menu.QuestTpCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.QuestTp = isChecked;
    });
    this.Menu.MarkTpCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.MarkTp = isChecked;
    });
  }

  static updateMenuState() {
    if (this.Menu) {
      this.playerMenuState();
      this.worldMenuState();
    }
  }

  static playerMenuState() {
    this.Menu.GodModeCheck.SetIsChecked(
      ModManager_1.ModManager.settings.GodMode
    );
    this.Menu.NoCDCheck.SetIsChecked(ModManager_1.ModManager.settings.NoCD);
    this.Menu.HitMultiplierCheck.SetIsChecked(
      ModManager_1.ModManager.settings.HitMultiplier
    );
    this.Menu.AlwaysCritCheck.SetIsChecked(
      ModManager_1.ModManager.settings.AlwaysCrit
    );
    this.Menu.AlwaysCritCheck.SetIsChecked(
      ModManager_1.ModManager.settings.AlwaysCrit
    );
    this.Menu.InfiniteStaminaCheck.SetIsChecked(
      ModManager_1.ModManager.settings.InfiniteStamina
    );
    this.Menu.customSkillCheck.SetIsChecked(
      ModManager_1.ModManager.settings.Custom_Skills
    );
    this.Menu.HitMultiplierSlider.SetValue(
      ModManager_1.ModManager.settings.Hitcount
    );
    this.Menu.customSkillCheck.SetIsChecked(
      ModManager_1.ModManager.settings.Custom_Skills
    );
    this.Menu.CustomSkillId.SetText(
      ModManager_1.ModManager.settings.Custom_Skills_id
    );
    this.Menu.questTpCheck.SetIsChecked(
      ModManager_1.ModManager.settings.QuestTp
    );
    this.Menu.markTpCheck.SetIsChecked(ModManager_1.ModManager.settings.MarkTp);
  }
  static worldMenuState() {}
}
exports.ModRuntime = ModRuntime;
