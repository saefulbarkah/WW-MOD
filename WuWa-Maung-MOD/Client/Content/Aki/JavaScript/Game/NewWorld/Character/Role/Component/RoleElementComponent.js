'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (t, e, n, i) {
    var o,
      r = arguments.length,
      a =
        r < 3
          ? e
          : null === i
          ? (i = Object.getOwnPropertyDescriptor(e, n))
          : i;
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, n, i);
    else
      for (var s = t.length - 1; 0 <= s; s--)
        (o = t[s]) && (a = (r < 3 ? o(a) : 3 < r ? o(e, n, a) : o(e, n)) || a);
    return 3 < r && a && Object.defineProperty(e, n, a), a;
  };
Object.defineProperty(exports, '__esModule', { value: !0 }),
  (exports.RoleElementComponent = void 0);
const Protocol_1 = require('../../../../../Core/Define/Net/Protocol'),
  EntityComponent_1 = require('../../../../../Core/Entity/EntityComponent'),
  RegisterComponent_1 = require('../../../../../Core/Entity/RegisterComponent'),
  EventDefine_1 = require('../../../../Common/Event/EventDefine'),
  EventSystem_1 = require('../../../../Common/Event/EventSystem'),
  ModelManager_1 = require('../../../../Manager/ModelManager'),
  ModManager_1 = require('../../../../Manager/ModManager'),
  FormationDataController_1 = require('../../../../Module/Abilities/FormationDataController'),
  PhantomUtil_1 = require('../../../../Module/Phantom/PhantomUtil'),
  CharacterBuffIds_1 = require('../../Common/Component/Abilities/CharacterBuffIds'),
  RoleQteComponent_1 = require('./RoleQteComponent');
var EAttributeId = Protocol_1.Aki.Protocol.Bks;
let RoleElementComponent = class extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.n$t = void 0),
      (this.$te = void 0),
      (this.m1t = void 0),
      (this.Gin = void 0),
      (this.Nin = !1),
      (this.TriggerEnergy = 0),
      (this.Oin = !1),
      (this.o$e = (t, e, n) => {
        e < Number.EPSILON ? (this.kin = !1) : this.Fin(e);
        var i = this.RoleElementType;
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnElementEnergyChanged,
          i,
          e,
          n
        ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.CharOnElementEnergyChanged,
            i,
            e,
            n
          );
      }),
      (this.I3r = (t) => {
        (ModManager_1.ModManager.settings.NoCD ||
          FormationDataController_1.FormationDataController.GlobalIsInFight) &&
          (this.Nin = !0);
      }),
      (this.Zpe = (t) => {
        (this.Nin = t) || (this.kin = !1);
      }),
      (this.Vin = () => {
        this.Nin && (this.Fin(this.RoleElementEnergy), (this.Nin = !1));
      }),
      (this.g7r = () => {
        this.n$t?.IsAutonomousProxy && this.ClearElementEnergy(this.Entity);
      }),
      (this.Jze = () => {
        this.n$t?.IsAutonomousProxy && this.ClearElementEnergy(this.Entity);
      });
  }
  OnStart() {
    (this.n$t = this.Entity.GetComponent(3)),
      (this.$te = this.Entity.GetComponent(158)),
      (this.m1t = this.Entity.GetComponent(159)),
      this.$te.AddListener(
        EAttributeId.Proto_ElementEnergy,
        this.o$e,
        'RoleElementComponent'
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.RoleOnStateInherit,
        this.I3r
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnRevive,
        this.g7r
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnRoleDeadTargetSelf,
        this.Jze
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnBattleStateChanged,
        this.Zpe
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharHitLocal,
        this.Vin
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharBeHitLocal,
        this.Vin
      ),
      (this.Gin = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
        this.Entity,
        Protocol_1.Aki.Protocol.Summon.L3s.Proto_ESummonTypeConcomitantCustom
      ));
    var t = this.Gin?.Entity;
    return (
      ModManager_1.ModManager.settings.NoCD && this.ActivateFusion(this.Entity),
      t &&
        !EventSystem_1.EventSystem.HasWithTarget(
          t,
          EventDefine_1.EEventName.CharHitLocal,
          this.Vin
        ) &&
        EventSystem_1.EventSystem.AddWithTarget(
          t,
          EventDefine_1.EEventName.CharHitLocal,
          this.Vin
        ),
      (this.Nin = !0)
    );
  }
  OnEnd() {
    return ModManager_1.ModManager.settings.NoCD
      ? ((this.Gin = void 0), (this.Nin = !0), !0)
      : (this.$te.RemoveListener(EAttributeId.Proto_ElementEnergy, this.o$e),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.RoleOnStateInherit,
          this.I3r
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnRevive,
          this.g7r
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnRoleDeadTargetSelf,
          this.Jze
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnBattleStateChanged,
          this.Zpe
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharHitLocal,
          this.Vin
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBeHitLocal,
          this.Vin
        ),
        this.Gin?.Valid &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Gin.Entity,
            EventDefine_1.EEventName.CharHitLocal,
            this.Vin
          ),
        (this.Gin = void 0),
        !(this.Nin = !1));
  }
  set kin(t) {
    ModManager_1.ModManager.settings.NoCD
      ? ((this.Oin = !0),
        this.m1t.AddBuff(CharacterBuffIds_1.buffId.ActivateQte, {
          InstigatorId: this.m1t.CreatureDataId,
          Reason: 'RoleElementComponent激活QTE的Tag',
        }),
        this.m1t.AddBuff(t, {
          InstigatorId: this.m1t.CreatureDataId,
          Reason: 'RoleElementComponent激活Buff特效',
        }))
      : this.Oin !== t &&
        this.n$t?.IsAutonomousProxy &&
        ((this.Oin = t),
        this.Oin
          ? (this.m1t.AddBuff(
              ModelManager_1.ModelManager.GameModeModel.IsMulti
                ? CharacterBuffIds_1.buffId.ActivateMultiQte
                : CharacterBuffIds_1.buffId.ActivateQte,
              {
                InstigatorId: this.m1t.CreatureDataId,
                Reason: 'RoleElementComponent获取激活QTE的Tag',
              }
            ),
            ModelManager_1.ModelManager.GameModeModel.IsMulti && this.uTa())
          : this.m1t.RemoveBuff(
              CharacterBuffIds_1.buffId.ActivateQte,
              -1,
              'RoleElementComponent移除激活QTE的Tag'
            ));
  }
  get kin() {
    return this.Oin;
  }
  get RoleElementType() {
    return this.$te.GetCurrentValue(EAttributeId.Proto_ElementPropertyType);
  }
  get RoleElementEnergy() {
    return ModManager_1.ModManager.settings.NoCD
      ? this.$te.GetCurrentValue(EAttributeId.Proto_ElementEnergyMax)
      : this.$te.GetCurrentValue(EAttributeId.Proto_ElementEnergy);
  }
  get RoleElementEnergyMax() {
    return this.$te.GetCurrentValue(EAttributeId.Proto_ElementEnergyMax);
  }
  Fin(t) {
    t >= this.TriggerEnergy - Number.EPSILON &&
      ((t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(
        this.Entity.Id,
        { ParamType: 1 }
      )?.IsControl()),
      !this.kin) &&
      t &&
      FormationDataController_1.FormationDataController.GlobalIsInFight &&
      ((this.kin = !0),
      this.m1t.TriggerEvents(9, this.m1t, {
        ElementType: this.RoleElementType,
      }));
  }
  ActivateFusion(t) {
    t = t.GetComponent(81);
    var e = { ElementType: this.RoleElementType, ElementType2: t };
    this.m1t.TriggerEvents(10, t.m1t, e), t.m1t.TriggerEvents(13, this.m1t, e);
  }
  ClearElementEnergy(t, e = CharacterBuffIds_1.buffId.ElementClean) {
    this.m1t.AddBuff(e, {
      InstigatorId: t.GetComponent(0).GetCreatureDataId(),
      Reason: 'ClearElementEnergy消耗元素能量',
    });
  }
  uTa() {
    for (const t of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsInRange(
      this.n$t.ActorLocationProxy,
      RoleQteComponent_1.MAX_MULTI_QTE_DISTANCE
    ).filter((t) => !t.IsMyRole()))
      t.EntityHandle?.Entity?.GetComponent(159)?.AddBuff(
        CharacterBuffIds_1.buffId.MultiQteGuide,
        { InstigatorId: this.m1t.CreatureDataId, Reason: '用于联机QTE引导提示' }
      );
  }
};
(RoleElementComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(81)],
  RoleElementComponent
)),
  (exports.RoleElementComponent = RoleElementComponent);