'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 }),
  (exports.EntityListener = void 0);
const puerts_1 = require('puerts'),
  KillAura_1 = require('./Manager/ModFuncs/KillAura'),
  PerceptionRange_1 = require('./Manager/ModFuncs/PerceptionRange'),
  ModelManager_1 = require('./Manager/ModelManager'),
  ModUtils_1 = require('./Manager/Utils/ModUtils'),
  MobVacuum_1 = require('./Manager/ModFuncs/MobVacuum'),
  ModManager_1 = require('./Manager/ModManager'),
  AutoPuzzle_1 = require('./Manager/ModFuncs/AutoPuzzle'),
  AutoDestroy_1 = require('./Manager/ModFuncs/AutoDestroy');

class EntityListener {
  static Runtime() {
    if (!ModUtils_1.ModUtils.isInGame()) return;

    const entitylist =
      ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
    const count = entitylist.length;
    for (let i = 0; i < count; i++) {
      KillAura_1.KillAura.killAura(entitylist[i]);
      KillAura_1.KillAura.KillAnimal(entitylist[i]);
      AutoDestroy_1.AutoDestroy.AutoDestroy(entitylist[i]);
      // MobVacuum_1.MobVacuum.VacuumCollect(entitylist[i]);
      MobVacuum_1.MobVacuum.MobVacuum(entitylist[i]);
      AutoPuzzle_1.AutoPuzzle.AutoPuzzle(entitylist[i]);
    }
  }

  static FasterRuntime() {
    if (!ModUtils_1.ModUtils.isInGame()) return;

    const entitylist =
      ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
    const count = entitylist.length;
    for (let i = 0; i < count; i++) {
      if (ModManager_1.ModManager.settings.PerceptionRange) {
        PerceptionRange_1.PerceptionRange.SetAll(entitylist[i]);
      }
      if (ModManager_1.ModManager.settings.AutoPickTreasure) {
        PerceptionRange_1.PerceptionRange.SetTreasure(entitylist[i]);
      }
      if (ModManager_1.ModManager.settings.AutoTeleport) {
        PerceptionRange_1.PerceptionRange.SetTeleport(entitylist[i]);
      }
      if (ModManager_1.ModManager.settings.AutoLoot) {
        PerceptionRange_1.PerceptionRange.SetCollection(entitylist[i]);
      }
      if (ModManager_1.ModManager.settings.AutoAbsorb) {
        PerceptionRange_1.PerceptionRange.SetVision(entitylist[i]);
      }
      if (ModManager_1.ModManager.settings.AutoSonanceCasket) {
        PerceptionRange_1.PerceptionRange.SetSonanceCasket(entitylist[i]);
      }
    }
  }
}

exports.EntityListener = EntityListener;
