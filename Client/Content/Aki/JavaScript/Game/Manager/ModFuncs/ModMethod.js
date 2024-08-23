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
  CombatMessage_1 = require('../../Module/CombatMessage/CombatMessage'),
  LevelGamePlayController_1 = require('../../LevelGamePlay/LevelGamePlayController'),
  ControllerHolder_1 = require('../../Manager/ControllerHolder');

class ModMethod {
  //怪物淹死
  static MonsterDrownRequest(entity) {
    //v1.10
    try {
      CombatMessage_1.CombatNet.Call(
        18989 /*NetDefine_1.ERequestMessageId.MonsterDrownRequest*/,
        entity,
        Protocol_1.Aki.Protocol.v4n.create()
      );
    } catch (error) {
      puerts_1.logger.error(error);
    }
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
