var ItemFire = cc.Sprite.extend({
    x_start : 0,
    y_start : 0,
    x_end : 0,
    y_end : 0,

    ctor:function ( x, y ) {
        cc.associateWithNative( this, cc.Sprite );

        this.winSize = cc.Director.getInstance().getWinSize();
        
        cc.SpriteFrameCache.getInstance().addSpriteFrames(s_plist_item_fire_grow);
        cc.SpriteFrameCache.getInstance().addSpriteFrames(s_plist_item_fire_loop);

        var pFrame = cc.SpriteFrameCache.getInstance().getSpriteFrame("item_fire_0000");
        this.initWithSpriteFrame(pFrame);

        var cs = this.getContentSize();
        // cs.width

        var speed = CONFIG.ITEM_FIRE_ANIMATION_TIME;

        x_start = x_end = x;

        y_start = y; // this.winSize.height + cs.height;
        y_end = this.winSize.height + cs.height;

        this.setPosition( cc.p( x_start, y_start ) );

        var animFramesGrow = [];
        var str = "";
        for (var i = 0; i < 10; i++) {
            str = "item_fire_00" + (i < 10 ? ("0" + i) : i) + "";
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
            animFramesGrow.push(frame);
        }
        var item_fire_animation_grow = cc.Animation.create(animFramesGrow, 0.06);

        var animFramesLoop = [];
        var str = "";
        for (var i = 0; i < 4; i++) {
            str = "item_fire_loop_00" + (i < 10 ? ("0" + i) : i) + "";
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
            animFramesLoop.push(frame);
        }
        this.item_fire_animation_loop = cc.Animation.create(animFramesLoop, 0.1);

        this.runAction( 
            cc.Sequence.create(
                cc.Animate.create(item_fire_animation_grow),
                cc.CallFunc.create(this.switch_animation_to_loop, this)
            )
        );

        this.runAction( 
            cc.Sequence.create(
                cc.MoveTo.create(speed, cc.p(x_end, y_end)), 
                cc.CallFunc.create(this.destroy, this)
            )
        );

        //
       
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
    },

    collideRect:function(){
        var p = this.getPosition();
        var a = this.getContentSize();
        var r = new cc.rect(p.x - a.width/2, p.y - a.height/2, a.width, a.height/2);
        return r;
    }
});
