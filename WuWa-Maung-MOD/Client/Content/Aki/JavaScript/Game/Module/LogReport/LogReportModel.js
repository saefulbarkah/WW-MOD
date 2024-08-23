'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 }),
  (exports.LogReportModel = void 0);
const ModelBase_1 = require('../../../Core/Framework/ModelBase'),
  TimeUtil_1 = require('../../Common/TimeUtil'),
  LogReportController_1 = require('./LogReportController'),
  LogReportDefine_1 = require('./LogReportDefine'),
  RECORD_HANG_UP_OFFSET = 30;
class LogReportModel extends ModelBase_1.ModelBase {
  static get HangUpTime() {
    return this.Vvi;
  }
  static RecordOperateTime(e = !1, i = '', t = 0) {
    var o = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    if ((0 === this.Hvi && (this.Hvi = o), e && i)) {
      if ((0 === (e = this.jvi.get(i)) && this.jvi.set(i, t), e === t)) return;
      this.jvi.set(i, t);
    }
    (e = (o - this.Hvi) * TimeUtil_1.TimeUtil.Millisecond) > 30 &&
      ((this.Vvi += e),
      ((i = new LogReportDefine_1.HangUpTimeLogData()).f_hang_up_time =
        e.toString())),
      (this.Hvi = o);
  }
}
((exports.LogReportModel = LogReportModel).Hvi = 0),
  (LogReportModel.Vvi = 0),
  (LogReportModel.jvi = new Map());
