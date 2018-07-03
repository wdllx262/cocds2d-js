var HeroAFoodManager = cc.Class.extend({
    _scene: null,
    _food: null,
    _items: null,
    _pattern: 1,
    _count: 0,
    _distance: 0,
    _positionY:0,
    ctor: function (scene) {
        cc.spriteFrameCache.addSpriteFrames("res/graphics/texture.plist");
        this._scene = scene;
        this._items = [];
    },
    update: function (hero,time) {
        this._count++;
        this.createPattern(time);
        this.createItem(time);
        this.animateItem(hero,time);

    },
    createPattern: function (time) {
        var size = cc.winSize;
        if (this._distance > 0) {
            //this._distance--;
            return;
        }
        this._pattern = Math.floor(Math.random() * 2) + 1;
        switch (this._pattern) {
            case 1://随机
                this._distance = 100;
                break;
            case 2://水平
                this._distance = 110;
                this._positionY = Math.floor(Math.random() * (size.height-100)) +50 ;
                break;
            case 3:
                this._distance = 110;
                break;
            case 4:
                this._distance = 100 + Math.random() * 10;
                break;
        }
    },
    createItem: function (time) {
        switch (this._pattern) {
            case 1:
                this._distance -= HeroBGame.user.speed * time;
                var size = cc.winSize;
                if (Math.random() < 0.7) {
                    return true;
                }
                var food = HeroAItem.create();
                food.x = size.width + 50;
                //food.y = Math.floor(Math.random() * size.height) - 100;
                food.y = this._positionY;
                //this._scene.removeChild(food);
                this._scene.addChild(food);
                this._items.push(food);
                break;
            case 2:
                this._distance -= HeroBGame.user.speed * time;
                var size = cc.winSize;
                if (Math.random() < 0.7) {
                    return true;
                }
                var food = HeroAItem.create();
                food.x = size.width + 20;
                food.y = Math.floor(Math.random() * size.height - 100);
                //food.y = 400;
                this._scene.removeChild(food);
                this._scene.addChild(food);
                this._items.push(food);
                break;
        }

    },
    animateItem: function (hero, time) {
        // console.log(this._items.length);
        for (var i = 0; i < this._items.length; i++) {
             if (HeroBGame.user.mushroomValue > 0) {
                this._items[i].x += (hero.x - this._items[i].x) / 10;
                this._items[i].y += (hero.y - this._items[i].y) / 10;
            } else
            {
                this._items[i].x -= 50 * time;
            }

            var item = this._items[i];
            var heroItem_xDist = item.x - hero.x;
            var heroItem_yDist = item.y - hero.y;
            var heroItem_sqDist = heroItem_xDist * heroItem_xDist + heroItem_yDist * heroItem_yDist;
            if (this._items[i].x < -10) {
                this._items[i].removeFromParent();

                this._items.splice(i, 1);
                cc.pool.putInPool(this._items[i]);
                // cc.pool.putInPool(this._items[i]);
                i--;
            }
            if (heroItem_sqDist < 5000) {
                if (item.type == 6) {
                    HeroBGame.user.coffeeValue += 100;
                }
                if (item.type == 7) {
                    HeroBGame.user.mushroomValue += 100;
                }
                this._scene.removeChild(item);
                cc.pool.putInPool(item);
                this._items.splice(i, 1);
                HeroBGame.user.score = HeroBGame.user.score+1;
                HeroBLogicSound.playEffecy();
                //积分
            }
        }

    }
});

