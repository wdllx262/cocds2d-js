var HeroBSound = cc.MenuItemToggle.extend({
    num:0,
    ctor: function () {

        var sprite = this.createSpreite();
        this._super(
            new cc.MenuItemSprite(sprite, null, null),
            new cc.MenuItemImage("#soundOff.png", "#soundOff.png", null)
            );
        this.setCallback(this.soundOnOff, this);
    },
    createSpreite: function () {
        var sprite = new cc.Sprite("#soundOn0000.png");
        //建立Animation，
        var animation = new cc.Animation();
        animation.addSpriteFrame(cc.spriteFrameCache.getSpriteFrame("soundOn0000.png"));
        animation.addSpriteFrame(cc.spriteFrameCache.getSpriteFrame("soundOn0001.png"));
        animation.addSpriteFrame(cc.spriteFrameCache.getSpriteFrame("soundOn0002.png"));
        animation.setDelayPerUnit(1 / 3);
        //建立Animate动画
        var animate = cc.animate(animation);
        sprite.runAction(animate).repeatForever();
        return sprite;
    },
    soundOnOff: function () {
        this.num++;
        if (this.num % 2 == 1)
            HeroBLogicSound.stopMusic();
        else HeroBLogicSound.playMusic();
        //roBLogicSound.stopMusic();
        console.log("soundonoff");
    }
});