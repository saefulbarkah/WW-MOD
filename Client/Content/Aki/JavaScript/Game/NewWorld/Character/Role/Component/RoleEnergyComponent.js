'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (e, t, r, n) {
    var o,
      i = arguments.length,
      s =
        i < 3
          ? t
          : null === n
          ? (n = Object.getOwnPropertyDescriptor(t, r))
          : n;
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
      s = Reflect.decorate(e, t, r, n);
    else
      for (var a = e.length - 1; 0 <= a; a--)
        (o = e[a]) && (s = (i < 3 ? o(s) : 3 < i ? o(t, r, s) : o(t, r)) || s);
    return 3 < i && s && Object.defineProperty(t, r, s), s;
  };
Object.defineProperty(exports, '__esModule', { value: !0 }),
  (exports.RoleEnergyComponent = void 0);
const Protocol_1 = require('../../../../../Core/Define/Net/Protocol'),
  ModManager_1 = require('../../../../Manager/ModManager'),
  EntityComponent_1 = require('../../../../../Core/Entity/EntityComponent');
var EAttributeId = Protocol_1.Aki.Protocol.Bks;
const RegisterComponent_1 = require('../../../../../Core/Entity/RegisterComponent'),
  energyAttrIds = [EAttributeId.Proto_Energy, EAttributeId.Proto_EnergyMax];
let RoleEnergyComponent = class extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.n$t = void 0),
      (this.$te = void 0),
      (this.Qin = (e, t, r) => {
        var n = this.$te.GetCurrentValue(EAttributeId.Proto_Energy),
          o = this.$te.GetCurrentValue(EAttributeId.Proto_EnergyMax);
        ModManager_1.ModManager.settings.NoCD
          ? this.n$t.Actor?.CharRenderingComponent.SetStarScarEnergy(o)
          : this.n$t.Actor?.CharRenderingComponent.SetStarScarEnergy(n / o);
      });
  }
  OnStart() {
    (this.n$t = this.Entity.CheckGetComponent(3)),
      (this.$te = this.Entity.CheckGetComponent(158));
    var e = this.$te.GetCurrentValue.bind(this.$te);
    return (
      (this.$te.GetCurrentValue = (t) =>
        t === EAttributeId.Proto_Energy && ModManager_1.ModManager.settings.NoCD
          ? e(EAttributeId.Proto_EnergyMax)
          : e(t)),
      this.$te.AddListeners(energyAttrIds, this.Qin, 'RoleEnergyComponent'),
      this.Qin(),
      !0
    );
  }
  OnEnd() {
    return (
      this.$te.GetCurrentValue &&
        (this.$te.GetCurrentValue = originalGetCurrentValue),
      this.$te.RemoveListeners(energyAttrIds, this.Qin),
      !0
    );
  }
};
(RoleEnergyComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(82)],
  RoleEnergyComponent
)),
  (exports.RoleEnergyComponent = RoleEnergyComponent);
