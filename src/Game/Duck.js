var Duck = cc.Sprite.extend({
    tmpWidth:0,
    tmpHeight:0,

    duck_fire:null,
    has_molotov:null,
    duck_molotov:null,

    ctor:function () {
        cc.associateWithNative( this, cc.Sprite );

        this.winSize = cc.Director.getInstance().getWinSize();
 
        var DuckSprite = cc.SpriteFrameCache.getInstance().addSpriteFrames(s_plist_duck);

        var pFrame = cc.SpriteFrameCache.getInstance().getSpriteFrame("ente_00000");
        this.initWithSpriteFrame(pFrame);

        var cs = this.getContentSize();
        this.tmpWidth = cs.width;
        this.tmpHeight = cs.height;

        this.tmpWidth2 = this.tmpWidth / 2.0;
        this.tmpHeight2 = this.tmpHeight / 3.0;

        var animFrames = [];
        var str = "";
        for (var i = 0; i < 20; i++) {
            str = "ente_000" + (i < 10 ? ("0" + i) : i) + "";
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
            animFrames.push(frame);
        }
        var duck_animation = cc.Animation.create(animFrames, 0.05);
        this.runAction( 
            cc.RepeatForever.create( 
                cc.Sequence.create(
                    cc.Animate.create(duck_animation)
                )
            )
        );

        //

        this.health = CONFIG.HEALTH;
        this.mana = CONFIG.MANA;
        this.has_molotov = false;

        //
        // sounds
        //

        this.sound_fire = new Audio("");
        document.body.appendChild(this.sound_fire);
    
        var sounds_path = 'assets/sounds/effects/';

        var canPlayType = this.sound_fire.canPlayType("audio/ogg");
        if(canPlayType.match(/maybe|probably/i)) {
            this.sound_fire.src = sounds_path + 'fire.ogg';
        } else {
            this.sound_fire.src = sounds_path + 'fire.mp3';
        }

        //

        this.sound_quack = new Audio("");
        document.body.appendChild(this.sound_quack);
    
        var canPlayType = this.sound_quack.canPlayType("audio/ogg");
        if(canPlayType.match(/maybe|probably/i)) {
            this.sound_quack.src = sounds_path + 'duck-crazy.ogg';
        } else {
            this.sound_quack.src = sounds_path + 'duck-crazy.mp3';
        }

        //

        this.sound_chew = new Audio("");
        document.body.appendChild(this.sound_chew);
    
        var canPlayType = this.sound_quack.canPlayType("audio/ogg");
        if(canPlayType.match(/maybe|probably/i)) {
            this.sound_chew.src = sounds_path + 'chew.ogg';
        } else {
            this.sound_chew.src = sounds_path + 'chew.mp3';
        }        

        //

        this.sound_drink = new Audio("");
        document.body.appendChild(this.sound_drink);
    
        var canPlayType = this.sound_drink.canPlayType("audio/ogg");
        if(canPlayType.match(/maybe|probably/i)) {
            this.sound_drink.src = sounds_path + 'drink.ogg';
        } else {
            this.sound_drink.src = sounds_path + 'drink.mp3';
        }
        
        //

        this.sound_hurt = new Audio("");
        document.body.appendChild(this.sound_hurt);
    
        var canPlayType = this.sound_hurt.canPlayType("audio/ogg");
        if(canPlayType.match(/maybe|probably/i)) {
            this.sound_hurt.src = sounds_path + 'hurt.ogg';
        } else {
            this.sound_hurt.src = sounds_path + 'hurt.mp3';
        }
        
        //
        
        this.scheduleUpdate();
    },

    getHealth: function() {
        return this.health / CONFIG.HEALTH;
    },

    getMana: function() {
        return this.mana / CONFIG.MANA;
    },

    hasMolotov : function() {
        this.has_molotov = true;

        this.sound_quack.load();
        this.sound_quack.play();
    },


    addHealth: function(amount) {
        this.health += amount;

        if ( this.health > CONFIG.HEALTH ) {
            this.health = CONFIG.HEALTH;
        }
    },

    addMana: function(amount) {
        this.mana += amount;

        if ( this.mana > CONFIG.MANA ) {
            this.mana = CONFIG.MANA;
        }        
    },

    update:function (dt) {
        if( cc.config.platform == 'browser' ) {
            var pos = this.getPosition();

            // if ( PRESSED_KEYS.length == 0 ) {
            //     this.resetSounds();
            // }

            if ((PRESSED_KEYS[cc.KEY.w] || PRESSED_KEYS[cc.KEY.up]) && pos.y + this.tmpHeight2 <= this.winSize.height) {
                pos.y += dt * CONFIG.SPEED;
            }
            if ((PRESSED_KEYS[cc.KEY.s] || PRESSED_KEYS[cc.KEY.down]) && pos.y - this.tmpHeight2 >= 0) {
                pos.y -= dt * CONFIG.SPEED;
            }
            if ((PRESSED_KEYS[cc.KEY.a] || PRESSED_KEYS[cc.KEY.left]) && pos.x - this.tmpWidth2 >= 0) {
                pos.x -= dt * CONFIG.SPEED;
            }
            if ((PRESSED_KEYS[cc.KEY.d] || PRESSED_KEYS[cc.KEY.right]) && pos.x + this.tmpWidth2 <= this.winSize.width) {
                pos.x += dt * CONFIG.SPEED;
            }

            this.setPosition( pos );
        }

        if (this.health <= 0) {
        
        }
    },

    quack : function() {

        if ( this.sound_quack.duration > 0 && !this.sound_quack.paused ) {
            // is playing
        } else {
            this.sound_quack.load();
            this.sound_quack.play();
        }
    },

    chew : function() {

        if ( this.sound_chew.duration > 0 && !this.sound_chew.paused ) {
            // is playing
        } else {
            this.sound_chew.load();
            this.sound_chew.play();           
        }
    },

    drink : function() {

        if ( this.sound_drink.duration > 0 && !this.sound_drink.paused ) {
            // is playing
        } else {
            this.sound_drink.load();
            this.sound_drink.play();           
        }
    },
    
    fire : function() {

        if ( this.duck_fire == null && this.mana > CONFIG.MANA_COST ) {

            if (this.has_molotov) {
                this.fireMolotov();
            } else {
                this.start_fire();
            }
        }
        
        if ( this.mana > CONFIG.MANA_COST ) {
            this.mana -= CONFIG.MANA_COST;
        } else {
            this.stop_fire();
        }
    },

    fireMolotov : function() {
        var myParent = this.getParent();

        var p = this.getPosition();
        var a = this.getContentSize();

        this.duck_molotov = new MolotovFireItem( p.x, p.y );
        this.duck_molotov.startDuckAnimation();
        
        myParent.addChild(this.duck_molotov, CONFIG.BACKGROUND_Z_INDEX.DUCK - 10, CONFIG.UNIT_TAG.MOLOTOV_FIRE);
        myParent.molotovs.push( this.duck_molotov );

        this.has_molotov = false;

        this.sound_fire.load();
        this.sound_fire.play();

        this.sound_quack.load();
        this.sound_quack.play();
    },

    start_fire : function() {
        this.duck_fire = new DuckFire();
        this.duck_fire.setAnchorPoint( cc.p( 0.5, 0 ) );
        this.duck_fire.setPosition( cc.p( this.tmpWidth2, this.tmpHeight - 75 ) );
        this.addChild(this.duck_fire, -CONFIG.BACKGROUND_Z_INDEX.ANIMATION);

        this.sound_fire.load();
        this.sound_fire.play();
    },

    stop_fire : function() {
        this.removeChild(this.duck_fire, true);
        this.duck_fire = null;

        this.sound_fire.pause();
    },

    shoot:function (dt) {
        //this.shootEffect();
        var offset = 13;
        var p = this.getPosition();
        var cs = this.getContentSize();
        var a = new Bullet(this.bulletSpeed, "W1.png", CONFIG.ENEMY_MOVE_TYPE.NORMAL);
        CONFIG.CONTAINER.PLAYER_BULLETS.push(a);
        this.getParent().addChild(a, a.zOrder, CONFIG.UNIT_TAG.PLAYER_BULLET);
        a.setPosition(p.x + offset, p.y + 3 + cs.height * 0.3);

        var b = new Bullet(this.bulletSpeed, "W1.png", CONFIG.ENEMY_MOVE_TYPE.NORMAL);
        CONFIG.CONTAINER.PLAYER_BULLETS.push(b);
        this.getParent().addChild(b, b.zOrder, CONFIG.UNIT_TAG.PLAYER_BULLET);
        b.setPosition(p.x - offset, p.y + 3 + cs.height * 0.3);
    },

    destroy:function () {
        CONFIG.LIFE--;
        var p = this.getPosition();
        var myParent = this.getParent();
        myParent.removeChild(this,true);
    },

    hurt:function () {
        this.health -= CONFIG.DAMAGE;

         if ( this.sound_hurt.duration > 0 && !this.sound_hurt.paused ) {
            // is playing
        } else {
            this.sound_hurt.load();
            this.sound_hurt.play();           
        }
    },

    is_alive:function () {
        return this.health > 0;
    },

    collideRect:function(){
        var p = this.getPosition();
        var a = this.getContentSize();
        var ratio = 0.6;
        var r = new cc.rect(p.x - (ratio*a.width)/2, p.y - (ratio*a.height)/2, ratio*a.width, (ratio*a.height)/2);
        return r;
    },

    fireCollideRect:function(){
        if ( this.duck_fire == null ) {
            return false;
        }

        this.duck_fire.isIgnoreAnchorPointForPosition(true);
        var p = this.getPosition();
        var a = this.duck_fire.getContentSize();
        p.y += a.height;
        var r = new cc.rect(p.x - (a.width)/2, p.y - (a.height)/2, a.width, (a.height)/2);
        return r;
    }
});
