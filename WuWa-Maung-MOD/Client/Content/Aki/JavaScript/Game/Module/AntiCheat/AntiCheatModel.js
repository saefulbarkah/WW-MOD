'use strict';
const a0_0xe17da6 = a0_0x669e,
  a0_0x961303 = a0_0x669e,
  a0_0x23a649 = a0_0x669e;
function a0_0x276c() {
  const _0x1f51e5 = [
    'qje',
    'GetAppVersion',
    'AntiCheatModel',
    '../../Common/LocalStorage',
    'Gje',
    'LocalStorage',
    '__esModule',
    'GetHeartbeatData',
    'OnInit',
    '110ZGwIej',
    '647gfBhii',
    '8234787tTVdOj',
    '7843288qNGKKi',
    '6125650RrNHay',
    'GetGameBundleId',
    '../../Manager/ControllerHolder',
    '20763zZLabn',
    '12HmRqIF',
    'defineProperty',
    '7nJoFdO',
    '../../Manager/ModelManager',
    '../../../Core/Framework/ModelBase',
    '5172942CdPWMy',
    'PatchVersion',
    '3711ZdArNM',
    '1814EfRtsb',
    'ResetHeartbeatException',
    'KismetSystemLibrary',
    '3884WdhYWY',
  ];
  a0_0x276c = function () {
    return _0x1f51e5;
  };
  return a0_0x276c();
}
(function (_0x3e10df, _0x14e86f) {
  const _0x442d42 = a0_0x669e,
    _0x3b8587 = a0_0x669e,
    _0x5b45ba = a0_0x669e,
    _0x357f87 = _0x3e10df();
  while (!![]) {
    try {
      const _0x159290 =
        (parseInt(_0x442d42(0xa2)) / 0x1) * (-parseInt(_0x3b8587(0xb1)) / 0x2) +
        (-parseInt(_0x442d42(0xb0)) / 0x3) *
          (-parseInt(_0x3b8587(0xb4)) / 0x4) +
        parseInt(_0x3b8587(0xa5)) / 0x5 +
        -parseInt(_0x3b8587(0xae)) / 0x6 +
        (-parseInt(_0x442d42(0xab)) / 0x7) * (parseInt(_0x5b45ba(0xa4)) / 0x8) +
        (parseInt(_0x442d42(0xa8)) / 0x9) * (-parseInt(_0x3b8587(0xa1)) / 0xa) +
        (parseInt(_0x442d42(0xa3)) / 0xb) * (parseInt(_0x5b45ba(0xa9)) / 0xc);
      if (_0x159290 === _0x14e86f) break;
      else _0x357f87['push'](_0x357f87['shift']());
    } catch (_0x12812b) {
      _0x357f87['push'](_0x357f87['shift']());
    }
  }
})(a0_0x276c, 0xafce4);
Object[a0_0xe17da6(0xaa)](exports, a0_0x961303(0x9e), { value: !0x0 }),
  (exports[a0_0x961303(0x9a)] = void 0x0);
function a0_0x669e(_0xdcf732, _0x46e9a0) {
  const _0x276c05 = a0_0x276c();
  return (
    (a0_0x669e = function (_0x669ee1, _0xb1420d) {
      _0x669ee1 = _0x669ee1 - 0x9a;
      let _0xf313ee = _0x276c05[_0x669ee1];
      return _0xf313ee;
    }),
    a0_0x669e(_0xdcf732, _0x46e9a0)
  );
}
const UE = require('ue'),
  ModelBase_1 = require(a0_0x961303(0xad)),
  LocalStorage_1 = require(a0_0xe17da6(0x9b)),
  LocalStorageDefine_1 = require('../../Common/LocalStorageDefine'),
  ModelManager_1 = require(a0_0x961303(0xac)),
  AntiCheatData_1 = require('./AntiCheatData'),
  ControllerHolder_1 = require(a0_0x23a649(0xa7)),
  BUNDLE_DATA_EVENT_ID = '8',
  HEARTBEAT_DATA_EVENT_ID = '9';
class AntiCheatModel extends ModelBase_1['ModelBase'] {
  constructor() {
    const _0x209891 = a0_0xe17da6;
    super(...arguments),
      (this['Qre'] = ''),
      (this[_0x209891(0xb5)] = ''),
      (this['Gje'] = 0x0);
  }
  ['GetVersion']() {
    return this['Qre'];
  }
  ['GetBundleId']() {
    const _0xd7a7da = a0_0xe17da6;
    return this[_0xd7a7da(0xb5)];
  }
  [a0_0x23a649(0xa0)]() {
    const _0x911de1 = a0_0xe17da6,
      _0x44fceb = a0_0x961303,
      _0x5b0e78 = a0_0x961303;
    var _0x443d85 = UE['KuroLauncherLibrary'][_0x911de1(0xb6)]();
    return (
      (this['Qre'] = LocalStorage_1[_0x44fceb(0x9d)]['GetGlobal'](
        LocalStorageDefine_1['ELocalStorageGlobalKey'][_0x5b0e78(0xaf)],
        _0x443d85
      )),
      (this[_0x911de1(0xb5)] = UE[_0x44fceb(0xb3)][_0x911de1(0xa6)]()),
      !0x0
    );
  }
  static ['GetBundleData']() {
    return {};
  }
  [a0_0x23a649(0xb2)]() {
    this['Gje'] = 0x0;
  }
  ['HitHeartbeatException']() {
    const _0x1a414d = a0_0x961303;
    this[_0x1a414d(0x9c)] += 0x1;
  }
  ['GetHeartbeatException']() {
    return this['Gje'];
  }
  ['HasHeartbeatException']() {
    const _0x7172db = a0_0x23a649;
    return 0x0 < this[_0x7172db(0x9c)];
  }
  [a0_0x961303(0x9f)]() {
    return {};
  }
}
exports['AntiCheatModel'] = AntiCheatModel;
