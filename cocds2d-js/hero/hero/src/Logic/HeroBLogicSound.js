var HeroBLogicSound = {
    playEffecy:function()
    {
        cc.audioEngine.playEffect(res.eatSound);
    },
    playMusic: function () {
        cc.audioEngine.playMusic(res.BGSound);
    },
    stopMusic:function()
    {
        cc.audioEngine.stopMusic(res.BGSound);
    }
}