var SushiSprite = cc.Sprite.extend({
    disappearAction: null,
    ctor: function () {
        this._super("res/sushi_1n.png");


        this.addTouchEventListenser();
        cc.spriteFrameCache.addSpriteFrames("res/sushi.plist");
        cc.log("touched");
        this.disappearAction = this.addAnimate();
        this.disappearAction.retain();

    },
    addTouchEventListenser: function () {
        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,            
            onTouchBegan: function (touch, event) {
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                if (cc.rectContainsPoint(target.getBoundingBox(), pos)) {
                    cc.log("touched")

                    target.stopAllActions();

                    var action = target.disappearAction;
                    var actionFun = cc.callFunc(
                        function () { target.removeFromParent(); },
                        target);

                    var seq = cc.sequence(action, actionFun);
                    target.runAction(seq);




                    return true;
                }
                return false;
            }
        });
        cc.eventManager.addListener(this.touchListener, this);
    },

    addAnimate: function () {
        var frames = [];
        for (var i = 0; i < 11; i++) {
            var item = cc.spriteFrameCache.getSpriteFrame("sushi_1n_" + i + ".png")

            frames.push(item);
        }
        var animation = new cc.Animation(frames, 0.02);

        var action = new cc.Animate(animation);
        return action;

    },

    onExit: function () {
        cc.log("onExit");
        this.disappearAction.release();
        this._super();
    },


});