'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 }),
  (exports.ModMethod = void 0);
const puerts_1 = require('puerts'),
  UE = require('ue'),
  Net_1 = require('../../../Core/Net/Net'),
  MathUtils_1 = require('../../../Core/Utils/MathUtils'),
  Protocol_1 = require('../../../Core/Define/Net/Protocol'),
  ModDebuger_1 = require('./ModDebugger'),
  GlobalData_1 = require('../../GlobalData'),
  Global_1 = require('../../Global'),
  CombatMessage_1 = require('../../Module/CombatMessage/CombatMessage'),
  TimerSystem_1 = require('../../../Core/Timer/TimerSystem'),
  ModelManager_1 = require('../ModelManager'),
  LevelGamePlayController_1 = require('../../LevelGamePlay/LevelGamePlayController'),
  ControllerHolder_1 = require('../../Manager/ControllerHolder');

class ModMethod {
  static FireDamage(cdc, t) {
    try {
      if (!cdc || !t) {
        return;
      }
      let s = Protocol_1.Aki.Protocol.U3n.create({
        Fjn: MathUtils_1.MathUtils.BigIntToLong(1205401001n),
        Wjn: 10,
        kjn: MathUtils_1.MathUtils.NumberToLong(
          t.Entity.GetComponent(0).GetCreatureDataId()
        ),
        TVn: MathUtils_1.MathUtils.NumberToLong(
          cdc.Entity.GetComponent(0).GetCreatureDataId()
        ),
        Kjn: 1,
        Qjn: 0,
        Xjn: 1,
        $jn: 0,
        jjn: -1,
        Yjn: 0,
        Njn: {
          Vjn: Protocol_1.Aki.Protocol.XAs.Proto_FromBullet,
          Mjn: MathUtils_1.MathUtils.BigIntToLong(1205401001n),
          Hjn: [],
          r5n: 1205401,
        },
        lHn: ModelManager_1.ModelManager.PlayerInfoModel.AdvanceRandomSeed(0),
      });
      CombatMessage_1.CombatNet.Call(21253, cdc.Entity, s, (e) => {
        if (e.nAs === 0) {
          s.Fjn = MathUtils_1.MathUtils.BigIntToLong(1305061001n);
          s.Njn.Mjn = MathUtils_1.MathUtils.BigIntToLong(1305061001n);
          s.Njn.r5n = 1305061;
          s.lHn =
            ModelManager_1.ModelManager.PlayerInfoModel.AdvanceRandomSeed(0);
          CombatMessage_1.CombatNet.Call(21253, cdc.Entity, s);
        }
      });
    } catch (error) {
      puerts_1.logger.error(error);
    }
  }

  //怪物淹死
  static MonsterKillRequest(Entity, retries = 0) {
    //v1.20
    if (retries > 10) {
      return false;
    }
    let cdc = Entity.GetComponent(18);
    if (!cdc) {
      setTimeout(() => {
        this.MonsterKillRequest(Entity, retries + 1);
      }, 30);
    }

    let timer = null;
    let its = 0;
    let itsLimit = 10;

    timer = TimerSystem_1.TimerSystem.Forever(() => {
      if (!cdc.Entity || its > itsLimit) {
        TimerSystem_1.TimerSystem.Remove(timer);
        return;
      }

      its++;
      this.FireDamage(
        cdc,
        Global_1.Global.BaseCharacter?.CharacterActorComponent
      );
    }, 50);
  }

  static ThrowDamageChangeRequest(Entity, count, DamageId) {
    //1.1work
    for (let i = 0; i < count; i++) {
      LevelGamePlayController_1.LevelGamePlayController.ThrowDamageChangeRequest(
        Entity.Id,
        DamageId
      ); //  1604001001n 为女主的第一次平A的 DamageId   MaingirlAttack1
    }
  }

  static AnimalDieRequest(entity) {
    //v1.1work
    ControllerHolder_1.ControllerHolder.CreatureController.AnimalDieRequest(
      entity.GetComponent(0).GetCreatureDataId(),
      entity.GetComponent(1).ActorLocationProxy
    );
    entity
      .CheckGetComponent(0)
      .SetLivingStatus(Protocol_1.Aki.Protocol.Rvs.Proto_Dead);
  }
  static AnimalDropRequest(entity) {
    let id = entity.Entity.Id;
    ControllerHolder_1.ControllerHolder.CreatureController.AnimalDropItemRequest(
      id
    );
  }

  static LandingDamageRequest(Entity) {
    let Protocol = Protocol_1.Aki.Protocol.Ezn.create();
    Protocol.rkn = MathUtils_1.MathUtils.NumberToLong(Entity.Id);
    Protocol.K7n = -4000;
    Protocol.Q7n = 66;
    Net_1.Net.Call(25622, Protocol);
  }

  static SetWorldTimeDilation(t) {
    UE.GameplayStatics.SetGlobalTimeDilation(
      GlobalData_1.GlobalData.GameInstance,
      t
    );
  }

  static ChangWeather(weatherID) {
    //1.sunny 2.Cloudy 3.Thunder 4.Snow 5.Rain
    // WeatherController_1.WeatherController.TestChangeWeather(weatherID);
  }

  static FPSUnlocker(unlock = false) {
    let setfps;
    if (unlock) {
      setfps = 't.MaxFPS 300';
    } else {
      setfps = 't.MaxFPS 60';
    }
    // ModDebuger_1.ModDebuger.ConsoleCommand(setfps);
    return;
  }

  static FreeCamera() {
    ModDebuger_1.ModDebuger.ConsoleCommand('ToggleDebugCamera');
  }

  static ShowFPS() {
    let ShowFPS = 'stat fps';
    ModDebuger_1.ModDebuger.ConsoleCommand(ShowFPS);
  }

  static ShowUnit() {
    let ShowUnit = 'stat Unit';
    ModDebuger_1.ModDebuger.ConsoleCommand(ShowUnit);
  }

  static SetFOV(value) {
    let fov = value.toString();
    ModDebuger_1.ModDebuger.ConsoleCommand('fov ' + fov);
  }
  static SetTime(hour, minute) {
    let a = hour * 60 * 60 + minute * 60;
    TimeOfDayController_1.TimeOfDayController.pIo(a);
  }
}
//puerts.logger.info(debug)
exports.ModMethod = ModMethod;
