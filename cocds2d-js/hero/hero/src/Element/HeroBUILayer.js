var HeroBUILayer = cc.Layer.extend({
    blDistanceScore: null,
    lblScoreScore:null,
    ctor:function()
    {
        this._super();
        cc.spriteFrameCache.addSpriteFrames("res/graphics/texture.plist");
        var size = cc.winSize;
        var lblLifeTxt = new cc.LabelBMFont("LIFE",res.fontslist, 100, cc.TEXT_ALIGNMENT_CENTER);
        lblLifeTxt.x = 300;
        lblLifeTxt.y = size.height - 45;
        this.addChild(lblLifeTxt);
        var lblLifeScore = new cc.LabelBMFont("0", res.fontslist, 100, cc.TEXT_ALIGNMENT_CENTER);
        lblLifeScore.x = 300;
        lblLifeScore.y = size.height - 75;
        this.addChild(lblLifeScore);
        var lblDistanceTxt = new cc.LabelBMFont("Distance", res.fontslist, 160, cc.TEXT_ALIGNMENT_CENTER);
        lblDistanceTxt.x = 450;
        lblDistanceTxt.y = size.height - 45;
        this.addChild(lblDistanceTxt);
        this.lblDistanceScore = new cc.LabelBMFont("0", res.fontslist, 160, cc.TEXT_ALIGNMENT_CENTER);
        this.lblDistanceScore.x = 450;
        this.lblDistanceScore.y = size.height - 75;
        this.addChild(this.lblDistanceScore);
        var lblScoreTxt = new cc.LabelBMFont("Score", res.fontslist, 100, cc.TEXT_ALIGNMENT_CENTER);
        lblScoreTxt.x = 600;
        lblScoreTxt.y = size.height - 45;
        this.addChild(lblScoreTxt);
        this.lblScoreScore = new cc.LabelBMFont("0",res.fontslist, 100, cc.TEXT_ALIGNMENT_CENTER);
        this.lblScoreScore.x = 600;
        this.lblScoreScore.y = size.height - 75;
        this.addChild(this.lblScoreScore);
        var sound = new HeroBSound();
        var pauseMenuItem = new cc.MenuItemImage("#pauseButton.png", "#pauseButton.png", this.pause, this);
        var menu = new cc.Menu(sound, pauseMenuItem);
        menu.alignItemsHorizontallyWithPadding(30);
        this.addChild(menu);
        menu.x = 100;
        menu.y = size.height - 45;
        this.scheduleUpdate();
    },
    update: function () {
        this.lblScoreScore.setString(HeroBGame.user.score);
    },
    pause: function () {
        if (cc.director.isPaused())
        {
            cc.director.resume();
        } else
        {
            cc.director.pause();
        }
        
    }


 
});
