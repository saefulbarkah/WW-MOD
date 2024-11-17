'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 }),
  (exports.ModManager = void 0);
const UE = require('ue'),
  puerts_1 = require('puerts'),
  TeleportController_1 = require('../Module/Teleport/TeleportController'),
  InputController_1 = require('./Utils/InputKeyController'),
  ModUtils_1 = require('./Utils/ModUtils'),
  ModLanguage_1 = require('./ModFuncs/ModLanguage'),
  UiUtil_1 = require('./Utils/UI'),
  ModCustomTp_1 = require('./ModFuncs/ModCustomTp'),
  ConfigFileName = 'MaungMod.json',
  ACTIVE_AUDIO = 'play_ui_fx_com_count_number';

class ModManager {
  constructor() {
    this.key_State = false;
  }

  static ESPSettings = {
    ESP: false,
    ShowMonster: false,
    ShowBlobfly: false,
    ShowAnimal: false,
    ShowCollect: false,
    ShowTreasure: false,
    CasketDelivery: false,
    ShowCasket: false,
    ShowMutterfly: false,
    ShowRock: false,
    ShowPuzzle: false,
    DebugEntity: false,
    ShowName: false,
    ShowDistance: false,
    ShowBox: false,
    ESPRadius: 300,
  };

  static settings = {
    ...this.ESPSettings,
    UID: '99999999',
    enableBuff: true,
    GodMode: true,
    HitMultiplier: false,
    Hitcount: 15,
    Language: 'English',
    NoCD: true,
    ShowMenu: true,
    AutoPickTreasure: false,
    AutoAbsorb: false,
    AutoLoot: false,
    PerceptionRange: false,
    AutoSonanceCasket: true,
    CustomTp: false,
    HasCustomTpFile: false,
    AlwaysCrit: false,
    killAuraRadius: 50,
    Custom_Skills: 0,
    Custom_Skills_id: 300520,
    AutoDestroy: false,
    WorldSpeed: false,
    WorldSpeedValue: 1,
    ShowFPS: false,
    PlotSkip: false,
    AutoPuzzle: false,
    NoClip: false,
    killAura: false,
    InfiniteStamina: false,
    MobVacuum: false,
    HideDmgUi: false,
    MarkTp: false,
    MarkX: 0,
    MarkY: 0,
    MarkZ: 0,
    MarkTpPosZ: 300,
    QuestTp: false,
    QuestX: 0,
    QuestY: 0,
    QuestZ: 0,
    AutoTeleport: true,
  };

  static GetGameDir() {
    return UE.BlueprintPathsLibrary.ProjectDir() + 'Binaries/Win64/';
  }

  static CheckConfigExists() {
    const config = UE.BlueprintPathsLibrary.FileExists(
      this.GetGameDir() + ConfigFileName
    );
    return config;
  }

  static SaveConfig() {
    UE.KuroStaticLibrary.SaveStringToFile(
      JSON.stringify(this.settings),
      this.GetGameDir() + ConfigFileName
    );
  }

  static LoadConfig() {
    let Config = puerts_1.$ref(undefined);
    UE.KuroStaticLibrary.LoadFileToString(
      Config,
      this.GetGameDir() + ConfigFileName
    );
    puerts_1.$unref(Config);
    Config = JSON.parse(Config[0]);
    // compare current settings
    const Diff = Object.keys(ModManager.settings).filter(
      (x) => !Object.keys(Config).includes(x)
    );
    if (Diff.length > 0) {
      // add new settings
      for (const i in Diff) {
        Config[Diff[i]] = ModManager.settings[Diff[i]];
      }
    }
    this.settings = Config;
    if (!ModLanguage_1.ModLanguage.Langs.includes(this.settings.Language)) {
      this.settings.Language = 'English';
    }
    ModManager.SaveConfig();
  }

  static StartMod() {
    InputController_1.InputKeyController.addKey('ShowMenu', 'Home'),
      InputController_1.InputKeyController.AddToggle('AutoPuzzle', 'F9'),
      InputController_1.InputKeyController.AddToggle('CustomTp', 'Insert');
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
    if (func) return string + ModLanguage_1.ModLanguage.ModTr('COLOR_ON');
    else return string + ModLanguage_1.ModLanguage.ModTr('COLOR_OFF');
  }

  static ShowMenu() {
    const content =
      this.FuncState(this.settings.AutoPuzzle, 'Auto Puzzle [F9]') +
      this.FuncState(this.settings.CustomTp, 'Custom TP [Insert]');
    let formatted = this.formatLines(content, '|', 3, ' ');
    UiUtil_1.UI.ShowConfirmBox({
      id: 50,
      title: 'Maung MOD v1.2 [Home]',
      desc: formatted,
    });
  }

  static TpNoloadingTo(x, y, z) {
    TeleportController_1.TeleportController.TeleportToPositionNoLoading(
      new UE.Vector(x, y, z),
      new UE.Rotator(0, 0, 0),
      'comment/message'
    );
  }

  static TpNoloadingTo2(tppos) {
    TeleportController_1.TeleportController.TeleportToPositionNoLoading(
      tppos,
      new UE.Rotator(0, 0, 0),
      'comment/message'
    );
  }

  static ListenMod() {
    this.listenModToggle('AutoPuzzle', 'F9', 'Auto Puzzle');

    // Show Menu
    if (InputController_1.InputKeyController.IsKey('Home')) {
      this.ShowMenu();
    }

    // CustomTP
    if (this.settings.HasCustomTpFile) {
      if (this.listenModToggle('CustomTp', 'Insert', 'Custom TP')) {
        if (this.settings.CustomTp) {
          ModCustomTp_1.ModCustomTp.CustomTpEnable();
        } else {
          ModCustomTp_1.ModCustomTp.CustomTpDisable();
        }
      }
    }

    if (this.settings.CustomTp) {
      ModCustomTp_1.ModCustomTp.listenAuto();
      ModCustomTp_1.ModCustomTp.listenSelect();
      ModCustomTp_1.ModCustomTp.listenDelay();
      if (
        InputController_1.InputKeyController.listenKeyWithSound(
          'ShowTpState',
          'Delete'
        )
      ) {
        ModCustomTp_1.ModCustomTp.ShowCtpState();
      }
      if (
        InputController_1.InputKeyController.listenKeyWithSound(
          'PreviousFile',
          'PageUp'
        )
      ) {
        ModCustomTp_1.ModCustomTp.SubFile();
      }
      if (
        InputController_1.InputKeyController.listenKeyWithSound(
          'NextFile',
          'PageDown'
        )
      ) {
        ModCustomTp_1.ModCustomTp.AddFile();
      }
      if (
        InputController_1.InputKeyController.listenKeyWithSound(
          'PreviousPos',
          'Up'
        )
      ) {
        ModCustomTp_1.ModCustomTp.SubPos();
        ModCustomTp_1.ModCustomTp.GoTp();
      }
      if (
        InputController_1.InputKeyController.listenKeyWithSound(
          'NextPos',
          'Down'
        )
      ) {
        ModCustomTp_1.ModCustomTp.AddPos();
        ModCustomTp_1.ModCustomTp.GoTp();
      }
    }

    // markTp
    if (this.settings.MarkTp && ModUtils_1.ModUtils.IsInMapView()) {
      if (
        InputController_1.InputKeyController.listenKeyWithSound('MarkTp', 'T')
      ) {
        let posz = this.settings.MarkZ;
        if (posz == 0) posz = this.settings.MarkTpPosZ;

        this.TpNoloadingTo(
          this.settings.MarkX * 100,
          this.settings.MarkY * 100,
          posz * 100
        );
      }
    }
    if (
      this.settings.QuestTp &&
      InputController_1.InputKeyController.listenKeyWithSound('QuestTp', 'V')
    ) {
      if (
        this.settings.QuestX != 0 &&
        this.settings.QuestY != 0 &&
        this.settings.QuestZ != 0
      ) {
        this.TpNoloadingTo(
          this.settings.QuestX,
          this.settings.QuestY,
          this.settings.QuestZ
        );
      }
    }
  }
}

exports.ModManager = ModManager;
//# sourceMappingURL=Main.js.map
