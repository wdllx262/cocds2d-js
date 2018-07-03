var HeroAItem = cc.Sprite.extend({
    type: null,
    ctor: function (type) {

        this._super("#item" + type + ".png");
        this.type = type;

    },
    reuse: function (type) {
        this.setSpriteFrame("item" + type + ".png");
        this.type = type;
    },
    unuse: function () {

    }

});
HeroAItem.create = function () {
    var type = Math.floor(Math.random() * 7) + 1;
    if (cc.pool.hasObject(HeroAItem)) {
        return cc.pool.getFromPool(HeroAItem, type);
    }
    else {
        return new HeroAItem(type);
    }
}
