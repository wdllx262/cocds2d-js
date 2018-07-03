var HeroBBGLayer = cc.Layer.extend({
    bg1: null,
    bg2: null,
    bg3: null,
    bg4: null,
    ctor: function () {
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.heroplist);
        var parallaxLayer = function (element) {
            var tempLayer = new cc.Layer();
            var item1 = new cc.Sprite(element);
            item1.x = item1.width / 2;
            item1.y = item1.height / 2;
            tempLayer.addChild(item1);
            var item2 = new cc.Sprite(element);
            item2.x = item2.width / 2 + item2.width;
            item2.y = item2.height / 2;
            tempLayer.addChild(item2);
            return tempLayer;
        }
        var size = cc.winSize;
        this.bg1 = parallaxLayer(res.BGpng);
        this.addChild(this.bg1);
        this.bg2 = parallaxLayer("#bgLayer2.png");
        this.addChild(this.bg2);
        this.bg3 = parallaxLayer("#bgLayer3.png");
        this.addChild(this.bg3);
        this.bg4 = parallaxLayer("#bgLayer4.png");
        this.addChild(this.bg4);
        // this.schedule();
        this.scheduleUpdate();
    },
    update: function () {
        this.bg1.x -= HeroBGame.user.speed * 0.1;
        if (this.bg1.x < -(this.bg1.width/2)) this.bg1.x = 0;
        this.bg2.x -= HeroBGame.user.speed * 0.3;
        if (this.bg2.x < -(this.bg2.width)) this.bg2.x = 0;
        this.bg3.x -= HeroBGame.user.speed * 0.5;
        if (this.bg3.x < -(this.bg3.width)) this.bg3.x = 0;
        this.bg4.x -= HeroBGame.user.speed * 1;
        if (this.bg4.x < -(this.bg4.width)) this.bg4.x = 0;
    }
});