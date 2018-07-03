var UILayer = cc.Layer.extend({
    playerLayer: null,
    label: null,
    steplabel: null,
    memu:null,
    ctor: function (playerLayer) {
        this._super();
        this.playerLayer = playerLayer;
        var size = cc.director.getWinSize();
        this.label = new cc.LabelTTF("分数:0", "Arial", 40);
        this.steplabel = new cc.LabelTTF("步数: ", "Arial", 40);
        this.label.x = 200;
        this.label.y = size.height - 50;
        this.steplabel.x = 500;
        this.steplabel.y = size.height - 50;
        this.addChild(this.label);
        this.addChild(this.steplabel);
        this.schedule(this.update, 1);
    },
    update: function () {
        // console.log("111");
        this.steplabel.setString("步数:" + this.playerLayer.steps);
        this.label.setString("分数:" + this.playerLayer.score);
        if (this.playerLayer.score>=this.playerLayer.targetScore && this.playerLayer.steps>=0)
        {
            //var size = cc.winSize;
            //var startItem = new cc.MenuItemImage(
            //res.Win_png,
            //res.Win_png,
            //function () {
            //    this.playerLayer.level++;
            //    this.playerLayer.score = this.playerLayer.score + this.playerLayer.steps * 30;
            //    this.playerLayer.steps = Constant.levels[this.playerLayer.level].limitStep;
            //    this.playerLayer.targetScore = Constant.levels[this.playerLayer.level].targetScore;
            //    this.removeChild(this.menu);
            //}, this);
            //startItem.attr({
            //    x: size.width / 2,
            //    y: size.height / 2,
            //    anchorX: 0.5,
            //    anchorY: 0.5
            //});
            //this.menu = new cc.Menu(startItem);
            //this.menu.x = 0;
            //this.menu.y = 0;
            //this.addChild(this.menu, 1);
            this.playerLayer.level++;
            this.playerLayer.score = this.playerLayer.score + this.playerLayer.steps*30;
           // this.playerLayer.steps = 30;
            this.playerLayer.steps = Constant.levels[this.playerLayer.level].limitStep;
            //this.limitStep = 30;
            this.playerLayer.targetScore = Constant.levels[this.playerLayer.level].targetScore;
           // this.playerLayer.targetScore = 100;
        }
    }
});