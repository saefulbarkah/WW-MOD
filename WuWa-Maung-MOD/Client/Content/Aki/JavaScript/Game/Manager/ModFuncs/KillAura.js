'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 }),
  (exports.KillAura = void 0);
const puerts_1 = require('puerts'),
  UE = require('ue'),
  ModManager_1 = require('../ModManager'),
  ModUtils_1 = require('../Utils/ModUtils'),
  ModMethod_1 = require('./ModMethod'),
  EntityManager_1 = require('./EntityManager');

const AnimalList = [
  'Animal001', // Purple-billed Pigeon
  'Animal002', // Green-feathered Pigeon
  'Animal003', // Blue-crowned Pigeon
  'Animal004', // Grey-crowned Gull
  'Animal012', // Green-mottled Rabbit
  'Animal032', // blobfly
];
const BigAnimalList = [
  'Animal013', // Rockhorn Sheep
  'Animal014', // Grey-backed Ox
  'Animal015', // Forest-dwelling Ox
  'Animal033', // Frost-scarred Roe
];
const dropanimal = [
  'Animal006', // Snowcloud Crane
  'Animal005', // Red-footed Goose
  'Animal035', // Song Snow Owl
];

class KillAura extends EntityManager_1.EntityManager {
  static isIndistance(entity) {
    let monsterPos = this.GetPosition(entity.Entity);
    if (!monsterPos) {
      return false;
    }
    let distance = ModUtils_1.ModUtils.Getdistance2Player(monsterPos);
    if (distance < ModManager_1.ModManager.settings.killAuraRadius * 100) {
      return true;
    }
    return false;
  }

  static killAura(entity) {
    if (!ModManager_1.ModManager.settings.killAura) return;

    if (this.isMonster(entity) && this.isIndistance(entity)) {
      ModMethod_1.ModMethod.MonsterKillRequest(entity.Entity);
    }
  }

  static KillAnimal(entity) {
    if (!ModManager_1.ModManager.settings.KillAnimal) return;
    let blueprintType = this.GetBlueprintType2(entity);
    if (AnimalList.includes(blueprintType)) {
      ModMethod_1.ModMethod.AnimalDieRequest(entity.Entity);
    } else if (dropanimal.includes(blueprintType)) {
      ModMethod_1.ModMethod.AnimalDropRequest(entity.Entity);
    }
  }
}

exports.KillAura = KillAura;
