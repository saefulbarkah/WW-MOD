'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 }),
  (exports.PlotSkipComponent = void 0);
const Log_1 = require('../../../../Core/Common/Log'),
  StringUtils_1 = require('../../../../Core/Utils/StringUtils'),
  EventDefine_1 = require('../../../Common/Event/EventDefine'),
  EventSystem_1 = require('../../../Common/Event/EventSystem'),
  PublicUtil_1 = require('../../../Common/PublicUtil'),
  ConfigManager_1 = require('../../../Manager/ConfigManager'),
  ControllerHolder_1 = require('../../../Manager/ControllerHolder'),
  ModelManager_1 = require('../../../Manager/ModelManager'),
  ModManager_1 = require('../../../Manager/ModManager'),
  UiManager_1 = require('../../../Ui/UiManager'),
  ConfirmBoxDefine_1 = require('../../ConfirmBox/ConfirmBoxDefine');
class PlotSkipComponent {
  constructor(i, t, e, o, s) {
    (this.dce = !1),
      (this.Zzi = void 0),
      (this.eZi = StringUtils_1.EMPTY_STRING),
      (this.tZi = !0),
      (this.iZi = void 0),
      (this.hca = void 0),
      (this.EnableSkipButton = (i) => {
        if (ModManager_1.ModManager.settings.PlotSkip) {
          this.dce = true;
          this.oZi.SetUIActive(this.dce);
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
        }
        // (i && !ModelManager_1.ModelManager.PlotModel.PlotConfig.CanSkip) ||
        //   this.dce === i ||
        //   ((this.dce = i), this.oZi.SetUIActive(this.dce), this.dce) ||
        //   (ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView(),
        //   UiManager_1.UiManager.IsViewOpen('SummaryPopView') &&
        //     UiManager_1.UiManager.CloseView('SummaryPopView'),
        //   this.Sra?.());
      }),
      (this.rZi = () => {
        var i;
        this.dce &&
          (this.NTt?.(),
          StringUtils_1.StringUtils.IsEmpty(this.hca)
            ? ModelManager_1.ModelManager.PlotModel.PlotConfig
                .IsSkipConfirmBoxShow
              ? ((this.tZi = !0),
                ((i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(180)).HasToggle =
                  !0),
                (i.ToggleText = this.eZi),
                i.SetToggleFunction(this.Cke),
                (i.AttachView = this.iZi),
                i.FunctionMap.set(1, () => {
                  this?.dce && this.Sra?.();
                }),
                i.FunctionMap.set(2, () => {
                  this?.dce &&
                    ((ModelManager_1.ModelManager.PlotModel.PlotConfig.IsSkipConfirmBoxShow =
                      this.tZi),
                    (this.dce = !1),
                    this.nZi?.());
                }),
                ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                  i
                ))
              : this.nZi?.()
            : (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug('Plot', 27, '剧情梗概', ['text', this.hca]),
              (i = {
                Text: this.hca,
                ConfirmFunc: () => {
                  this?.dce && ((this.dce = !1), this.nZi?.());
                },
                CancelFunc: () => {
                  this?.dce && this.Sra?.();
                },
              }),
              UiManager_1.UiManager.OpenView('SummaryPopView', i)));
      }),
      (this.Cke = (i) => {
        this?.dce && (this.tZi = !i);
      }),
      (this.Zzi = i),
      (this.oZi = i.RootUIComp),
      (this.nZi = t),
      (this.NTt = e),
      (this.Sra = s),
      (this.iZi = o),
      (this.dce = !1),
      (this.hca = void 0),
      this.Zzi.OnClickCallBack.Bind(this.rZi),
      (this.eZi = ConfigManager_1.ConfigManager.TextConfig?.GetTextById(
        'PlotSkipConfirmToggle'
      )),
      StringUtils_1.StringUtils.IsEmpty(this.eZi) &&
        (ControllerHolder_1.ControllerHolder.FlowController.LogError(
          '剧情跳过二次确认框读不到Toggle文本 "PlotSkipConfirmToggle"'
        ),
        (this.eZi = ''));
  }
  OnClear() {
    (this.dce = !1),
      this.Zzi?.OnClickCallBack.Unbind(),
      (this.Zzi = void 0),
      (this.oZi = void 0),
      (this.iZi = void 0),
      (this.hca = void 0),
      (this.nZi = void 0),
      (this.NTt = void 0),
      (this.Sra = void 0),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.EnableSkipPlot,
      this.EnableSkipButton
    );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.EnableSkipPlot,
      this.EnableSkipButton
    );
  }
  AddSummary(i) {
    i &&
      !StringUtils_1.StringUtils.IsEmpty(i.TidOutline) &&
      ((i = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(i.TidOutline)),
      (this.hca =
        ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(i)));
  }
}
exports.PlotSkipComponent = PlotSkipComponent;