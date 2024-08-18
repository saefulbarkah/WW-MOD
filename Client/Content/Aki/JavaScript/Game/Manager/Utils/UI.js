'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 }),
  (exports.UI = void 0);
const UE = require('ue'),
  ConfirmBox = require('../../Module/ConfirmBox/ConfirmBoxController'),
  ConfirmBoxDefine = require('../../Module/ConfirmBox/ConfirmBoxDefine'),
  ScrollingTipsController_1 = require('../../Module/ScrollingTips/ScrollingTipsController');

class UI {
  static ShowTip(string) {
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(string);
  }

  static ShowConfirmBox({ title, desc, id }) {
    const newBox = new ConfirmBoxDefine.ConfirmBoxDataNew(id);
    newBox.SetTitle(title);
    newBox.SetTextArgs(desc);
    ConfirmBox.ConfirmBoxController.ShowConfirmBoxNew(newBox);
  }
}

exports.UI = UI;
