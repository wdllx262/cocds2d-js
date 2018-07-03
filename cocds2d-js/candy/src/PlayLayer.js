var PlayLayer = cc.Layer.extend({
    level: 0,
    score: 0,
    steps: 0,
    limitStep: 0,
    targetScore: 0,
    candySprite:null,
    ctor: function () {
        this._super();
        this._init();
        var size = cc.director.getWinSize();
        this.candySprite = [];
        for (var i = 0; i<Constant.CANDY_MAXSIZE; i++) {
            var column=[];
            for (var j = 0; j<Constant.CANDY_MAXSIZE; j++) {
                var item = Candy.createCandy(i,j);
                item.x = 32 + 64 * i;
                item.y = 32 + 64 * j;
                this.addChild(item);
                column.push(item);
            }
            this.candySprite.push(column);
            
        }
        this._addEvent();
       
    },
    _init: function () {
        this.level = 0;
        this.score = 0;
        this.steps = Constant.levels[0].limitStep;
        this.targetScore = Constant.levels[0].targetScore;
    },
    _addEvent: function () {
        cc.eventManager.addListener(
                {
                    event: cc.EventListener.MOUSE,
                    onMouseDown: this._onMouseDown.bind(this)
                },
                this
            );
    },
    _onMouseDown:function(event){
        var pos = event.getLocation();
        var column = Math.floor((pos.x - this.x) / 64);
        var row = Math.floor((pos.y - this.y) / 64);
        //console.log(column);
        //console.log(row);
        this._popCandy(column, row);
        this.steps--;
    },
    _popCandy: function (column, row) {
        var vis = [];
        var pool = [this.candySprite[column][row]];
        var index = 0;
        for (var i = 0; i < 100; i++) vis[i] = 0;
        var addpool = function (candy) {
            if (pool.indexOf(candy) <0 ) pool.push(candy);
        }
        while (index< pool.length) {
            var candy = pool[index];
            column = candy.column;
            row = candy.row;
            vis[column * 10 + row] = 1;
            if(this._checkExist(column+1,row)&&this.candySprite[column+1][row].type==candy.type&&vis[column*10+10+row]==0)
            {
                addpool(this.candySprite[column + 1][row])
            }
            if (this._checkExist(column - 1, row) && this.candySprite[column - 1][row].type == candy.type && vis[column * 10 -10 + row] == 0) {
                addpool(this.candySprite[column - 1][row])
            }
            if (this._checkExist(column, row - 1) && this.candySprite[column][row - 1].type == candy.type && vis[column * 10  + row-1] == 0) {
                addpool(this.candySprite[column ][row-1])
            }
            if (this._checkExist(column, row + 1) && this.candySprite[column][row + 1].type == candy.type && vis[column * 10  + row+1] == 0) {
                addpool(this.candySprite[column ][row+1])
            }
            index++;
        }
        if(index<2)
        {
            return;
        }else
    {
        //消除自己节点
            for (var i = 0; i < pool.length; i++) {
                var candy = pool[i];
                this.removeChild(candy);
                this.candySprite[candy.column][candy.row]=null;
            }
            //生成新的节点，掉下动画
            this.generateCandy();
    }
    }, 
    generateCandy: function () {
        var sum = 0;
        for (var column = 0 ; column < 10; column++) {
            var misscount = 0;
            for (var row = 0; row < this.candySprite[column].length; row++) {
                var candy = this.candySprite[column][row];
                if (!candy) {
                    //空
                    var newCandy = Candy.createCandy(column, 10 + misscount);
                    newCandy.x = newCandy.column * 64 + 32;
                    newCandy.y = newCandy.row * 64 + 32;
                    this.addChild(newCandy);
                    this.candySprite[newCandy.column][newCandy.row] = newCandy;
                    console.log(this.candySprite[newCandy.column][newCandy.row].type);
                    misscount++;

                } else {
                    if (misscount > 0) {
                        var move = cc.moveTo(misscount*0.5, candy.x, candy.y - 64 * misscount);
                        candy.runAction(move);
                        candy.row = candy.row - misscount;
                        //candy.y = candy.y - 64 * misscount;
                        this.candySprite[column][row - misscount] = candy;
                        this.candySprite[column][row] = null;
                    }

                }
            }

            for (var j = this.candySprite[column].length; j >= 10; j--) {
                this.candySprite[column].splice(j, 1);
            }
            sum+= misscount;
        }
        this.score += sum*sum;
       // console.log(this.getParent().str);
        //this.getParent().ui.update();

    },

    _checkExist: function (colunm, row) {
        if(colunm < 0|| colunm>=10 || row<0|| colunm>=10)
        {
            return false
        }else if (this.candySprite[colunm][row] == null) return false;
         return true;
}
});