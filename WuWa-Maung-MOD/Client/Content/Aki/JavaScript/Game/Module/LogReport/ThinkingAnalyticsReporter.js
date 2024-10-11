"use strict";
var a0_0x48f4e5 = a0_0x467e,
  a0_0x4fe26d = a0_0x467e,
  a0_0x5de224 = a0_0x467e;
(function (_0x41514e, _0x1f7cc8) {
  var _0x5446ec = a0_0x467e,
    _0x38f968 = a0_0x467e,
    _0x1c806a = a0_0x467e,
    _0x1d9330 = _0x41514e();
  while (!![]) {
    try {
      var _0x497a2e =
        (-parseInt(_0x5446ec(0x169)) / 0x1) *
          (-parseInt(_0x5446ec(0x163)) / 0x2) +
        (-parseInt(_0x5446ec(0x158)) / 0x3) *
          (-parseInt(_0x38f968(0x146)) / 0x4) +
        -parseInt(_0x38f968(0x150)) / 0x5 +
        -parseInt(_0x5446ec(0x162)) / 0x6 +
        (-parseInt(_0x1c806a(0x170)) / 0x7) *
          (parseInt(_0x5446ec(0x175)) / 0x8) +
        (-parseInt(_0x38f968(0x156)) / 0x9) *
          (parseInt(_0x1c806a(0x167)) / 0xa) +
        (parseInt(_0x1c806a(0x14b)) / 0xb) * (parseInt(_0x1c806a(0x14a)) / 0xc);
      if (_0x497a2e === _0x1f7cc8) break;
      else _0x1d9330["push"](_0x1d9330["shift"]());
    } catch (_0x418cdb) {
      _0x1d9330["push"](_0x1d9330["shift"]());
    }
  }
})(a0_0x58f9, 0x8e573);
var _a;
Object[a0_0x48f4e5(0x16a)](exports, "__esModule", { value: !0x0 }),
  (exports["ThinkingAnalyticsReporter"] = void 0x0);
const cpp_1 = require(a0_0x4fe26d(0x149)),
  puerts_1 = require(a0_0x48f4e5(0x161)),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  BaseConfigController_1 = require(a0_0x4fe26d(0x160)),
  ThinkDataLaunchReporter_1 = require(a0_0x48f4e5(0x165)),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require(a0_0x4fe26d(0x157)),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager");
function a0_0x467e(_0x18d02b, _0x57529a) {
  var _0x58f986 = a0_0x58f9();
  return (
    (a0_0x467e = function (_0x467efa, _0x53e82c) {
      _0x467efa = _0x467efa - 0x145;
      var _0x6e5769 = _0x58f986[_0x467efa];
      return _0x6e5769;
    }),
    a0_0x467e(_0x18d02b, _0x57529a)
  );
}
class ThinkingAnalyticsReporter {
  static [a0_0x48f4e5(0x15e)]() {
    var _0x25ab0a = a0_0x48f4e5,
      _0x3b0718 = a0_0x4fe26d,
      _0x10150d = a0_0x48f4e5;
    ThinkDataLaunchReporter_1[_0x25ab0a(0x16b)] &&
      (EventSystem_1[_0x3b0718(0x15f)]["Add"](
        EventDefine_1[_0x25ab0a(0x15b)]["OnGetPlayerBasicInfo"],
        ThinkingAnalyticsReporter[_0x3b0718(0x14c)],
      ),
      EventSystem_1["EventSystem"][_0x10150d(0x172)](
        EventDefine_1[_0x25ab0a(0x15b)]["LogOut"],
        ThinkingAnalyticsReporter[_0x25ab0a(0x154)],
      ),
      EventSystem_1[_0x3b0718(0x15f)]["Add"](
        EventDefine_1["EEventName"][_0x10150d(0x15c)],
        ThinkingAnalyticsReporter[_0x25ab0a(0x15a)],
      ));
  }
  static ["Report"](_0x33efcd, _0x1bb31d) {}
}
(exports[a0_0x48f4e5(0x151)] = ThinkingAnalyticsReporter),
  ((_a = ThinkingAnalyticsReporter)["h9"] = void 0x0),
  (ThinkingAnalyticsReporter[a0_0x5de224(0x14c)] = () => {
    var _0xfd7381 =
      ModelManager_1["ModelManager"]["PlayerInfoModel"]["GetId"]();
    UE["ThinkingAnalytics"]["Login"]("0");
  }),
  (ThinkingAnalyticsReporter[a0_0x5de224(0x154)] = () => {
    var _0x245a82 = a0_0x48f4e5;
    UE[_0x245a82(0x148)]["Logout"]();
  }),
  (ThinkingAnalyticsReporter["Qvi"] = () => {
    var _0x5f0ee7 = a0_0x4fe26d,
      _0x27504d = a0_0x4fe26d,
      _0x36feae = a0_0x5de224;
    if (
      ControllerHolder_1[_0x5f0ee7(0x145)]["KuroSdkController"][
        "GetIfGlobalSdk"
      ]()
    ) {
      var _0x44877a =
        ModelManager_1[_0x5f0ee7(0x152)][_0x27504d(0x173)]?.["GetServerId"]();
      let _0x23f78b = void 0x0;
      var _0xad7ef5 =
        BaseConfigController_1[_0x36feae(0x171)][_0x5f0ee7(0x159)](_0x44877a);
      if (
        (_0xad7ef5?.[_0x27504d(0x168)] &&
          ((_0x23f78b = _0xad7ef5[_0x36feae(0x168)]),
          Log_1[_0x36feae(0x14d)]["CheckInfo"]()) &&
          Log_1[_0x5f0ee7(0x14d)][_0x5f0ee7(0x153)](
            "Log",
            0x3,
            _0x36feae(0x155),
            ["ServerId", _0x44877a],
            [_0x5f0ee7(0x16c), _0x23f78b["AppID"]],
            [_0x27504d(0x176), _0x23f78b["URL"]],
          ),
        _0x23f78b)
      ) {
        var _0xad7ef5 = _0x23f78b["URL"],
          _0x327739 = _0x23f78b[_0x5f0ee7(0x16c)];
        if (UE["ThinkingAnalytics"][_0x5f0ee7(0x164)](0x0)) {
          let _0x21863a = !0x1;
          _0x44877a &&
            UE[_0x5f0ee7(0x148)]["GetServerUrl"](0x0) !== _0xad7ef5 &&
            (_0x21863a = !0x0),
            (_0x21863a =
              _0x327739 &&
              UE["ThinkingAnalytics"][_0x27504d(0x16e)](0x0) !== _0x327739
                ? !0x0
                : _0x21863a) && UE["ThinkingAnalytics"]["DestroyInstance"](0x0);
        }
        UE[_0x5f0ee7(0x148)][_0x27504d(0x16f)](
          _0xad7ef5,
          _0x327739,
          ThinkDataLaunchReporter_1[_0x5f0ee7(0x174)],
          ThinkDataLaunchReporter_1[_0x36feae(0x14f)],
          ThinkDataLaunchReporter_1["SEND_HTTP_TIMEOUT"],
          !0x0,
          ThinkDataLaunchReporter_1["CALIBRATE_INTERVAL"],
          ThinkDataLaunchReporter_1[_0x36feae(0x166)],
        ),
          UE[_0x27504d(0x148)]["CalibrateTime"](
            (0x0, puerts_1["toManualReleaseDelegate"])(_a["Xvi"]),
          ),
          Log_1[_0x27504d(0x14d)]["CheckInfo"]() &&
            Log_1["Log"][_0x36feae(0x153)](
              "Login",
              0xa,
              "数数上报实例已重新创建！",
            );
      } else
        Log_1["Log"][_0x27504d(0x15d)]() &&
          Log_1["Log"]["Error"](
            _0x5f0ee7(0x147),
            0xa,
            "未找到\x20" + _0x44877a + "\x20对应的数数上报配置",
          );
    }
  }),
  (ThinkingAnalyticsReporter["Xvi"] = (_0x495223) => {
    var _0x3f3a00 = a0_0x5de224,
      _0x4296f7 = a0_0x4fe26d,
      _0xf05fcd = a0_0x48f4e5;
    UE["ThinkingAnalytics"]["HasInstanceTimeCalibrated"](_0x495223) ||
      (Log_1[_0x3f3a00(0x14d)]["CheckInfo"]() &&
        Log_1["Log"]["Info"](_0x3f3a00(0x14e), 0xa, _0x4296f7(0x16d)));
  });
function a0_0x58f9() {
  var _0x274253 = [
    "ThinkingAnalyticsReporter",
    "ModelManager",
    "Info",
    "Kvi",
    "使用LoginServer的数数配置",
    "36ONfWPc",
    "../../Common/Event/EventSystem",
    "3gfLBif",
    "GetLoginServerById",
    "Qvi",
    "EEventName",
    "LoginSuccess",
    "CheckError",
    "Init",
    "EventSystem",
    "../../../Launcher/BaseConfig/BaseConfigController",
    "puerts",
    "5464332xSNzDW",
    "6IPrqfA",
    "HasInstanceInitialized",
    "../../../Launcher/ThinkDataReport/ThinkDataLaunchReporter",
    "CALIBRATE_STOP_TIMER",
    "29530XeECLh",
    "TDCfg",
    "81475wScLSC",
    "defineProperty",
    "ENABLE_THINKING_ANALYTICS",
    "AppID",
    "数数上报时间校准失败，可以因为以下问题导致：1.CDN数数上报配置错误；2.网络原因连接不上。",
    "GetAppId",
    "InitializeDefaultInsWithURL_Appid",
    "5140723JhUVBG",
    "BaseConfigController",
    "Add",
    "LoginModel",
    "EXIT_WAIT_TIME",
    "8gqqfWs",
    "URL",
    "ControllerHolder",
    "654644ssJAsZ",
    "Login",
    "ThinkingAnalytics",
    "cpp",
    "2136CGbwXp",
    "129866USRaFs",
    "Wvi",
    "Log",
    "LogReport",
    "MAX_PENDING_LOG",
    "1348020gAyfps",
  ];
  a0_0x58f9 = function () {
    return _0x274253;
  };
  return a0_0x58f9();
}
