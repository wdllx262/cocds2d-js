var HeroB = cc.Sprite.extend({
    _targetX: 400,
    _targetY: 400,
    _animation: null,
    _fast: false,
    ctor:function()
    {
        cc.spriteFrameCache.addSpriteFrames("res/graphics/texture.plist");
        this._super("#fly_0001.png");
        this._animation = new cc.Animation();
        for (var i=1;i<20;i++)
        {
            //this._animation.addSpriteFrame(cc.spriteFrameCache.getSpriteFrame("#fly_00" + (i < 10 ? ('0' + i) : i) + ".png"));
            this._animation.addSpriteFrame(cc.spriteFrameCache.getSpriteFrame("fly_00" + (i < 10 ? ('0' + i) : i) + ".png"));
        }
        this._animation.setDelayPerUnit(1 / 20);
        var animate = new cc.Animate(this._animation).repeatForever();
        this.runAction(animate);
        this.scheduleUpdate();
    },
    update:function()
    {
        this.fly();
        this.rotate();
        if (HeroBGame.user.coffeeValue > 0) {
            HeroBGame.user.coffeeValue -= 0.5;
            HeroBGame.user.speed = 100;
        } else
        {
            HeroBGame.user.coffeeValue = -10;
            HeroBGame.user.speed = 50;
        }
            

        if (HeroBGame.user.mushroomValue > 0)
            HeroBGame.user.mushroomValue -= 0.5;
    },
    fly:function()
    {
        this.x += (HeroBGame.user.targetX - this.x) * 0.1;
        this.y += (HeroBGame.user.targetY - this.y) * 0.1;
    },
    rotate: function () {
        var angle = -(HeroBGame.user.targetY - this.y) * 0.2;
        this.attr({
            rotation: angle
        });
    },
    toggleSpeed:function(fast) {
    if(fast == this._fast)
        return;
    this._fast = fast;
    this.stopAllActions();
    if(!fast)
        this._animation.setDelayPerUnit(1/20);
    else
        this._animation.setDelayPerUnit(1/60);
    var action = cc.animate(this._animation).repeatForever();
    this.runAction(action);
}

});