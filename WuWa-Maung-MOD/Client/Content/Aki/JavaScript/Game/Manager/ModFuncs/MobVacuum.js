'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 }),
  (exports.MobVacuum = void 0);
const puerts_1 = require('puerts'),
  UE = require('ue'),
  Info_1 = require('../../../Core/Common/Info'),
  Log_1 = require('../../../Core/Common/Log'),
  ModManager_1 = require('../ModManager'),
  ModUtils_1 = require('../Utils/ModUtils'),
  NetDefine_1 = require('../../../Core/Define/Net/NetDefine'),
  Protocol_1 = require('../../../Core/Define/Net/Protocol'),
  Net_1 = require('../../../Core/Net/Net'),
  EntityManager_1 = require('./EntityManager'),
  Global_1 = require('../../Global'),
  GlobalData_1 = require('../../GlobalData'),
  EntityFilter_1 = require('./EntityFilter'),
  UiManager_1 = require('../../../Ui/UiManager');

class MobVacuum extends EntityManager_1.EntityManager {
  static isIndistance(entity) {
    let monsterPos = this.GetPosition(entity.Entity);
    let distance = ModUtils_1.ModUtils.Getdistance2Player(monsterPos);
    if (distance < ModManager_1.ModManager.settings.VacuumRadius * 100) {
      return true;
    } else return false;
  }

  static MobVacuum(entity) {
    if (!ModManager_1.ModManager.settings.MobVacuum) return;
    if (this.isMonster(entity) && this.isIndistance(entity)) {
      let playerpos = this.GetPlayerPos();
      playerpos.Z += 50.0; // mob stuck fix

      let ActorComp = entity.Entity.GetComponent(1);
      ActorComp.ActorInternal.K2_SetActorLocation(playerpos);
      this.SyncMonster(entity, playerpos);
    }
  }

  // static VacuumCollect(entity) {
  //   if (!ModManager_1.ModManager.settings.VacuumCollect) return;
  //   if (
  //     EntityFilter_1.EntityFilter.isneedLoot(this.GetBlueprintType2(entity)) &&
  //     this.isIndistance(entity)
  //   ) {
  //     let playerpos = this.GetPlayerPos();
  //     let ActorComp = entity.Entity.GetComponent(1);
  //     ActorComp.ActorInternal.K2_SetActorLocation(playerpos);
  //   }
  // }

  static SyncMonster(entity, pos) {
    var t = entity.Entity.GetComponent(59);
    var i = t.GetCurrentMoveSample();
    i.Location = pos;
    t.PendingMoveInfos.push(i);
    var s = Protocol_1.Aki.Protocol.$us.create();
    s.kRs.push(t.CollectPendingMoveInfos());
    Net_1.Net.Send(28674, s); /*NetDefine_1.EPushMessageId.MovePackagePush*/
  }
}
//puerts.logger.info(debug)
exports.MobVacuum = MobVacuum;
