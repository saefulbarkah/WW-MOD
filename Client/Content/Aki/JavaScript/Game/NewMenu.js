'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 }),
  (exports.NewMenu = void 0);
const puerts_1 = require('puerts'),
  ResourceSystem_1 = require('../Core/Resource/ResourceSystem'),
  GlobalData_1 = require('../Game/GlobalData'),
  UE = require('ue');

class NewMenu {
  constructor() {
    this.LoadMenu();
  }

  static Menu = null;
  static loadMenuInterval = null;

  LoadMenu() {
    NewMenu.loadMenuInterval = setInterval(() => {
      NewMenu.Start();
    }, 3000);
  }

  static async Start() {
    this.Menu = UE.UMGManager.CreateWidget(
      GlobalData_1.GlobalData.World,
      ResourceSystem_1.ResourceSystem.Load(
        '/Game/Aki/ModMenu.ModMenu_C',
        UE.Class
      )
    );

    if (this.Menu) {
      this.Menu.AddToViewport();
      this.Menu.SetVisibility(0);
      clearInterval(this.loadMenuInterval);
    } else {
      puerts_1.logger.error({
        type: 'Failed load UI',
        msg: 'Failed to create widget. Ensure the asset path and class are correct.',
      });
    }
  }
}
exports.NewMenu = NewMenu;
