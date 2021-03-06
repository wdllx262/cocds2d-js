﻿var HeroBMainScene = cc.Scene.extend({
    _foodManager: null,
    _hero: null,
    _coffee: null,
    _mushroom: null,
    onEnter:function()
    {
        this._super();
        var size = cc.winSize;
        var bg = new HeroBBGLayer();
        this.addChild(bg);
        var ui = new HeroBUILayer();
        this.addChild(ui);
        this._foodManager = new HeroAFoodManager(this);
        //this.addChild(this._foodManager);
        this._hero = new HeroB();
        this.addChild(this._hero);
        this._hero.x = 100;
        this._hero.y = 100;
        this._hero._targetX = size.width / 2;
        this._hero._targetY = size.height / 2;
        var listener = cc.EventListener.create({
            event: cc.EventListener.MOUSE,
            onMouseMove: function (event) {
                var pos = event.getLocation();
                HeroBGame.user.targetX = pos.x;
                HeroBGame.user.targetY = pos.y;
            }.bind(this)
        });
        cc.eventManager.addListener(listener, this);
        this.scheduleUpdate();
        HeroBLogicSound.playMusic();
    },
    update: function (time) {
        this._foodManager.update(this._hero, time);
        if (HeroBGame.user.coffeeValue > 0) {
            this.showCoffee();
        } else {
            this.stopCoffee();
        }
        if (HeroBGame.user.mushroomValue > 0) {
            this.showMushroom();
        } else {
            this.stopMushroom();
        }
    },
    showCoffee: function () {
        if (this._coffee == null) {
            this._coffee = new cc.ParticleSystem(res.coffee);
            this.addChild(this._coffee);
        }else
        {
            this._coffee.x = this._hero.x - this._hero.width/2;
            this._coffee.y = this._hero.y;
        }
       
    },
stopCoffee: function () {
    if (this._coffee) {
        this.removeChild(this._coffee);
        this._coffee.stopSystem();
        this._coffee = null;
    }

},
showMushroom: function () {
    if (this._mushroom == null) {
        this._mushroom = new cc.ParticleSystem(res.mushroom);
        this.addChild(this._mushroom);
    }else
    {
        this._mushroom.x = this._hero.x - this._hero.width / 2;
        this._mushroom.y = this._hero.y;
    }
       
},
stopMushroom: function () {
    if (this._mushroom) {
        this.removeChild(this._mushroom);
        this._mushroom.stopSystem();
        this._mushroom = null;
    }

}
})