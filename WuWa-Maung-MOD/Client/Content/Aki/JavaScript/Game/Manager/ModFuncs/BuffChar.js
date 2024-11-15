'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 }),
  (exports.BuffChar = void 0);
const puerts_1 = require('puerts'),
  EntityManager_1 = require('./EntityManager'),
  ModManager_1 = require('../ModManager'),
  Formation_1 = require('Module/Abilities/FormationDataController');

class BuffChar {
  static unlimitedBuffDuration(time = 9999999) {
    if (!ModManager_1.ModManager.settings.enableBuff) {
      const playerId = EntityManager_1.EntityManager.getPlayerId();
      const x =
        Formation_1.FormationDataController.GetPlayerEntity(
          playerId
        ).GetComponent(183);
      if (x) {
        let buffType;
        for (const t of x.GetAllBuffs()) {
          buffType = t;
          t.SetDuration(time);
        }
      }
    }
  }
}

exports.BuffChar = BuffChar;
