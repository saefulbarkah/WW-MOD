'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 }),
  (exports.ModRuntime = void 0);
const puerts_1 = require('puerts'),
  ResourceSystem_1 = require('../Core/Resource/ResourceSystem'),
  GlobalData_1 = require('../Game/GlobalData'),
  ModUtils_1 = require('./Manager/Utils/ModUtils'),
  ModDebuger_1 = require('./Manager/ModFuncs/ModDebugger'),
  ModMethod_1 = require('./Manager/ModFuncs/ModMethod'),
  ModManager_1 = require('./Manager/ModManager'),
  InputSetting_1 = require('../Game/InputSettings/InputSettings'),
  EntityListener_1 = require('./EntityListener'),
  ModelManager_1 = require('./Manager/ModelManager'),
  UiUtils_1 = require('./Manager/Utils/UI'),
  ACTIVE_AUDIO = 'play_ui_fx_com_count_number',
  ESP_1 = require('./Manager/ModFuncs/ESP'),
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
    setInterval(() => {
      ESP_1.ESP.RuntimeESP();
    }, ESP_1.ESP.ESP_INTERVAL);
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
    } else {
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

  static sfxMod() {
    ModUtils_1.ModUtils.PlayAudio(ACTIVE_AUDIO);
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
    this.updateMenuState();
    this.updateWorldSpeed();
  }
  static MaungLog(string) {
    var info = string.toString();
    puerts_1.logger.info('[KUNMOD:]' + info);
  }

  static openGithub() {
    UE.KismetSystemLibrary.LaunchURL('https://github.com/saefulbarkah');
  }

  static loadMenu() {
    ModelManager_1.ModelManager.LoadingModel.SetIsLoadingView(false);
    ModelManager_1.ModelManager.LoadingModel.SetIsLoading(false);

    if (!ModManager_1.ModManager.CheckConfigExists()) {
      ModManager_1.ModManager.SaveConfig();
    } else {
      ModManager_1.ModManager.LoadConfig();
    }

    try {
      this.initMenuPlayer();
      this.initMenuWorld();
      this.initMenuESP();
      this.initMenuMisc();
      this.updateMenuState();
    } catch (error) {
      this.MaungLog(error);
    }

    this.Menu.AddToViewport();
    this.Menu.SetVisibility(2);
    UiUtils_1.UI.ShowTip('MAUNG MOD LOADED');
  }

  static initMenuESP() {
    ESP_1.ESP.ESPCanvas = UE.UMGManager.CreateWidget(
      GlobalData_1.GlobalData.World,
      ResourceSystem_1.ResourceSystem.Load('/Game/Aki/ESP.ESP_C', UE.Class)
    );

    ESP_1.ESP.ESPCanvas.AddToViewport();
    ESP_1.ESP.ESPCanvas.SetVisibility(0);

    this.Menu.ESPCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.ESP = isChecked;
      this.KunLog('ESP: ' + isChecked);
    });

    this.Menu.ESPShowNameCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.ShowName = isChecked;
      this.KunLog('ESP Show Name: ' + isChecked);
    });

    this.Menu.ESPShowDistanceCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.ShowDistance = isChecked;
      this.KunLog('ESP Show Distance: ' + isChecked);
    });

    this.Menu.ESPShowBoxCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.ShowBox = isChecked;
      this.KunLog('ESP Show Box: ' + isChecked);
    });

    this.Menu.ESPMonsterCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.ShowMonster = isChecked;
      this.KunLog('ESP Monster: ' + isChecked);
    });

    this.Menu.ESPCollectionCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.ShowCollect = isChecked;
      this.KunLog('ESP Collection: ' + isChecked);
    });

    this.Menu.ESPTreasureCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.ShowTreasure = isChecked;
      this.KunLog('ESP Treasure: ' + isChecked);
    });

    this.Menu.ESPAnimalCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.ShowAnimal = isChecked;
      this.KunLog('ESP Animal: ' + isChecked);
    });

    this.Menu.ESPPuzzleCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.ShowPuzzle = isChecked;
      this.KunLog('ESP Puzzle: ' + isChecked);
    });

    this.Menu.ESPCasketCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.ShowCasket = isChecked;
      this.KunLog('ESP Sonance Casket: ' + isChecked);
    });

    this.Menu.ESPRockCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.ShowRock = isChecked;
      this.KunLog('ESP Rock: ' + isChecked);
    });

    this.Menu.ESPMutterflyCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.ShowMutterfly = isChecked;
      this.KunLog('ESP Mutterfly: ' + isChecked);
    });

    this.Menu.ESPBlobflyCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.ShowBlobfly = isChecked;
      this.KunLog('ESP Blobfly: ' + isChecked);
    });

    this.Menu.ESPRadiusSlider.OnValueChanged.Add((value) => {
      value = value.toFixed(0);
      this.Menu.ESPRadiusValue.SetText(value);
      ModManager_1.ModManager.settings.ESPRadius = value;
      this.KunLog('ESP Radius: ' + value);
    });
  }

  static initMenuPlayer() {
    this.Menu.GodModeCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.GodMode = isChecked;
      this.sfxMod();
    });

    this.Menu.NoCDCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.NoCD = isChecked;
      this.sfxMod();
    });

    this.Menu.HitMultiplierCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.HitMultiplier = isChecked;
      this.sfxMod();
    });

    this.Menu.HitMultiplierSlider.OnValueChanged.Add((value) => {
      value = value.toFixed();
      this.Menu.HitMultiplierValue.SetText(value);
      ModManager_1.ModManager.settings.Hitcount = value;
      this.sfxMod();
    });

    this.Menu.AlwaysCritCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.AlwaysCrit = isChecked;
      this.sfxMod();
    });

    this.Menu.InfiniteStaminaCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.InfiniteStamina = isChecked;
      this.sfxMod();
    });

    // Custom Skills
    this.Menu.customSkillCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.Custom_Skills = isChecked;
      this.sfxMod();
    });
    this.Menu.CustomSkillId.SetText(
      ModManager_1.ModManager.settings.Custom_Skills_id
    );
    this.Menu.SubmitCustomSkiil.OnClicked.Add(() => {
      let value = this.Menu.CustomSkillId.GetValue();
      value = ModUtils_1.ModUtils.StringToInt(value);
      ModManager_1.ModManager.settings.Custom_Skills_id = value;
      this.sfxMod();
    });

    // Teleport
    this.Menu.QuestTpCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.QuestTp = isChecked;
      this.sfxMod();
    });
    this.Menu.MarkTpCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.MarkTp = isChecked;
      this.sfxMod();
    });
    this.Menu.PerceptionRangeCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.PerceptionRange = isChecked;
      this.sfxMod();
    });
  }

  static initMenuWorld() {
    this.Menu.WorldSpeedCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.WorldSpeed = isChecked;
      if (ModManager_1.ModManager.settings.WorldSpeed) {
        ModMethod_1.ModMethod.SetWorldTimeDilation(
          ModManager_1.ModManager.settings.WorldSpeedValue
        );
      } else {
        ModMethod_1.ModMethod.SetWorldTimeDilation(1);
      }
      this.sfxMod();
    });

    this.Menu.WorldSpeedSlider.OnValueChanged.Add((val) => {
      let value = val.toFixed();
      this.Menu.WorldSpeedValue.SetText(value);
      ModManager_1.ModManager.settings.WorldSpeedValue = value;
    });

    this.Menu.PlotCanSkipCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.PlotSkip = isChecked;
      this.sfxMod();
    });
    this.Menu.AutoAbsorbCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.AutoAbsorb = isChecked;
      this.sfxMod();
    });

    this.Menu.AutoTreasureCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.AutoPickTreasure = isChecked;
      this.sfxMod();
    });

    this.Menu.AutoLootCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.AutoLoot = isChecked;
      this.sfxMod();
    });

    this.Menu.killAuraCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.killAura = isChecked;
      this.sfxMod();
    });
    this.Menu.killAuraRadius.OnValueChanged.Add((val) => {
      val = val.toFixed();
      this.Menu.killAuraRadiusValue.SetText(val);
      ModManager_1.ModManager.settings.killAuraRadius = val;
    });

    this.Menu.MobVacuumCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.MobVacuum = isChecked;
      this.sfxMod();
    });

    this.Menu.AutoDestroyCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.AutoDestroy = isChecked;
      this.sfxMod();
    });
  }

  static initMenuMisc() {
    this.Menu.HideDamageCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.HideDmgUi = isChecked;
      this.sfxMod();
    });

    this.Menu.ShowFPSCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.ShowFPS = isChecked;
      ModMethod_1.ModMethod.ShowFPS();
      this.sfxMod();
    });
    if (ModManager_1.ModManager.settings.ShowFPS) {
      ModMethod_1.ModMethod.ShowFPS();
    }

    this.Menu.SubmitConsole.OnClicked.Add(() => {
      const Command = this.Menu.ConsoleCommandInput.GetText();
      ModDebuger_1.ModDebuger.ConsoleCommand(Command);
      this.sfxMod();
    });

    this.Menu.DebugEntityCheck.OnCheckStateChanged.Add((isChecked) => {
      ModManager_1.ModManager.settings.DebugEntity = isChecked;
      this.sfxMod();
    });

    this.Menu.mSaveConfig.OnClicked.Add(() => {
      ModManager_1.ModManager.SaveConfig();
      this.sfxMod();
    });
  }

  static updateMenuState() {
    if (this.Menu) {
      this.playerMenuState();
      this.worldMenuState();
      this.espMenuState();
      this.miscMenuState();
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
    this.Menu.InfiniteStaminaCheck.SetIsChecked(
      ModManager_1.ModManager.settings.InfiniteStamina
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
    this.Menu.QuestTpCheck.SetIsChecked(
      ModManager_1.ModManager.settings.QuestTp
    );
    this.Menu.MarkTpCheck.SetIsChecked(ModManager_1.ModManager.settings.MarkTp);
  }

  static worldMenuState() {
    this.Menu.WorldSpeedCheck.SetIsChecked(
      ModManager_1.ModManager.settings.WorldSpeed
    );
    this.Menu.WorldSpeedSlider.SetValue(
      ModManager_1.ModManager.settings.WorldSpeedValue
    );

    this.Menu.PlotCanSkipCheck.SetIsChecked(
      ModManager_1.ModManager.settings.PlotSkip
    );

    this.Menu.killAuraCheck.SetIsChecked(
      ModManager_1.ModManager.settings.killAura
    );
    this.Menu.killAuraRadius.SetValue(
      ModManager_1.ModManager.settings.killAuraRadius
    );

    this.Menu.MobVacuumCheck.SetIsChecked(
      ModManager_1.ModManager.settings.MobVacuum
    );

    this.Menu.AutoAbsorbCheck.SetIsChecked(
      ModManager_1.ModManager.settings.AutoAbsorb
    );

    this.Menu.AutoTreasureCheck.SetIsChecked(
      ModManager_1.ModManager.settings.AutoPickTreasure
    );

    this.Menu.AutoLootCheck.SetIsChecked(
      ModManager_1.ModManager.settings.AutoLoot
    );

    this.Menu.AutoDestroyCheck.SetIsChecked(
      ModManager_1.ModManager.settings.AutoDestroy
    );
  }
  static espMenuState() {
    // esp
    this.Menu.ESPCheck.SetIsChecked(ModManager_1.ModManager.settings.ESP);
    this.Menu.ESPShowNameCheck.SetIsChecked(
      ModManager_1.ModManager.settings.ShowName
    );
    this.Menu.ESPShowDistanceCheck.SetIsChecked(
      ModManager_1.ModManager.settings.ShowDistance
    );
    this.Menu.ESPShowBoxCheck.SetIsChecked(
      ModManager_1.ModManager.settings.ShowBox
    );
    this.Menu.ESPMonsterCheck.SetIsChecked(
      ModManager_1.ModManager.settings.ShowMonster
    );
    this.Menu.ESPCollectionCheck.SetIsChecked(
      ModManager_1.ModManager.settings.ShowCollect
    );
    this.Menu.ESPTreasureCheck.SetIsChecked(
      ModManager_1.ModManager.settings.ShowTreasure
    );
    this.Menu.ESPAnimalCheck.SetIsChecked(
      ModManager_1.ModManager.settings.ShowAnimal
    );
    this.Menu.ESPPuzzleCheck.SetIsChecked(
      ModManager_1.ModManager.settings.ShowPuzzle
    );
    this.Menu.ESPCasketCheck.SetIsChecked(
      ModManager_1.ModManager.settings.ShowCasket
    );
    this.Menu.ESPRockCheck.SetIsChecked(
      ModManager_1.ModManager.settings.ShowRock
    );
    this.Menu.ESPMutterflyCheck.SetIsChecked(
      ModManager_1.ModManager.settings.ShowMutterfly
    );
    this.Menu.ESPBlobflyCheck.SetIsChecked(
      ModManager_1.ModManager.settings.ShowBlobfly
    );
    this.Menu.ESPRadiusSlider.SetValue(
      ModManager_1.ModManager.settings.ESPRadius
    );
  }
  static miscMenuState() {
    this.Menu.HideDamageCheck.SetIsChecked(
      ModManager_1.ModManager.settings.HideDmgUi
    );
    this.Menu.ShowFPSCheck.SetIsChecked(
      ModManager_1.ModManager.settings.ShowFPS
    );
    this.Menu.DebugEntityCheck.SetIsChecked(
      ModManager_1.ModManager.settings.DebugEntity
    );
  }

  static updateWorldSpeed() {
    if (ModManager_1.ModManager.settings.WorldSpeed) {
      ModMethod_1.ModMethod.SetWorldTimeDilation(
        ModManager_1.ModManager.settings.WorldSpeedValue
      );
    }
  }
}
exports.ModRuntime = ModRuntime;
