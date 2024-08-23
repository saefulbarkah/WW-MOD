'use strict';
var _a;
Object.defineProperty(exports, '__esModule', { value: !0 }),
  (exports.AceAntiCheatController = void 0);
const ue_1 = require('ue'),
  Log_1 = require('../../../Core/Common/Log'),
  Time_1 = require('../../../Core/Common/Time'),
  Protocol_1 = require('../../../Core/Define/Net/Protocol'),
  ControllerBase_1 = require('../../../Core/Framework/ControllerBase'),
  Net_1 = require('../../../Core/Net/Net'),
  TimerSystem_1 = require('../../../Core/Timer/TimerSystem'),
  MathUtils_1 = require('../../../Core/Utils/MathUtils'),
  EventDefine_1 = require('../../Common/Event/EventDefine'),
  EventSystem_1 = require('../../Common/Event/EventSystem'),
  TimeUtil_1 = require('../../Common/TimeUtil'),
  Global_1 = require('../../Global'),
  InputEnums_1 = require('../../Input/InputEnums'),
  ModelManager_1 = require('../../Manager/ModelManager'),
  CharacterAttributeTypes_1 = require('../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes'),
  POSTICKTIME = 1e3,
  POSTICKCOUNT = 120,
  REPORTDATA2TIME = 6e4;
class AceAntiCheatController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      Net_1.Net.Register(13760, AceAntiCheatController.iEa),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDone,
        this.nye
      ),
      !0
    );
  }
  static OnClear() {
    return (
      Net_1.Net.UnRegister(13760),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDone,
        this.nye
      ),
      !0
    );
  }
  static OnTick(t) {
    var e;
    if (
      (this.rEa &&
        0 <
          (e =
            Global_1.Global.BaseCharacter?.GetMovementComponent()?.GetMaxSpeed() ??
            0) &&
        ((this.oEa = (this.nEa * this.oEa + e) / (this.nEa + 1)),
        (this.nEa += 1),
        e < this.sEa && (this.sEa = e),
        e > this.nun) &&
        (this.nun = e),
      this.aEa && this.hEa && ((this.lEa += t), this.lEa > 1e3))
    ) {
      this.lEa -= 1e3;
      for (const t of this.hEa.keys()) {
        var o,
          a =
            ModelManager_1.ModelManager.CreatureModel.GetEntity(
              t
            ).Entity.GetComponent(1)?.ActorLocationProxy;
        a &&
          ((o = this.hEa.get(t).swa).push(a), o.length > 120) &&
          (this.aEa = !1);
      }
    }
  }
  static YNr() {
    var t = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    if (t)
      return ModelManager_1.ModelManager.SceneTeamModel?.GetTeamPlayerData(t)
        ?.GetGroup(1)
        ?.GetRoleList();
    Log_1.Log.CheckError() &&
      Log_1.Log.Error('Net', 36, 'StartSecFbRound playerId Error');
  }
  static _Ea(t) {
    var e, o;
    0 < this.uEa
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn('Net', 36, 'StartSecFbRound repeat', ['logId', t])
      : ((this.uEa = t),
        (this.cEa = Time_1.Time.WorldTime),
        ((e = Protocol_1.Aki.Protocol.fRa.create()).mEa =
          MathUtils_1.MathUtils.BigIntToLong(t)),
        (e.dEa = TimeUtil_1.TimeUtil.DateFormat2(new Date())),
        (o = this.YNr())
          ? ((e.CEa = o[0] ? this.gEa(o[0]) : void 0),
            (e.fEa = o[1] ? this.gEa(o[1]) : void 0),
            (e.pEa = o[2] ? this.gEa(o[2]) : void 0),
            (e.vEa = o[3] ? this.gEa(o[3]) : void 0),
            this.MEa(!0))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error('Net', 36, 'StartSecFbRound roleList Error', [
              'logId',
              t,
            ]));
  }
  static gEa(t) {
    var e = Protocol_1.Aki.Protocol.Qwa.create(),
      o = ModelManager_1.ModelManager.RoleModel?.GetRoleInstanceById(t.RoleId),
      a = o?.GetLevelData();
    (e.Qws = a?.GetBreachLevel() ?? 0),
      (e.P6n = a?.GetLevel() ?? 0),
      (e.M8n = a?.GetExp() ?? 0),
      (e.O6n = t.RoleId);
    var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(
      t.CreatureDataId
    )?.Entity?.GetComponent(158);
    if (r) {
      var i = [];
      for (let t = 1; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; t++) {
        var n = Protocol_1.Aki.Protocol.Vks.create();
        (n.J4n = t), (n.W4n = r.GetCurrentValue(t)), i.push(n);
      }
      e.SEa = i;
    }
    var l = o?.GetSkillData();
    a = l?.GetSkillList();
    if (l && a) {
      var E = [];
      for (const t of a) {
        var s = Protocol_1.Aki.Protocol.EEa.create();
        (s.X4n = t.Id), (s.P6n = l.GetSkillLevel(t.Id)), E.push(s);
      }
      e.EEa = E;
    }
    return e;
  }
  static MEa(t) {
    (this.rEa = t),
      (this.nEa = 0),
      (this.oEa = 0),
      (this.nun = 0),
      (this.sEa = 999999);
  }
  static yEa(t) {
    var e;
    this.uEa !== t
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          'Net',
          36,
          'EndSecFbRound logId Error',
          ['logId', t],
          ['SecFbRoundLogId', this.uEa]
        )
      : (((e = Protocol_1.Aki.Protocol.ERa.create()).mEa =
          MathUtils_1.MathUtils.BigIntToLong(t)),
        (e.IEa = TimeUtil_1.TimeUtil.DateFormat2(new Date())),
        (e.TEa = Time_1.Time.WorldTime - this.cEa),
        (e.LEa = this.nun),
        (e.DEa = this.sEa),
        (e.AEa = this.oEa),
        this.MEa(!1),
        (this.uEa = -1n));
  }
  static REa(t) {
    0 < this.UEa
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn('Net', 36, 'StartSecRoleFightFlowBigWorld repeat', [
          'logId',
          t,
        ])
      : (this.xEa(), (this.UEa = t));
  }
  static PEa(t) {
    this.UEa !== t
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          'Net',
          36,
          'EndSecRoleFightFlowBigWorld logId Error',
          ['logId', t],
          ['SecRoleFightFlowBigWorldLogId', this.UEa]
        )
      : (this.wEa(
          t,
          Protocol_1.Aki.Protocol.Wwa.Proto_LogType_SecRoleFightFlow_BigWorldEnd
        ),
        (this.UEa = -1n));
  }
  static xEa() {
    var t = this.YNr();
    if (t) {
      for (const a of (this.BEa = t)) {
        this.hEa || (this.hEa = new Map()),
          this.hEa.get(a.CreatureDataId) ||
            (((e = Protocol_1.Aki.Protocol.Kwa.create()).bEa = a.RoleId),
            this.hEa.set(a.CreatureDataId, e));
        var e = this.gEa(a),
          o =
            ((this.hEa.get(a.CreatureDataId).qEa = e),
            ModelManager_1.ModelManager.CreatureModel.GetEntity(
              a.CreatureDataId
            ));
        o = o?.Entity;
        o
          ? (o.GetComponent(157)?.AddGeneralListener(this.qbr),
            EventSystem_1.EventSystem.AddWithTarget(
              o,
              EventDefine_1.EEventName.CharDamage,
              this.Uie
            ),
            (this.aEa = !0),
            EventSystem_1.EventSystem.AddWithTarget(
              o,
              EventDefine_1.EEventName.CharInputPress,
              this.LZo
            ))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              'Net',
              36,
              'StartColletRoleFightFlow roleEntity Error'
            );
      }
      (this.GEa = Time_1.Time.WorldTime),
        (t = ModelManager_1.ModelManager.CharacterModel.GetHandle(
          Global_1.Global.BaseCharacter?.EntityId ?? 0
        )),
        (this.OEa = t?.Entity?.GetComponent(0).GetCreatureDataId()),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnChangeRole,
          this.xie
        );
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error('Net', 36, 'StartColletRoleFightFlow roleList Error');
  }
  static wEa(t, e) {
    if (this.BEa && this.hEa) {
      var o,
        a = Protocol_1.Aki.Protocol.SRa.create(),
        r =
          ((a.mEa = MathUtils_1.MathUtils.BigIntToLong(t)),
          (a.p6n = TimeUtil_1.TimeUtil.DateFormat2(new Date())),
          []);
      t = ModelManager_1.ModelManager.CharacterModel.GetHandle(
        Global_1.Global.BaseCharacter?.EntityId ?? 0
      )
        ?.Entity?.GetComponent(0)
        .GetCreatureDataId();
      t &&
        this.hEa.get(t) &&
        ((o = MathUtils_1.MathUtils.LongToNumber(this.hEa.get(t).kEa)),
        (this.hEa.get(t).kEa = Time_1.Time.WorldTime - this.GEa + o));
      for (const t of this.hEa.values()) r.push(t);
      (a.NEa = r), (a.FEa = e);
      for (const t of this.BEa) {
        var i = ModelManager_1.ModelManager.CreatureModel.GetEntity(
          t.CreatureDataId
        )?.Entity;
        i
          ? (i.GetComponent(157)?.RemoveGeneralListener(this.qbr),
            EventSystem_1.EventSystem.RemoveWithTarget(
              i,
              EventDefine_1.EEventName.CharDamage,
              this.Uie
            ),
            EventSystem_1.EventSystem.RemoveWithTarget(
              i,
              EventDefine_1.EEventName.CharInputPress,
              this.LZo
            ),
            (this.aEa = !1))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              'Net',
              36,
              'StartColletRoleFightFlow roleEntity Error'
            );
      }
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie
      ),
        (this.hEa = void 0),
        (this.BEa = void 0);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error('Net', 36, 'SendRoleFightFlowRequest List Error');
  }
  static VEa(t) {
    0 < this.HEa
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn('Net', 36, 'StartSecRoleFightFlowInst repeat', [
          'logId',
          t,
        ])
      : (this.xEa(), (this.HEa = t));
  }
  static jEa(t) {
    this.HEa !== t
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          'Net',
          36,
          'EndSecRoleFightFlowInst logId Error',
          ['logId', t],
          ['SecRoleFightFlowInstLogId', this.HEa]
        )
      : (this.wEa(
          t,
          Protocol_1.Aki.Protocol.Wwa.Proto_LogType_SecRoleFightFlow_InstEnd
        ),
        (this.HEa = -1n));
  }
  static WEa(t, e) {
    0 < this.QEa
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn('Net', 36, 'StartSecFbRound repeat', ['logId', t])
      : ((this.QEa = t),
        this.MEa(!0),
        (this.KEa = TimerSystem_1.TimerSystem.Delay(() => {
          (this.KEa = void 0), this.$Ea(this.QEa);
        }, e)));
  }
  static $Ea(t) {
    var e;
    this.QEa !== t
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          'Net',
          36,
          'EndSecWorldInfoFlow logId Error',
          ['logId', t],
          ['SecWorldInfoFlowLogId', this.QEa]
        )
      : (this.KEa &&
          (TimerSystem_1.TimerSystem.Remove(this.KEa), (this.KEa = void 0)),
        ((e = Protocol_1.Aki.Protocol.TRa.create()).mEa =
          MathUtils_1.MathUtils.BigIntToLong(t)),
        (e.p6n = TimeUtil_1.TimeUtil.DateFormat2(new Date())),
        (e.LEa = this.nun),
        (e.DEa = this.sEa),
        (e.AEa = this.oEa),
        this.MEa(!1),
        (this.QEa = -1n));
  }
  static XEa(t) {
    var e, o;
    0 < this.YEa
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn('Net', 36, 'StartSecFbRound repeat', ['logId', t])
      : ((this.YEa = t),
        (this.cEa = Time_1.Time.WorldTime),
        ((e = Protocol_1.Aki.Protocol.RRa.create()).mEa =
          MathUtils_1.MathUtils.BigIntToLong(t)),
        (e.dEa = TimeUtil_1.TimeUtil.DateFormat2(new Date())),
        (o = this.YNr())
          ? ((e.CEa = o[0] ? this.gEa(o[0]) : void 0),
            (e.fEa = o[1] ? this.gEa(o[1]) : void 0),
            (e.pEa = o[2] ? this.gEa(o[2]) : void 0),
            (e.vEa = o[3] ? this.gEa(o[3]) : void 0),
            this.MEa(!0))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error('Net', 36, 'StartSecWorldFlow roleList Error', [
              'logId',
              t,
            ]));
  }
  static JEa(t) {
    var e;
    this.YEa !== t
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          'Net',
          36,
          'EndSecWorldFlow logId Error',
          ['logId', t],
          ['SecWorldFlowLogId', this.YEa]
        )
      : ((this.YEa = -1n),
        ((e = Protocol_1.Aki.Protocol.ARa.create()).mEa =
          MathUtils_1.MathUtils.BigIntToLong(t)),
        (e.IEa = TimeUtil_1.TimeUtil.DateFormat2(new Date())),
        (e.TEa = Time_1.Time.WorldTime - this.cEa),
        (e.LEa = this.nun),
        (e.DEa = this.sEa),
        (e.AEa = this.oEa),
        this.MEa(!1));
  }
}
(exports.AceAntiCheatController = AceAntiCheatController),
  ((_a = AceAntiCheatController).uEa = -1n),
  (AceAntiCheatController.UEa = -1n),
  (AceAntiCheatController.HEa = -1n),
  (AceAntiCheatController.QEa = -1n),
  (AceAntiCheatController.YEa = -1n),
  (AceAntiCheatController.iEa = (t) => {
    var e = MathUtils_1.MathUtils.LongToBigInt(t.mEa);
    switch (t.FEa) {
      case Protocol_1.Aki.Protocol.Wwa.Proto_LogType_SecGetReportData2Flow:
        break;
      case Protocol_1.Aki.Protocol.Wwa.Proto_LogType_SecFBRoundStartFlow:
        _a._Ea(e);
        break;
      case Protocol_1.Aki.Protocol.Wwa.Proto_LogType_SecFBRoundEndFlow:
        _a.yEa(e);
        break;
      case Protocol_1.Aki.Protocol.Wwa
        .Proto_LogType_SecRoleFightFlow_BigWorldStart:
        _a.REa(e);
        break;
      case Protocol_1.Aki.Protocol.Wwa
        .Proto_LogType_SecRoleFightFlow_BigWorldEnd:
        _a.PEa(e);
        break;
      case Protocol_1.Aki.Protocol.Wwa.Proto_LogType_SecRoleFightFlow_InstStart:
        _a.VEa(e);
        break;
      case Protocol_1.Aki.Protocol.Wwa.Proto_LogType_SecRoleFightFlow_InstEnd:
        _a.jEa(e);
        break;
      case Protocol_1.Aki.Protocol.Wwa.Proto_LogType_SecWorldInfoFlow_Start:
        _a.WEa(e, MathUtils_1.MathUtils.LongToNumber(t.QRa));
        break;
      case Protocol_1.Aki.Protocol.Wwa.Proto_LogType_SecWorldInfoFlow_End:
        _a.$Ea(e);
        break;
      case Protocol_1.Aki.Protocol.Wwa.Proto_LogType_SecWorldStartFlow:
        _a.XEa(e);
        break;
      case Protocol_1.Aki.Protocol.Wwa.Proto_LogType_SecWorldSEndFlow:
        _a.JEa(e);
        break;
      default:
        Log_1.Log.CheckError() &&
          Log_1.Log.Error('Net', 36, 'UnknownAntiCheatingLogType', [
            'Type',
            t.FEa,
          ]);
    }
  }),
  (AceAntiCheatController.cEa = 0),
  (AceAntiCheatController.oEa = 0),
  (AceAntiCheatController.sEa = 0),
  (AceAntiCheatController.nun = 0),
  (AceAntiCheatController.nEa = 0),
  (AceAntiCheatController.rEa = !1),
  (AceAntiCheatController.aEa = !1),
  (AceAntiCheatController.lEa = 0),
  (AceAntiCheatController.BEa = void 0),
  (AceAntiCheatController.hEa = void 0),
  (AceAntiCheatController.GEa = 0),
  (AceAntiCheatController.OEa = void 0),
  (AceAntiCheatController.qbr = (t, e, o) => {
    if (_a.hEa)
      for (const e of _a.hEa.keys()) {
        const o =
          ModelManager_1.ModelManager.CreatureModel.GetEntity(e)
            ?.Entity?.GetComponent(157)
            ?.GetCurrentValue(t) ?? 0;
        var a = _a.hEa.get(e).qEa.SEa[t - 1];
        a && a.J4n === t && a.W4n < o && (a.W4n = o);
      }
    else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error('Net', 36, 'SetNewAttrMaxValue FightRoleInfoMap nil');
  }),
  (AceAntiCheatController.Uie = (t, e, o, a, r) => {
    if (_a.hEa) {
      var i = -o;
      for (const e of _a.hEa.keys()) {
        var n = t.GetComponent(0).GetCreatureDataId();
        e === n &&
          (((n = _a.hEa.get(e)).zEa =
            i + MathUtils_1.MathUtils.LongToNumber(n.zEa)),
          (n.ZEa += 1),
          (n.eya += r.IsImmune ? 1 : 0),
          r.IsCritical
            ? ((n.tya += 1), i > n.iya && (n.iya = i), i < n.rya && (n.rya = i))
            : (i > n.oya && (n.oya = i), i < n.nya && (n.nya = i)));
      }
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error('Net', 36, 'OnDamage FightRoleInfoMap nil');
  }),
  (AceAntiCheatController.LZo = (t, e) => {
    if (_a.OEa && _a.hEa) {
      var o = _a.hEa.get(_a.OEa);
      if (o)
        switch (t) {
          case InputEnums_1.EInputAction.攻击:
            o.sya += 1;
            break;
          case InputEnums_1.EInputAction.闪避:
            o.aya += 1;
            break;
          case InputEnums_1.EInputAction.跳跃:
            o.hya += 1;
            break;
          case InputEnums_1.EInputAction.大招:
            o.lya += 1;
            break;
          case InputEnums_1.EInputAction.幻象2:
            o._ya += 1;
            break;
          case InputEnums_1.EInputAction.技能1:
            o.uya += 1;
        }
    }
  }),
  (AceAntiCheatController.xie = (t, e) => {
    var o;
    e &&
      _a.hEa &&
      ((e = e.Entity?.GetComponent(0).GetCreatureDataId()) &&
        _a.hEa.get(e) &&
        ((o = MathUtils_1.MathUtils.LongToNumber(_a.hEa.get(e).kEa)),
        (_a.hEa.get(e).kEa = Time_1.Time.WorldTime - _a.GEa + o)),
      (_a.GEa = Time_1.Time.WorldTime),
      (_a.OEa = t.Entity?.GetComponent(0).GetCreatureDataId()));
  }),
  (AceAntiCheatController.KEa = void 0),
  (AceAntiCheatController.cya = void 0),
  (AceAntiCheatController.ReportDataRequest = () => {}),
  (AceAntiCheatController.nye = () => {
    _a.cya ||
      (_a.cya = TimerSystem_1.TimerSystem.Forever(_a.ReportDataRequest, 6e4));
  });
