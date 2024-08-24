'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 }),
  (exports.EntityFilter = void 0);
const puerts_1 = require('puerts'),
  UE = require('ue');

class EntityFilter {
  static CollectList = [
    'Collect001', // Water Lily
    //"Collect001_1",// Water Lily_Base
    //"Collect001_2",// Water Lily_Combination
    'Collect002', // Climbing Fig
    'Collect003', // Iris
    'Collect004', // Contaminated Flame Mushroom
    'Collect005', // Lantern Fruit
    'Collect006', // Golden Trumpet
    'Collect007', // Poppy
    'Collect008', // Cloud Mushroom
    'Collect009', // Winter Bell
    'Collect010', // Purple Coral Tree
    'Collect011', // Golden Bell Fruit
    //"Collect011_1",// Golden Bell Fruit_Base
    //"Collect011_2",// Golden Bell Fruit_Combination
    'Collect101', // Pearl Grass
    'Collect102', // Cloud Dew
    'Collect103', // Night-blooming Jasmine
    'Collect104', // Winter Flower
    //"Collect104_1",// Winter Flower_Base
    //"Collect104_2",// Winter Flower_Combination
    'Collect105', // Aromatic Reed
    'Collect106', // Fragrant Herb
    'Collect107', // Lemongrass
    'Collect108', // Bone Orchid
    'Collect109', // Water Lantern Flower
    'Collect110', // Moon Algae
    'Collect111', // White Water Lily
    'Collect112', // Colorful Shell
    'Collect113', // Raindrop Snail
    'Collect114', // Indigo Violet
    'Collect115', // Cliff Fairy
    'Collect116', // Under the Umbrella Guest
    'Collect117', // Dragon Pearl
    //"Collect117_1",// Dragon Pearl_Base
    //"Collect117_2",// Dragon Pearl_Combination
    'Collect118', // Flower Fungus
    'Collect119', // Hidden Flame Husk
    //"Collect501",// Red Crystal Cluster
    //"Collect502",// Blue Crystal Cluster
    //"Collect503",// Glowing Crystal Cluster
    //"Collect504",// Plant Amber
    'Collect601', // Bird Egg
    //"Collect601_1",// Bird Egg_Combination
    //"Collect601_2",// Bird Egg_Combination
    'Collect602', // Animal Meat
    'Collect603', // Poultry Meat
    'Drop001', // Feather
    //"Collect604",// Gameplay_Eternal Night Bright
    'Collect_CXS01', // Silver Snow Lotus
    'Collect_CXS03', // Que Ling Fruit
    'Collect_CXS04', // Que Ling Fruit
    'Collect_CXS05', // Que Ling Fruit
    'Collect_CXS06', // Que Ling Fruit
    'Collect_CXS08', // Dragon Fruit
    'Collect_CXS09', // Dragon Fruit
  ];

  static CollectAnimal = [
    'Animal016', //霄凤蝶
    'Animal017', //赤羽蝶
    'Animal018', //蓝羽蝶
    'Animal019', //叶翅蛉
    'Animal020', //金环蜓
    'Animal021', //群彩1
    'Animal022', //群彩2
    'Animal023', //银月
    'Animal024', //焰鲤
    'Animal025', //黑棘鲼
    'Animal026', //银环蜥
    'Animal027', //蓝棘蜥
    'Animal028', //青竹蜥
    'Animal029', //黑纹蛙
    'Animal030', //金背蛙
    'Animal034', //溯空鱼
  ];

  static TreasureList = [
    'Treasure001', //TsEntity_简易物资箱_初始可开
    'Treasure002', //TsEntity_简易物资箱_黑石增生
    'Treasure003', //TsEntity_简易物资箱_玩法刷新
    'Treasure004', //TsEntity_标准物资箱_初始可开
    'Treasure005', //TsEntity_标准物资箱_黑石增生
    'Treasure006', //TsEntity_标准物资箱_玩法刷新
    'Treasure007', //TsEntity_豪华物资箱_初始可开
    'Treasure008', //TsEntity_豪华物资箱_黑石增生
    'Treasure009', //TsEntity_豪华物资箱_玩法刷新
    'Treasure010', //TsEntity_丰厚物资箱_初始可开
    'Treasure011', //TsEntity_幻象宝箱_金
    'Treasure012', //TsEntity_丰厚物资箱_玩法刷新
    'Treasure013', //TsEntity_简易物资箱_程序封锁
    'Treasure014', //TsEntity_标准物资箱_程序封锁
    'Treasure015', //TsEntity_丰厚物资箱_程序封锁
    'Treasure016', //TsEntity_豪华物资箱_程序封锁
    'Treasure017', //TsEntity_散落的物资箱_初始可开s
    'Treasure018', //TsEntity_标准物资箱_初始隐匿
    'Treasure019', //TsEntity_简易物资箱_初始隐匿
    'Treasure020', //TsEntity_丰厚物资箱_初始隐匿
    'Treasure021', //TsEntity_豪华物资箱_初始隐匿
    //"Treasure022",//TsEntity_简易物资箱_任务用
    //"Treasure023",//TsEntity_标准物资箱_任务用
    //"Treasure024",//TsEntity_丰厚物资箱_任务用
    //"Treasure025",//TsEntity_豪华物资箱_任务用
    //"Treasure031",//TsEntity_背包_X3
    'Treasure034', //TsEntity_调查光点_城区陆地
    'Treasure035', //TsEntity_调查光点_野外陆地
    'Treasure036', //TsEntity_调查光点_水域
  ];

  static CasketDelivery = [
    'Gameplay021', //声匣
    'Gameplay_CXS_4', //放置用_特色收集物_定风铎
    'Gameplay_CXS_14', //TsEntity_悬挂_特色收集物_定风铎
  ];
  static isFilter(blueprint, list) {
    return list.includes(blueprint);
  }
  static isneedLoot(blueprint) {
    return (
      this.CollectList.includes(blueprint) ||
      this.CollectAnimal.includes(blueprint)
    );
  }
  static isneedTreasure(blueprint) {
    return this.TreasureList.includes(blueprint);
  }

  static HeroEnergyFilterList = {
    BP_Sanhua_C_2147474035: 52, // needed specific can't be max
    // I learn some of them literally mean their energy bar count XD
    // "BP_Kakaluo_C_2147463050": 3, [] [] []
    // "BP_Yangyang_C_2147464895": 3  [] [] []
  };
}

exports.EntityFilter = EntityFilter;
