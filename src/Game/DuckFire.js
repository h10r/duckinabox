var DuckFire = cc.Sprite.extend({
    x_start : 0,
    y_start : 0,
    x_end : 0,
    y_end : 0,

    ctor:function () {
        cc.associateWithNative( this, cc.Sprite );

        this.winSize = cc.Director.getInstance().getWinSize();
        
        cc.SpriteFrameCache.getInstance().addSpriteFrames(s_plist_duck_fire_grow);
        cc.SpriteFrameCache.getInstance().addSpriteFrames(s_plist_duck_fire_loop);

        var pFrame = cc.SpriteFrameCache.getInstance().getSpriteFrame("feuerstrahl_grow_0000");
        this.initWithSpriteFrame(pFrame);

        var speed = CONFIG.ITEM_FIRE_ANIMATION_TIME;

        var animFramesGrow = [];
        var str = "";
        for (var i = 0; i < 9; i++) {
            str = "feuerstrahl_grow_00" + (i < 10 ? ("0" + i) : i) + "";
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
            animFramesGrow.push(frame);
        }
        var item_fire_animation_grow = cc.Animation.create(animFramesGrow, 0.04);

        var animFramesLoop = [];
        var str = "";
        for (var i = 0; i < 3; i++) {
            str = "feuerstrahl_00" + (i < 10 ? ("0" + i) : i) + "";
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
            animFramesLoop.push(frame);
        }
        this.item_fire_animation_loop = cc.Animation.create(animFramesLoop, 0.075);

        this.runAction( 
            cc.Sequence.create(
                cc.Animate.create(item_fire_animation_grow),
                cc.CallFunc.create(this.switch_animation_to_loop, this)
            )
        );
       
        this.scheduleUpdate();
    },

    switch_animation_to_loop: function() {
        this.runAction( 
            cc.RepeatForever.create( 
                cc.Sequence.create(
                    cc.Animate.create(this.item_fire_animation_loop)
                )
            )
        );
    },

    destroy:function () {
        var myParent = this.getParent();
        myParent.removeChild(this,true);
    }

});
