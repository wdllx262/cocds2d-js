var MainScene = cc.Scene.extend({
    ui: null,
    str:null,
    onEnter: function () {
        this._super();
        var size = cc.director.getWinSize();
        var bg = new cc.Sprite(res.BackGround_png);
        bg.x = size.width / 2;
        bg.y = size.height / 2;
        this.addChild(bg);
        var clip = this.clip();
        this.addChild(clip);

        var layer = new PlayLayer();
        clip.addChild(layer);
        //this.addChild(layer);
        layer.x = (size.width - (Constant.CANDY_MAXSIZE * 64)) / 2;
        layer.y = (size.height - (Constant.CANDY_MAXSIZE * 64)) / 2;
        this.ui = new UILayer(layer);
        this.addChild(this.ui, 3);
        this.str = new String("disji");
    },
    clip: function () {
        var size = cc.director.getWinSize();
        var clipNode = new cc.ClippingNode();
        var stencil = new cc.DrawNode();
        stencil.drawRect(
            cc.p(0, 0),
            cc.p(640, 640),
            cc.color(0, 0, 0),
            1,
            cc.color(0, 0, 0)
            );//起点，终点，填充颜色，线宽度，线颜色
        stencil.x = (size.width - (Constant.CANDY_MAXSIZE * 64)) / 2;
        stencil.y = (size.height - (Constant.CANDY_MAXSIZE * 64)) / 2;
        clipNode.stencil = stencil;
        //stencil
        return clipNode;
    }
    
});
//var UILayer = cc.Layer.extend({
//    ctor: function () {
//        this._super();
//        var size = cc.director.getWinSize();
//        var bg = new cc.Sprite(res.BackGround_png);
//        bg.x = size.width / 2;
//        bg.y = size.height / 2;
//        this.addChild(bg);
//        var lblLevel = new cc.LabelTTF("等级:", "Arial", 38);
//        lblLevel.x = 100;
//        lblLevel.y = size.height - 20;
//        this.addChild(lblLevel);
//        var txtLevel = new cc.LabelTTF("0", "Arial", 38);
//        txtLevel.x = 100;
//        txtLevel.y = size.height - 50;
//        this.addChild(txtLevel);
//    }
//});
//var PlayLayer = cc.Layer.extend({
//    ctor: function () {
//        this._super();
//        var size = cc.director.getWinSize();
//        for (var i=0;i<10;i++)
//        {
            
//            for (var j=0;j<10;j++)
//            {
//                var candy = new Candy();
//                candy.x = 64 * i + 32;
//                candy.y = 64 * j + 32;
//                this.addChild(candy);
//            }
//        }
        
//    }
//});
//var Candy = cc.Sprite.extend({
//    ctor:function()
//    {
//        this._super("res/" + (parseInt(Math.random() * 5) + 1) + ".png");
//    }
//});
