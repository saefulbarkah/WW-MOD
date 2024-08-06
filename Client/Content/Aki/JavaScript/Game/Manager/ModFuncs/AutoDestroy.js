'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 }),
  (exports.AutoDestroy = void 0);
const puerts_1 = require('puerts'),
  UE = require('ue'),
  Info_1 = require('../../../Core/Common/Info'),
  Log_1 = require('../../../Core/Common/Log'),
  ModManager_1 = require('../ModManager'),
  ModUtils_1 = require('./ModUtils'),
  ModMethod_1 = require('./ModMethod'),
  EntityManager_1 = require('./EntityManager');

// const destroyList = [
//   'Collect501', // Red Crystal Cluster
//   'Collect502', // Blue Crystal Cluster Fragment
//   'Collect503', // Glowing Crystal Cluster
//   'Collect504', // Amber
//   'Gameplay003', // Gameplay - Cracked Rock Wall
//   'SceneObj001', // Breakable Object 001 - Small Wooden Box
//   'SceneObj002', // Breakable Object 002 - Medium Wooden Box
//   'SceneObj003', // Large Wooden Box
//   'SceneObj005', // Tree Trunk
//   'SceneObj008', // Breakable Object 008 - Wooden Fence
//   'SceneObj012', // Breakable Object 012 - Petrified Humanoid
//   'SceneObj013', // Breakable Object 013 - Petrified Humanoid
//   'SceneObj014', // Breakable Object 014 - Petrified Humanoid
//   'SceneObj015', // Clay Pot
//   'SceneObj016', // Clay Pot
//   'SceneObj018', // Sandbag
//   'Gameplay535', // Breakable Stone Block
//   'Gameplay536', // Breakable Stone Block
//   'Gameplay537', // Breakable Stone Block
//   'Gameplay538', // Breakable Stone Block
//   'Collect505', // Dragon Fluorite
//   'Gameplay_CXS_4', // Placement - Special Collectible - Fengduo
//   'Gameplay_CXS_14', // TsEntity - Hanging - Special Collectible - Fengduo
// ];

const destroyList = [
  'Gameplay003', // Gameplay - Cracked Rock Wall
  'Collect501', // Red Needle Crystal Cluster
  'Collect502', // Fragmented Blue Crystal Cluster
  'Collect503', // Glowing Crystal Cluster
  'Collect504', // Plant Amber
  'Gameplay535', // Destroyable Rock
  'Gameplay536', // Destroyable Rock
  'Gameplay537', // Destroyable Rock
  'Gameplay538', // Destroyable Rock
  'SceneObj003', // Large Wooden Crate
  'Collect505', // Dragon Fluorite
  'Gameplay_CXS_4', // Widnchimer
  'Gameplay_CXS_14', // Widnchimer
  'SceneObj015', // Clay Pot
  'SceneObj016', // Clay Pot
  'SceneObj005', // Tree Trunk
];

class AutoDestroy extends EntityManager_1.EntityManager {
  static isNeedDestroy(entity) {
    let blueprintType = this.GetBlueprintType2(entity);
    return destroyList.includes(blueprintType);
  }

  static AutoDestroy(entity) {
    if (
      ModManager_1.ModManager.Settings.AutoDestroy &&
      this.isNeedDestroy(entity)
    ) {
      //puerts_1.logger.warn("kun:AutoDestroy:isNeedDestroy",entity.Entity.Id);
      ModMethod_1.ModMethod.ThrowDamageChangeRequest(
        entity.Entity,
        10,
        1604001001n
      );
      //puerts_1.logger.warn("kun:AutoDestroy:End",entity.Entity.Id);
    }
  }
}
//puerts.logger.info(debug)
exports.AutoDestroy = AutoDestroy;
