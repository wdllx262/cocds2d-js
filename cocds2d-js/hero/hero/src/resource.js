var res = {

    heroplist: "res/graphics/texture.plist",
    heroPng: "res/graphics/texture.png",
    BGpng: "res/graphics/bgLayer.jpg",
    fontslist: "res//fonts/fonts/font.fnt",
    fontPng: "res/fonts/fonts/font.png",
    BGSound: "res/sounds/bgGame.mp3",
    eatSound: "res/sounds/eat.mp3",
    coffee: "res/particles/coffee.plist",
    mushroom: "res/particles/mushroom.plist"
}
var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}