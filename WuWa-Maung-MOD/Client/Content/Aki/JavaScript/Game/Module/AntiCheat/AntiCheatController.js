'use strict';
var a0_0x4b47cc = a0_0x4484,
  a0_0x4bbd5c = a0_0x4484,
  a0_0x3a4d06 = a0_0x4484;
(function (_0x509a9a, _0x565951) {
  var _0x3efb12 = a0_0x4484,
    _0x4601cf = a0_0x4484,
    _0x1aeda3 = a0_0x4484,
    _0x19d101 = _0x509a9a();
  while (!![]) {
    try {
      var _0x40c4b4 =
        parseInt(_0x3efb12(0xad)) / 0x1 +
        (parseInt(_0x3efb12(0xbd)) / 0x2) * (-parseInt(_0x4601cf(0xa4)) / 0x3) +
        (-parseInt(_0x4601cf(0xb7)) / 0x4) *
          (-parseInt(_0x1aeda3(0xc2)) / 0x5) +
        parseInt(_0x4601cf(0xb5)) / 0x6 +
        -parseInt(_0x3efb12(0xab)) / 0x7 +
        -parseInt(_0x1aeda3(0xc4)) / 0x8 +
        parseInt(_0x3efb12(0xb9)) / 0x9;
      if (_0x40c4b4 === _0x565951) break;
      else _0x19d101['push'](_0x19d101['shift']());
    } catch (_0x4bb076) {
      _0x19d101['push'](_0x19d101['shift']());
    }
  }
})(a0_0x2e5c, 0x5289d);
function a0_0x4484(_0x3d25d3, _0x6467f6) {
  var _0x2e5c87 = a0_0x2e5c();
  return (
    (a0_0x4484 = function (_0x448474, _0x1fb15e) {
      _0x448474 = _0x448474 - 0xa4;
      var _0x490755 = _0x2e5c87[_0x448474];
      return _0x490755;
    }),
    a0_0x4484(_0x3d25d3, _0x6467f6)
  );
}
Object[a0_0x4b47cc(0xc0)](exports, '__esModule', { value: !0x0 }),
  (exports[a0_0x4bbd5c(0xa5)] = void 0x0);
const UE = require('ue'),
  Log_1 = require(a0_0x4bbd5c(0xcb)),
  EventDefine_1 = require('../../Common/Event/EventDefine'),
  EventSystem_1 = require(a0_0x4b47cc(0xaf)),
  TimeUtil_1 = require('../../Common/TimeUtil'),
  ModelManager_1 = require(a0_0x4bbd5c(0xb8)),
  ThirdPartySdkManager_1 = require('../../Manager/ThirdPartySdkManager'),
  UiControllerBase_1 = require(a0_0x4b47cc(0xc9)),
  Heartbeat_1 = require('../Login/Heartbeat'),
  LogReportController_1 = require('../LogReport/LogReportController'),
  AntiCheatModel_1 = require(a0_0x4bbd5c(0xa8)),
  HEARTBEAT_EXCEPTION_FACTOR = 0.5,
  HEARTBEAT_REPORT_INTERVAL = TimeUtil_1[a0_0x3a4d06(0xaa)]['Hour'];
function a0_0x2e5c() {
  var _0x29a614 = [
    'wje',
    '1469175DXeNnt',
    'GetHeartbeatInterval',
    '3855176hoqaeI',
    'SendHeartbeat',
    'bje',
    'Pje',
    'Add',
    '../../Ui/Base/UiControllerBase',
    'CheckDebug',
    '../../../Core/Common/Log',
    'HasHeartbeatException',
    '9GgFtNn',
    'AntiCheatController',
    'xje',
    'ModelManager',
    './AntiCheatModel',
    'GetBundleData',
    'TimeUtil',
    '985509amfLgs',
    'ResetHeartbeatException',
    '645514EgpjzF',
    'SetUserInfoForTpSafe',
    '../../Common/Event/EventSystem',
    'GetHeartbeatData',
    'EEventName',
    'EventSystem',
    'Aje',
    'Heartbeat',
    '451656URfffq',
    'toString',
    '4pJFyDj',
    '../../Manager/ModelManager',
    '2049930pRDLEa',
    'GetServerTimeStamp',
    'LogReportController',
    'Bje',
    '187756zgxTNS',
    'KuroLauncherLibrary',
    'UiControllerBase',
    'defineProperty',
  ];
  a0_0x2e5c = function () {
    return _0x29a614;
  };
  return a0_0x2e5c();
}
class AntiCheatController extends UiControllerBase_1[a0_0x3a4d06(0xbf)] {
  static ['OnAddEvents']() {
    var _0x2520b8 = a0_0x4bbd5c,
      _0xc978af = a0_0x4b47cc,
      _0x44c18c = a0_0x3a4d06;
    EventSystem_1['EventSystem'][_0x2520b8(0xc8)](
      EventDefine_1[_0x2520b8(0xb1)]['ChangePlayerInfoId'],
      AntiCheatController['Aje']
    ),
      EventSystem_1[_0x2520b8(0xb2)]['Add'](
        EventDefine_1['EEventName']['SendHeartbeat'],
        AntiCheatController['Pje']
      );
  }
  static ['OnRemoveEvents']() {
    var _0x580567 = a0_0x4b47cc,
      _0x141109 = a0_0x3a4d06,
      _0x1154cf = a0_0x4bbd5c;
    EventSystem_1[_0x580567(0xb2)]['Remove'](
      EventDefine_1['EEventName']['ChangePlayerInfoId'],
      AntiCheatController['Aje']
    ),
      EventSystem_1['EventSystem']['Remove'](
        EventDefine_1['EEventName'][_0x141109(0xc5)],
        AntiCheatController[_0x580567(0xc7)]
      );
  }
  static [a0_0x4bbd5c(0xa6)]() {
    var _0x53019e = a0_0x3a4d06,
      _0x45a837 = a0_0x4bbd5c,
      _0x5a1fd6 = a0_0x4bbd5c,
      _0x598698;
    AntiCheatController[_0x53019e(0xc1)]() &&
      ((_0x598698 = AntiCheatModel_1['AntiCheatModel'][_0x45a837(0xa9)]()),
      LogReportController_1[_0x53019e(0xbb)]['LogReport'](_0x598698));
  }
  static [a0_0x4b47cc(0xc1)]() {
    var _0x5d01de = a0_0x4bbd5c;
    return 'iOS' === UE[_0x5d01de(0xbe)]['GetPlatform']();
  }
}
((exports['AntiCheatController'] = AntiCheatController)[
  a0_0x4b47cc(0xbc)
] = 0x0),
  (AntiCheatController[a0_0x4b47cc(0xc6)] = 0x0),
  (AntiCheatController[a0_0x3a4d06(0xb3)] = () => {
    var _0x2132a2 = a0_0x3a4d06,
      _0x847778 = a0_0x3a4d06,
      _0x46b4a6 = a0_0x4bbd5c,
      _0x54f822 = ModelManager_1[_0x2132a2(0xa7)]['PlayerInfoModel']['GetId']();
    ThirdPartySdkManager_1['ThirdPartySdkManager']['SetUserInfoForTpSafe'](
      _0x54f822[_0x847778(0xb6)](),
      _0x54f822
    ),
      AntiCheatController[_0x2132a2(0xa6)](),
      ThirdPartySdkManager_1['ThirdPartySdkManager'][_0x847778(0xae)]('0', 0x0);
  }),
  (AntiCheatController['Pje'] = () => {
    var _0x35a336 = a0_0x3a4d06,
      _0x3f6caa = a0_0x3a4d06,
      _0x576d9c = a0_0x3a4d06,
      _0x46cacd = TimeUtil_1[_0x35a336(0xaa)][_0x3f6caa(0xba)](),
      _0x2b5843 =
        (0.001 * (_0x46cacd - AntiCheatController[_0x35a336(0xc6)]) >=
          HEARTBEAT_REPORT_INTERVAL &&
          (ModelManager_1[_0x576d9c(0xa7)]['AntiCheatModel'][
            _0x576d9c(0xcc)
          ]() &&
            ((_0x2b5843 =
              ModelManager_1[_0x576d9c(0xa7)]['AntiCheatModel'][
                _0x3f6caa(0xb0)
              ]()),
            LogReportController_1[_0x576d9c(0xbb)]['LogReport'](_0x2b5843),
            ModelManager_1[_0x35a336(0xa7)]['AntiCheatModel'][
              _0x576d9c(0xac)
            ]()),
          (AntiCheatController[_0x576d9c(0xc6)] = _0x46cacd)),
        _0x46cacd - AntiCheatController[_0x35a336(0xbc)]),
      _0x8e6927 = Heartbeat_1[_0x3f6caa(0xb4)][_0x35a336(0xc3)](),
      _0x8e6927 = HEARTBEAT_EXCEPTION_FACTOR * _0x8e6927;
    0x0 < AntiCheatController[_0x35a336(0xbc)] &&
      _0x2b5843 <= _0x8e6927 &&
      (ModelManager_1['ModelManager']['AntiCheatModel'][
        'HitHeartbeatException'
      ](),
      Log_1['Log'][_0x3f6caa(0xca)]()) &&
      Log_1['Log']['Debug']('Net', 0x16, '心跳过快'),
      (AntiCheatController['Bje'] = _0x46cacd);
  });
