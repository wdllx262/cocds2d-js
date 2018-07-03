var SushiPlayScene = cc.Scene.extend({

    onEnter: function () {
        this._super();


        bGLayer = new BGLayer();
        this.addChild(bGLayer);
        scoreLayer = new ScoreLayer();
        this.addChild(scoreLayer);
        playLayer = new PlayLayer();
        this.addChild(playLayer);

       

    }



});


var BGLayer = cc.Layer.extend({

    ctor: function () {
        this._super();
        var size = cc.winSize;

        var bg = new cc.Sprite("res/background.png");
        bg.x = size.width / 2;
        bg.y = size.height / 2;
        this.addChild(bg);

    }

});

var ScoreLayer = cc.Layer.extend({

    ctor: function () {
        this._super();
        var size = cc.winSize;

        lblScore = new cc.LabelTTF("分数:0", "arial", 24);
        lblScore.x = size.width - 100;
        lblScore.y = size.height-50;
        this.addChild(lblScore);

    }

});

var PlayLayer = cc.Layer.extend({
    spriteArray:null,
    ctor: function () {
        this._super();

        this.schedule(this.addSushi, 0.5);
        
        this.spriteArray = [];


    },
    addSushi: function () {
        var size = cc.winSize;

        var sprite = new SushiSprite();
        sprite.x = size.width*cc.random0To1();
        sprite.y = size.height - 50;

        var action = cc.moveTo(5, cc.p(sprite.x, 0));
        sprite.runAction(action);

        this.addChild(sprite);
        this.spriteArray.push(sprite);
        this.removeSushi();
    },
    removeSushi: function () {

        for(i=0;i<this.spriteArray.length;i++)
        {
            if(this.spriteArray[i].y<10)
            {
                this.spriteArray[i].removeFromParent();
                this.spriteArray[i] = undefined;
                this.spriteArray.splice(i, 1);
                i--;
            }
        }
    }
    

});