'use strict';
var a0_0x3d0758 = a0_0x1b88,
  a0_0x49f107 = a0_0x1b88,
  a0_0x2b9c4b = a0_0x1b88;
(function (_0x58cf72, _0x535192) {
  var _0x10fc33 = a0_0x1b88,
    _0x2e15d7 = a0_0x1b88,
    _0x5aa7ae = a0_0x1b88,
    _0x569b82 = _0x58cf72();
  while (!![]) {
    try {
      var _0x2a4345 =
        -parseInt(_0x10fc33(0x1dd)) / 0x1 +
        (parseInt(_0x2e15d7(0x20c)) / 0x2) *
          (parseInt(_0x10fc33(0x215)) / 0x3) +
        (-parseInt(_0x10fc33(0x21f)) / 0x4) *
          (-parseInt(_0x2e15d7(0x20f)) / 0x5) +
        (-parseInt(_0x5aa7ae(0x1f4)) / 0x6) *
          (-parseInt(_0x5aa7ae(0x1f9)) / 0x7) +
        (-parseInt(_0x10fc33(0x200)) / 0x8) *
          (parseInt(_0x5aa7ae(0x1e4)) / 0x9) +
        -parseInt(_0x10fc33(0x1ee)) / 0xa +
        (parseInt(_0x10fc33(0x1e9)) / 0xb) * (parseInt(_0x5aa7ae(0x1e8)) / 0xc);
      if (_0x2a4345 === _0x535192) break;
      else _0x569b82['push'](_0x569b82['shift']());
    } catch (_0x5c6428) {
      _0x569b82['push'](_0x569b82['shift']());
    }
  }
})(a0_0x2037, 0x26203);
function a0_0x1b88(_0x8c46ec, _0x1f23a7) {
  var _0x20372c = a0_0x2037();
  return (
    (a0_0x1b88 = function (_0x1b888f, _0x5a7c5d) {
      _0x1b888f = _0x1b888f - 0x1d8;
      var _0x2e92de = _0x20372c[_0x1b888f];
      return _0x2e92de;
    }),
    a0_0x1b88(_0x8c46ec, _0x1f23a7)
  );
}
var _a;
Object['defineProperty'](exports, a0_0x3d0758(0x210), { value: !0x0 }),
  (exports['LogUpload'] = void 0x0);
const cpp_1 = require(a0_0x3d0758(0x222)),
  puerts_1 = require(a0_0x49f107(0x1f3)),
  UE = require('ue'),
  Info_1 = require(a0_0x2b9c4b(0x1de)),
  Log_1 = require('../../../Core/Common/Log'),
  Net_1 = require('../../../Core/Net/Net'),
  BaseConfigController_1 = require(a0_0x49f107(0x214)),
  NetworkDefine_1 = require(a0_0x3d0758(0x1fc)),
  LocalStorage_1 = require(a0_0x2b9c4b(0x213)),
  LocalStorageDefine_1 = require(a0_0x2b9c4b(0x1f6)),
  ControllerHolder_1 = require(a0_0x49f107(0x20a)),
  ModelManager_1 = require(a0_0x49f107(0x20b));
class LogUpload {
  static [a0_0x2b9c4b(0x1e6)]() {
    var _0x4400e6 = a0_0x2b9c4b,
      _0x3fa1fe = a0_0x3d0758,
      _0xf848a3 = a0_0x49f107;
    UE[_0x4400e6(0x1fb)]['EnableAuthorization'](!0x1);
    var _0x45d437 =
      BaseConfigController_1['BaseConfigController'][
        'GetCdnReturnConfigInfo'
      ]()?.[_0x4400e6(0x1ef)];
    _0x45d437
      ? UE[_0x3fa1fe(0x1fb)][_0x4400e6(0x1f8)](
          '',
          '',
          _0x45d437[_0xf848a3(0x226)],
          _0x45d437['region']
        )
      : Log_1['Log']['CheckError']() &&
        Log_1['Log'][_0x4400e6(0x208)]('LogUpload', 0xa, _0xf848a3(0x1e0)),
      UE['KuroTencentCOSLibrary'][_0xf848a3(0x211)](this[_0xf848a3(0x21c)]),
      UE['KuroTencentCOSLibrary']['SetHandleFunc'](
        (0x0, puerts_1[_0x4400e6(0x1dc)])(this['PreSendFiles']),
        (0x0, puerts_1[_0x3fa1fe(0x1dc)])(this[_0x4400e6(0x1e1)])
      ),
      this[_0x4400e6(0x217)] &&
        (Info_1['Info']['IsPcOrGamepadPlatform']() &&
          UE['KuroTencentCOSLibrary'][_0x3fa1fe(0x1e5)](),
        Info_1['Info'][_0xf848a3(0x224)]()) &&
        UE['KuroLauncherLibrary'][_0xf848a3(0x206)]() ===
          NetworkDefine_1[_0xf848a3(0x212)]['WiFi'] &&
        UE['KuroTencentCOSLibrary']['SendLogToTencentCOS'](
          (0x0, puerts_1['toManualReleaseDelegate'])(this[_0xf848a3(0x1e3)])
        );
  }
  static ['zvi'](_0x24eb0c) {
    return UE['KuroStaticLibrary']['DirectoryExists'](_0x24eb0c);
  }
  static ['Zvi']() {
    var _0x274234 = a0_0x2b9c4b,
      _0x2660ed = a0_0x3d0758,
      _0x1a2a7b = a0_0x2b9c4b;
    this[_0x274234(0x1f2)]();
    let _0x1a1491 = '';
    '' !== this['ae'] && (_0x1a1491 = this['ae'] + '-');
    var _0x3fb81a = new Date(),
      _0x3fb81a =
        _0x3fb81a[_0x2660ed(0x1fe)]() +
        '.' +
        (_0x3fb81a[_0x274234(0x1e7)]() + 0x1) +
        '.' +
        _0x3fb81a['getDate']() +
        '-' +
        _0x3fb81a['getHours']() +
        '.' +
        _0x3fb81a[_0x1a2a7b(0x1df)]() +
        '.' +
        _0x3fb81a[_0x2660ed(0x1ff)]();
    return '' === this[_0x2660ed(0x21a)]
      ? _0x1a1491 + _0x3fb81a + _0x2660ed(0x21b)
      : this[_0x274234(0x21a)] + '-' + _0x1a1491 + _0x3fb81a + _0x1a2a7b(0x21b);
  }
  static ['SendLog'](_0x36b909) {}
  static [a0_0x49f107(0x1f2)]() {
    var _0x13d2fe = a0_0x3d0758,
      _0x28afa2 = a0_0x49f107,
      _0x721937 = a0_0x49f107;
    let _0x325fec = '';
    var _0x584981;
    Net_1['Net'][_0x13d2fe(0x228)]()
      ? (_0x325fec = ModelManager_1[_0x13d2fe(0x223)][_0x28afa2(0x209)]
          [_0x721937(0x219)]()
          ['toString']())
      : void 0x0 !==
          (_0x584981 = LocalStorage_1['LocalStorage']['GetGlobal'](
            LocalStorageDefine_1[_0x721937(0x21d)]['RecentlyLoginUID']
          )) && (_0x325fec = _0x584981['toString']());
    let _0x2e8669 = '0';
    ControllerHolder_1['ControllerHolder'][_0x721937(0x1f0)][
      _0x13d2fe(0x1f1)
    ]() &&
      (_0x2e8669 = ModelManager_1[_0x13d2fe(0x223)][_0x721937(0x1f7)][
        _0x721937(0x227)
      ]()?.[_0x721937(0x216)]
        ? ModelManager_1[_0x13d2fe(0x223)]['LoginModel']
            ['GetSdkLoginConfig']()
            ['Uid']['toString']()
        : '0'),
      (this[_0x13d2fe(0x21a)] = _0x2e8669 + '-' + _0x325fec),
      Log_1['Log'][_0x721937(0x225)]() &&
        Log_1['Log']['Info']('Log', 0x26, '获取日志上传UID', [
          _0x13d2fe(0x202),
          this['tMi'],
        ]);
  }
}
function a0_0x2037() {
  var _0x154244 = [
    'KuroSdkController',
    'CanUseSdk',
    'eMi',
    'puerts',
    '6Muwtyu',
    'push',
    '../../Common/LocalStorageDefine',
    'LoginModel',
    'SetSendLogConfig',
    '875686effybP',
    'iMi',
    'KuroTencentCOSLibrary',
    '../../../Launcher/NetworkDefine',
    'log',
    'getFullYear',
    'getSeconds',
    '2185112ZHozyU',
    'length',
    'UID',
    'sort',
    'KuroLoggingLibrary',
    'includes',
    'GetNetworkConnectionType',
    'startsWith',
    'Error',
    'PlayerInfoModel',
    '../../Manager/ControllerHolder',
    '../../Manager/ModelManager',
    '4HsEVYv',
    'filter',
    '$unref',
    '590rARCkU',
    '__esModule',
    'SetAdmissibleValue',
    'ENetworkType',
    '../../Common/LocalStorage',
    '../../../Launcher/BaseConfig/BaseConfigController',
    '237738AeNAQo',
    'Uid',
    'Yvi',
    'Paths',
    'GetId',
    'tMi',
    '.zip',
    '$vi',
    'ELocalStorageGlobalKey',
    'stringify',
    '5884CItMJK',
    'Num',
    'LoadFileToString',
    'cpp',
    'ModelManager',
    'IsMobilePlatform',
    'CheckInfo',
    'name',
    'GetSdkLoginConfig',
    'IsServerConnected',
    'SetSendLogZipName',
    'GetLogFilename',
    'BlueprintPathsLibrary',
    'NewArray',
    'toManualReleaseDelegate',
    '136099tLjqCd',
    '../../../Core/Common/Info',
    'getMinutes',
    'CDN下发数据未配置腾讯云对象存储相关配置！',
    'PostSended',
    'SetIsAutoSend',
    'Jvi',
    '9jBclxn',
    'EnableAutoSendWhenExit',
    'Init',
    'getMonth',
    '1879584ocCbeW',
    '11ceTohn',
    'LogUpload',
    'KuroStaticLibrary',
    'rMi',
    'oMi',
    '483990CbZSbQ',
    'LogReport',
  ];
  a0_0x2037 = function () {
    return _0x154244;
  };
  return a0_0x2037();
}
(exports[a0_0x49f107(0x1ea)] = LogUpload),
  ((_a = LogUpload)[a0_0x49f107(0x217)] = !0x1),
  (LogUpload[a0_0x3d0758(0x21c)] = 0x5),
  (LogUpload['ae'] = ''),
  (LogUpload['iMi'] = 0x14),
  (LogUpload['tMi'] = ''),
  (LogUpload[a0_0x49f107(0x1ed)] = 'Logs/Sendedlogs.json'),
  (LogUpload[a0_0x49f107(0x1ec)] = void 0x0),
  (LogUpload['Jvi'] = (_0x5b4a68, _0x3ecc30) => {
    var _0x335f81 = a0_0x2b9c4b,
      _0x1b8404 = a0_0x2b9c4b;
    (0x5 !== _0x5b4a68 && 0x4 !== _0x5b4a68) ||
      UE[_0x335f81(0x1fb)][_0x1b8404(0x1e2)](!0x1);
  }),
  (LogUpload['PostSended'] = (_0x4ff55a) => {
    var _0x16587c = a0_0x3d0758,
      _0x355029 = a0_0x49f107,
      _0x1eda90 = a0_0x2b9c4b;
    _a[_0x16587c(0x1ec)] || (_a['rMi'] = { Paths: [] });
    var _0x3cce7b = cpp_1[_0x355029(0x204)][_0x355029(0x1d9)](),
      _0x300bcb = _0x4ff55a[_0x16587c(0x220)]();
    for (let _0x883547 = 0x0; _0x883547 < _0x300bcb; _0x883547++) {
      var _0x3c7915 = _0x4ff55a['Get'](_0x883547);
      _0x3c7915['endsWith'](_0x3cce7b) ||
        _a['rMi'][_0x16587c(0x218)][_0x1eda90(0x205)](_0x3c7915) ||
        _a[_0x1eda90(0x1ec)][_0x1eda90(0x218)][_0x355029(0x1f5)](_0x3c7915);
    }
    UE['KuroStaticLibrary']['SaveStringToFile'](
      JSON[_0x355029(0x21e)](_a[_0x16587c(0x1ec)]),
      UE[_0x16587c(0x1da)]['ProjectSavedDir']() + _a[_0x16587c(0x1ed)]
    );
  }),
  (LogUpload['PreSendFiles'] = (_0x2d035d) => {
    var _0x27238f = a0_0x2b9c4b,
      _0x4e78da = a0_0x49f107,
      _0x573026 = a0_0x49f107,
      _0x197dce = UE[_0x27238f(0x1db)](UE['BuiltinString']);
    let _0x107402 = [];
    var _0x7ae633 = _0x2d035d[_0x4e78da(0x220)]();
    for (let _0x4c3a3b = 0x0; _0x4c3a3b < _0x7ae633; _0x4c3a3b++) {
      var _0x5c6841 = _0x2d035d['Get'](_0x4c3a3b);
      if (!_a['zvi'](_0x5c6841)) {
        var _0x162012 = _0x5c6841['split']('/'),
          _0x162012 = _0x162012[_0x162012[_0x27238f(0x201)] - 0x1],
          _0x26167e = _0x162012['split']('.');
        let _0x47554c = void 0x0;
        0x1 < _0x26167e[_0x27238f(0x201)] &&
          (_0x47554c = _0x26167e[_0x26167e[_0x27238f(0x201)] - 0x1]),
          !_0x162012[_0x27238f(0x207)]('Client') ||
            _0x162012[_0x4e78da(0x207)]('Client_') ||
            (!_0x47554c && _0x4e78da(0x1fd) !== _0x47554c) ||
            (_0x162012[_0x4e78da(0x207)]('Client-')
              ? _0x107402[_0x27238f(0x1f5)](_0x5c6841)
              : _0x197dce['Add'](_0x5c6841));
      }
    }
    var _0xa95a0b,
      _0x56a8a5,
      _0x33f196 =
        UE['BlueprintPathsLibrary']['ProjectSavedDir']() + _a[_0x27238f(0x1ed)];
    UE[_0x27238f(0x1eb)]['FileExists'](
      UE[_0x27238f(0x1da)]['ProjectSavedDir']() + _a[_0x573026(0x1ed)]
    ) &&
      ((_0x56a8a5 = ((_0xa95a0b = ''), puerts_1['$ref'])('')),
      UE[_0x573026(0x1eb)][_0x27238f(0x221)](_0x56a8a5, _0x33f196),
      (_0xa95a0b = (0x0, puerts_1[_0x4e78da(0x20e)])(_0x56a8a5)),
      (_a['rMi'] = JSON['parse'](_0xa95a0b)),
      (_a['rMi']['Paths'] = _a[_0x573026(0x1ec)]['Paths'][_0x573026(0x20d)](
        (_0x459cd9) => _0x107402['includes'](_0x459cd9)
      ))),
      _0x107402[_0x573026(0x201)] > _a[_0x4e78da(0x1fa)] &&
        (_0x107402[_0x573026(0x203)](),
        _0x107402['splice'](
          0x0,
          _0x107402[_0x4e78da(0x201)] - _a[_0x4e78da(0x1fa)]
        )),
      0x0 <
        (_0x107402 = _a['rMi']
          ? _0x107402['filter'](
              (_0x10a343) =>
                !_a[_0x4e78da(0x1ec)][_0x573026(0x218)][_0x27238f(0x205)](
                  _0x10a343
                )
            )
          : _0x107402)['length'] &&
        (_0x33f196 = /\d{4}.\d{1,2}.\d{1,2}-\d{1,2}.\d{1,2}.\d{1,2}/['exec'](
          _0x107402[0x0]
        )) &&
        0x0 < _0x33f196?.[_0x573026(0x201)] &&
        (_a['ae'] = _0x33f196[0x0]);
    for (const _0x12ef7f of _0x107402) _0x197dce['Add'](_0x12ef7f);
    UE['KuroTencentCOSLibrary']['SetFilesToSend'](_0x197dce),
      UE['KuroTencentCOSLibrary'][_0x27238f(0x1d8)](_a['Zvi']());
  });
