var Candy = cc.Sprite.extend({
    type: 1,
    column: 0,
    row: 0,
    ctor: function (type, column, row) {
        this._super("res/" + type + ".png");
        this._init(type, column, row)
    },
    _init: function (type, column, row) {
        this.type = type;
        this.column = column;
        this.row = row;
    }
});
Candy.createCandy = function (column, row) {
    return new Candy(parseInt(Math.random() * Constant.CANDYCOUNT) + 1, column, row);
}
