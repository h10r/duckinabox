var Log = cc.Sprite.extend({
    x_start : 0,
    y_start : 0,
    x_end : 0,
    y_end : 0,

    ctor:function (x, speed, unit_tag) {
        cc.associateWithNative( this, cc.Sprite );

        this.winSize = cc.Director.getInstance().getWinSize();
        var log_sprite = cc.SpriteFrameCache.getInstance().addSpriteFrames(s_plist_item_log);

        this.tag = unit_tag;

        var pFrame = cc.SpriteFrameCache.getInstance().getSpriteFrame("log_0000");
        this.initWithSpriteFrame(pFrame);

        var cs = this.getContentSize();
        // cs.width

        x_start = x_end = x;

        y_start = this.winSize.height + cs.height;
        y_end = 0 - cs.height;

        this.setPosition( cc.p( x_start, y_start ) );

        var animFrames = [];
        var str = "";
        for (var i = 0; i < 3; i++) {
            str = "log_00" + (i < 10 ? ("0" + i) : i) + "";
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
            animFrames.push(frame);
        }
        var log_animation = cc.Animation.create(animFrames, 0.3);

        this.runAction( 
            cc.RepeatForever.create( 
                cc.Sequence.create(
                    cc.Animate.create(log_animation)
                )
            )
        );

        this.runAction( 
            cc.Sequence.create(
                cc.MoveTo.create(speed, cc.p(x_end, y_end)), 
                cc.CallFunc.create(this.destroy, this)
            )
        );
    },

    collected: function () {
        this.runAction( 
            cc.Sequence.create(
                cc.FadeTo.create( 0.5, 0.0 ),
                cc.CallFunc.create(this.destroy, this)
            )
        );
    },

    destroy:function () {
        var myParent = this.getParent();
        myParent.removeChild(this,true);
        var idx = myParent.items.indexOf( this );
        if(idx != -1) {
            myParent.items.splice(idx, 1); // Remove it if really found!
        }
    },

    hurt:function () {
        this.health--;
    },

    collideRect:function(){
        var p = this.getPosition();
        var a = this.getContentSize();
        var r = new cc.rect(p.x - a.width/2, p.y - a.height/2, a.width, a.height/2);
        return r;
    }
});
