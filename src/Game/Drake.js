var Drake = cc.Sprite.extend({
    x_start : 0,
    y_start : 0,
    x_end : 0,
    y_end : 0,

    tmpWidth:0,
    tmpHeight:0,

    drake_fire:null,

    ctor:function (x, speed, unit_tag, duck) {
        cc.associateWithNative( this, cc.Sprite );

        this.winSize = cc.Director.getInstance().getWinSize();

        this.tag = unit_tag;
    
        var DrakeSprite = cc.SpriteFrameCache.getInstance().addSpriteFrames(s_plist_drake);

        var pFrame = cc.SpriteFrameCache.getInstance().getSpriteFrame("the_draken_icon_00000");
        this.initWithSpriteFrame(pFrame);

        var cs = this.getContentSize();
        this.tmpWidth = cs.width;
        this.tmpHeight = cs.height;

        this.tmpWidth2 = this.tmpWidth / 2.0;
        this.tmpHeight2 = this.tmpHeight / 3.0;

        x_start = x_end = x;

        y_start = this.winSize.height + cs.height;
        y_end = 0 - cs.height;

        this.setPosition( cc.p( x_start, y_start ) );

        var animFrames = [];
        var str = "";
        for (var i = 0; i < 12; i++) {
            str = "the_draken_icon_000" + (i < 10 ? ("0" + i) : i) + "";
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
            animFrames.push(frame);
        }
        var drake_animation = cc.Animation.create(animFrames, 0.05);

        this.runAction( 
            cc.RepeatForever.create( 
                cc.Sequence.create(
                    cc.Animate.create(drake_animation)
                )
            )
        );

        this.runAction( 
            cc.Sequence.create(
                cc.MoveTo.create(speed, cc.p(x_end, y_end)), 
                cc.CallFunc.create(this.destroy, this)
            )
        );

        //

        this.health = CONFIG.DEFAULT_HEALTH;
        
        // this.start_fire();
    },

    collected: function () {
        this.runAction( 
            cc.Sequence.create(
                cc.FadeTo.create( 0.5, 0.0 ),
                cc.CallFunc.create(this.destroy, this)
            )
        );
    },

    //

    start_fire : function() {
        this.duck_fire = new DuckFire();
        this.duck_fire.setFlipY(true);
        this.duck_fire.setScale(0.5,0.5);
        this.duck_fire.setAnchorPoint( cc.p( 0.5, 0 ) );
        this.duck_fire.setPosition( cc.p( this.tmpWidth2, -15 ) );
        this.addChild(this.duck_fire, -CONFIG.BACKGROUND_Z_INDEX.ANIMATION);

        if (CONFIG.SOUND && !this.firing) {
            cc.AudioEngine.getInstance().playEffect(s_sound_effect_fire, false);
            this.firing = true;
        }
    },

    stop_fire : function() {
        this.removeChild(this.duck_fire, true);
        this.duck_fire = null;
    },

    //

    destroy:function () {
        var myParent = this.getParent();
        myParent.removeChild(this,true);
        var idx = myParent.enemies.indexOf( this );
        if(idx != -1) {
            myParent.enemies.splice(idx, 1); // Remove it if really found!
        }
    },

    hurt:function () {
        this.health--;
    },

    collideRect:function(){
        var p = this.getPosition();
        var a = this.getContentSize();
        var ratio = 0.6;
        var r = new cc.rect(p.x - (ratio*a.width)/2, p.y - (a.height)/2, ratio*a.width, (a.height)/2);
        return r;
    }
});
