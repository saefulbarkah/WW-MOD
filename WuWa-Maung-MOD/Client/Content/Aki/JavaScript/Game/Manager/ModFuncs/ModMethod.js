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
  Transform_1 = require('../../../Core/Utils/Math/Transform'),
  BulletConfig_1 = require('../../NewWorld/Bullet/BulletConfig'),
  ConfigManager_1 = require('../../Manager/ConfigManager'),
  EntityManager_1 = require('./EntityManager'),
  ModManager_1 = require('../ModManager'),
  ModelManager_1 = require('../ModelManager'),
  LevelGamePlayController_1 = require('../../LevelGamePlay/LevelGamePlayController'),
  ControllerHolder_1 = require('../../Manager/ControllerHolder');

class ModMethod {
  static best = {};
  static DamageId = {
    HavocRover: 1604007004n,
    FusionChangli: 1205401001n,
    IceSanua: 1102030002n,
    WindDamage: 800100005035n,
  };

  static GenerateBest() {
    const damageBlacklist = ['110360200', '110360210', '110360310'];
    BulletConfig_1.BulletConfig.N9o.forEach((firstValue, PID, map) => {
      if (!this.best[PID]) {
        let bestDmg = null;
        let quietDmg = null;
        let highest = 0;
        let BulletDataMap =
          BulletConfig_1.BulletConfig.O9o.get(firstValue).BulletDataMap;
        BulletDataMap.forEach((value, key, map) => {
          try {
            if (value.Base.DamageId > 1) {
              let dam =
                ConfigManager_1.ConfigManager.RoleConfig.GetDamageConfig(
                  value.Base.DamageId
                );

              if (!value.Base.EnablePartHitAudio) {
                quietDmg = {
                  key: key,
                  BaseDamageId: BigInt(value.Base.DamageId),
                };
              }

              let rateLv = dam.RateLv;
              if (rateLv) {
                let maxRate = rateLv[rateLv.length - 1];
                if (maxRate > highest && !damageBlacklist.includes(key)) {
                  highest = maxRate;
                  bestDmg = {
                    key: key,
                    BaseDamageId: BigInt(value.Base.DamageId),
                  };
                  if (!quietDmg) {
                    quietDmg = {
                      key: key,
                      BaseDamageId: BigInt(value.Base.DamageId),
                    };
                  }
                }
              }
            }
          } catch {}
        });
        if (bestDmg && quietDmg) {
          this.best[PID] = [quietDmg, bestDmg];
        }
      }
    });
  }

  static SpawnBullet(InitialTransform) {
    InitialTransform =
      InitialTransform || Transform_1.Transform.Create().ToUeTransform();
    let PlayerActor = EntityManager_1.EntityManager.GetPlayerActor();
    if (!PlayerActor) {
      return null;
    }
    const PID = EntityManager_1.EntityManager.GetPlayerEntity().Id;
    if (!this.best[PID]) {
      this.GenerateBest();
      return;
    }

    let transformLoc = InitialTransform.GetLocation();
    let bul = ModelManager_1.ModelManager.BulletModel.CreateBullet(
      EntityManager_1.EntityManager.GetPlayerEntity(),
      this.best[PID][0].key.toString(),
      InitialTransform,
      transformLoc
    );
    if (!bul) {
      return;
    }
    bul.GetBulletInfo().ActorComponent.SetActorLocation(transformLoc);
    return bul;
  }

  //怪物淹死
  static MonsterKillRequest(Entity) {
    let timer = null;
    let its = 0;
    let itsLimit = 10;

    if (
      !Entity.GetComponent(3) &&
      Entity.GetComponent(18) &&
      Entity.GetComponent(33) &&
      Entity.GetComponent(60)
    ) {
      return;
    }
    const entityPos = Entity.GetComponent(3).ActorLocationProxy;
    const CharacterPartComponent = Entity.GetComponent(60);
    const CharacterDamageComponent = Entity.GetComponent(18);
    const PID = EntityManager_1.EntityManager.GetPlayerEntity().Id;
    timer = setInterval(() => {
      if (!CharacterDamageComponent.Entity || its > itsLimit) {
        clearInterval(timer);
        return;
      }

      its++;
      if (CharacterDamageComponent && Entity.GetComponent(33) && entityPos) {
        if (!CharacterPartComponent) {
          clearInterval(timer);
          return;
        }
        CharacterPartComponent.OnInitData();
        CharacterPartComponent.OnInit();
        CharacterPartComponent.OnActivate();

        let bul = this.SpawnBullet();
        if (!bul) {
          clearInterval(timer);
          return;
        }
        let BulletInfo = bul.GetBulletInfo();
        let dict = {
          DamageDataId: bul.Data.Base.DamageId,
          SkillLevel: bul.SkillLevel,
          Attacker: BulletInfo.Attacker,
          HitPosition: entityPos.ToUeVector(),
          IsAddEnergy: 1,
          IsCounterAttack: !1,
          ForceCritical: ModManager_1.ModManager.settings.AlwaysCrit,
          IsBlocked: !1,
          IsReaction: !1,
          PartId: -1,
          ExtraRate: 1,
          CounterSkillMessageId: void 0,
          BulletId: bul.BulletId,
          CounterSkillId: void 0,
        };
        // if (ModManager_1.ModManager.Settings.killAuraState == 1) {
        //   dict.DamageDataId = 1205401001n;
        //   CharacterDamageComponent?.ExecuteBulletDamage(
        //     BulletInfo.BulletEntityId,
        //     dict,
        //     BulletInfo.ContextId
        //   );

        //   bul = this.SpawnBullet();
        //   BulletInfo = bul.GetBulletInfo();
        //   dict.DamageDataId = 1301400001n;
        //   dict.BulletId = bul.BulletId;
        //   CharacterDamageComponent?.ExecuteBulletDamage(
        //     BulletInfo.BulletEntityId,
        //     dict,
        //     BulletInfo.ContextId
        //   );
        // } else {
        //   dict.DamageDataId = this.best[PID][1].BaseDamageId;
        //   CharacterDamageComponent?.ExecuteBulletDamage(
        //     BulletInfo.BulletEntityId,
        //     dict,
        //     BulletInfo.ContextId
        //   );
        // }

        dict.DamageDataId = this.DamageId.HavocRover;
        CharacterDamageComponent?.ExecuteBulletDamage(
          BulletInfo.BulletEntityId,
          dict,
          BulletInfo.ContextId
        );

        dict.DamageDataId = this.DamageId.FusionChangli;
        CharacterDamageComponent?.ExecuteBulletDamage(
          BulletInfo.BulletEntityId,
          dict,
          BulletInfo.ContextId
        );

        dict.DamageDataId = this.DamageId.WindDamage;
        CharacterDamageComponent?.ExecuteBulletDamage(
          BulletInfo.BulletEntityId,
          dict,
          BulletInfo.ContextId
        );

        dict.DamageDataId = this.DamageId.IceSanua;
        CharacterDamageComponent?.ExecuteBulletDamage(
          BulletInfo.BulletEntityId,
          dict,
          BulletInfo.ContextId
        );

        dict.DamageDataId = this.best[PID][1].BaseDamageId;
        CharacterDamageComponent?.ExecuteBulletDamage(
          BulletInfo.BulletEntityId,
          dict,
          BulletInfo.ContextId
        );

        // bul = this.SpawnBullet();
        // BulletInfo = bul.GetBulletInfo();
        // dict.DamageDataId = 1301400001n;
        // dict.BulletId = bul.BulletId;
        // CharacterDamageComponent?.ExecuteBulletDamage(
        //   BulletInfo.BulletEntityId,
        //   dict,
        //   BulletInfo.ContextId
        // );
      }
    }, 300);

    if (!ModManager_1.ModManager.settings.killAura) clearInterval(timer);
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
