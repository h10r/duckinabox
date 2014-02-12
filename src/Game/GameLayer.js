
// global array of the currently pressed keys
PRESSED_KEYS = [];

var GameLayer = cc.Layer.extend({
    winSize:null,
    isMouseDown:false,
    duck:null,
    background_layers:null,
    
    enemies:null,
    items:null,
    molotovs:null,

    points:null,

    sound_bg:null,

    init:function () {
        var selfPointer = this;
        this._super();

        this.winSize = cc.Director.getInstance().getWinSize();

        this.background_layers = [];
        this.initBackground();

        this.duck = new Duck();
        this.addChild(this.duck, CONFIG.BACKGROUND_Z_INDEX.DUCK, CONFIG.UNIT_TAG.DUCK);
        this.duck.setPosition( cc.p(this.winSize.width / 2.0, 150) );

        this.enemies = [];
        this.items = [];
        this.molotovs = [];

        this.spawnEnemy();

        this.menu_bar = new MenuBar( this, CONFIG.BACKGROUND_Z_INDEX.GUI );

        this.setTouchEnabled(true);

        this.points = 0;
        this.menu_bar.setPoints( this.points );

        this.setTouchEnabled(true);
        this.setKeyboardEnabled(true);

        PRESSED_KEYS = [];

        cc.Director.getInstance().getScheduler().scheduleCallbackForTarget(this, this.checkForCollision, 0.3, cc.REPEAT_FOREVER, 0.0, !this._isRunning );
        cc.Director.getInstance().getScheduler().scheduleCallbackForTarget(this, this.spawnEnemy, 3, cc.REPEAT_FOREVER, 0.0, !this._isRunning );
        cc.Director.getInstance().getScheduler().scheduleCallbackForTarget(this, this.spawnItem, 2, cc.REPEAT_FOREVER, 0.0, !this._isRunning );

        this.scheduleUpdate();

        return true;
    },

    update:function (dt) {
        this.updateBackground(dt);
    },

    updateBackground: function(dt) {
        var pos = null;

        for (var i=0; i<this.background_layers.length; i++) {
            pos = this.background_layers[i][0].getPosition();
            pos.y -= this.background_layers[i][1];

            if ( pos.y <= -this.background_layers[i][0].getContentSize().height ) {
                pos.y = this.background_layers[i][0].getContentSize().height;
            }

            this.background_layers[i][0].setPosition(pos);
        }


    },

    showGameOverScene : function() {
        var scene = cc.Scene.create();
        scene.addChild(GameOverLayer.create(this.points));
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.6,scene));
    },

    addPoints:function(number_of_points) {
        this.points += number_of_points;
        this.menu_bar.setPoints( this.points );
    },

    //

    checkForCollision:function (dt) {
        this.in_collision = false;


        // check for collision with enemies
        for (var i=0; i<this.enemies.length; i++) { 
            if (cc.rectIntersectsRect( this.duck.collideRect(), this.enemies[i].collideRect() )) {

                if ( this.enemies[i].tag == CONFIG.UNIT_TAG.ITEM_MANA ) {
                    this.enemies[i].collected();
                    this.enemies.splice(i,1);

                    this.duck.addMana( CONFIG.ADD_MANA );
                    this.menu_bar.setMana( this.duck.getMana() );

                    this.addPoints( CONFIG.POINTS.ITEM );
                } else if ( this.enemies[i].tag == CONFIG.UNIT_TAG.ITEM_TOAST ) {
                    this.enemies[i].collected();
                    this.enemies.splice(i,1);

                    this.duck.addHealth( CONFIG.ADD_HEALTH );
                    this.menu_bar.setHealth( this.duck.getHealth() );

                    this.addPoints( CONFIG.POINTS.ITEM );
                } else if ( this.enemies[i].tag == CONFIG.UNIT_TAG.ENEMY 
                         || this.enemies[i].tag == CONFIG.UNIT_TAG.ENEMY_WITH_ATTACK ) {
                    this.duck.hurt();
                    this.menu_bar.setHealth( this.duck.getHealth() );

                    if (!this.duck.is_alive()) {
                        this.showGameOverScene();
                    }                    
                }
            }

            for (var j=0; j<this.molotovs.length; j++) {
                if ( this.enemies[i] != null &&
                    cc.rectIntersectsRect( this.molotovs[j].collideRect(), this.enemies[i].collideRect() )) {
                    
                        this.showAnimationForDeadEnemey( this.enemies[i] );

                        if ( this.enemies[i].tag == CONFIG.UNIT_TAG.ENEMY 
                             || this.enemies[i].tag == CONFIG.UNIT_TAG.ENEMY_WITH_ATTACK ) {
                            this.addPoints( CONFIG.POINTS.ENEMY_KILL );
                        }

                        this.enemies[i].tag = CONFIG.UNIT_TAG.KILLED;
                }
            }

            if ( this.duck.duck_fire != null && this.enemies[i] != null &&
                cc.rectIntersectsRect( this.duck.fireCollideRect(), this.enemies[i].collideRect() )) {

                    if ( this.enemies[i].tag == CONFIG.UNIT_TAG.ENEMY 
                         || this.enemies[i].tag == CONFIG.UNIT_TAG.ENEMY_WITH_ATTACK ) {

                        this.addPoints( CONFIG.POINTS.ENEMY_KILL );
                    }

                    this.enemies[i].tag = CONFIG.UNIT_TAG.KILLED;
                    this.showAnimationForDeadEnemey( this.enemies[i] );

                    this.duck.quack();
            }            
        }

        // check for collision with items
        for (var i=0; i<this.items.length; i++) { 
            if (cc.rectIntersectsRect( this.duck.collideRect(), this.items[i].collideRect() )) {

                if ( this.items[i].tag == CONFIG.UNIT_TAG.ITEM_MANA ) {
                    this.items[i].collected();
                    this.items.splice(i,1);

                    this.duck.addMana( CONFIG.ADD_MANA );
                    this.menu_bar.setMana( this.duck.getMana() );

                    this.addPoints( CONFIG.POINTS.ITEM );

                    this.duck.drink();
                } else if ( this.items[i].tag == CONFIG.UNIT_TAG.ITEM_TOAST ) {
                    this.items[i].collected();
                    this.items.splice(i,1);

                    this.duck.addHealth( CONFIG.ADD_HEALTH );
                    this.menu_bar.setHealth( this.duck.getHealth() );

                    this.addPoints( CONFIG.POINTS.ITEM );

                    this.duck.chew();
                } else if ( this.items[i].tag == CONFIG.UNIT_TAG.ITEM_MOLOTOV ) {
                    this.items[i].collected();
                    this.items.splice(i,1);

                    this.duck.hasMolotov();

                    this.addPoints( CONFIG.POINTS.MOLOTOV );
                } else if ( this.items[i].tag == CONFIG.UNIT_TAG.ENEMY 
                         || this.items[i].tag == CONFIG.UNIT_TAG.ENEMY_WITH_ATTACK ) {
                    this.duck.hurt();
                    this.menu_bar.setHealth( this.duck.getHealth() );

                    if (!this.duck.is_alive()) {
                        this.showGameOverScene();
                    }                    
                }
            }

            for (var j=0; j<this.molotovs.length; j++) {
                if ( this.items[i] != null &&
                    cc.rectIntersectsRect( this.molotovs[j].collideRect(), this.items[i].collideRect() )) {
                    this.showAnimationForDeadEnemey( this.items[i] );

                    if ( this.items[i].tag == CONFIG.UNIT_TAG.ENEMY 
                         || this.items[i].tag == CONFIG.UNIT_TAG.ENEMY_WITH_ATTACK ) {
                        this.addPoints( CONFIG.POINTS.ENEMY_KILL );
                    }

                    this.items[i].tag = CONFIG.UNIT_TAG.KILLED;
                }
            }

            if ( this.duck.duck_fire != null && this.items[i] != null &&
                cc.rectIntersectsRect( this.duck.fireCollideRect(), this.items[i].collideRect() )) {
                    this.items[i].tag = CONFIG.UNIT_TAG.KILLED;
                    this.showAnimationForDeadEnemey( this.items[i] );

                    this.duck.quack();
            }            
        }
    },

    showAnimationForDeadEnemey : function (target) {
        target.runAction( 
            cc.Sequence.create(
                cc.TintTo.create(1.2, 0,0,0),
                cc.CallFunc.create(target.destroy, target)
            )
        );
    },

    //

    // a selector callback
    menuCloseCallback:function (sender) {
        cc.Director.getInstance().end();
    },
    onTouchesBegan:function (touches, event) {
        this.isMouseDown = true;
    },
    onTouchesMoved:function (touches, event) {
        if (this.isMouseDown) {
            if (touches) {
            }
        }
    },
    onTouchesEnded:function (touches, event) {
        this.isMouseDown = false;
    },
    onTouchesCancelled:function (touches, event) {
        console.log("onTouchesCancelled");
    },

    onKeyDown:function (e) {
        PRESSED_KEYS[e] = true;

        if ( PRESSED_KEYS[cc.KEY.space] ) {
            this.duck.fire();
            this.menu_bar.setMana( this.duck.getMana() );
        }
    },

    onKeyUp:function (e) {
        if ( PRESSED_KEYS[cc.KEY.space] ) {
            this.duck.stop_fire();
        }

        PRESSED_KEYS[e] = false;
    },

    //

    initBackground : function () {
        // static color
        var bg_ground = cc.LayerColor.create(new cc.Color4B(221, 241, 249, 255), 680, 680);
        this.addChild(bg_ground, -CONFIG.BACKGROUND_Z_INDEX.BG_WATER_GROUND);

        var sprite_bg_water_slow = cc.Sprite.create(s_image_bg_water_slow);
        var sprite_bg_water_slow2 = cc.Sprite.create(s_image_bg_water_slow);
        sprite_bg_water_slow.setPosition( cc.p( 0, 0 ) );
        sprite_bg_water_slow2.setPosition( cc.p( 0, sprite_bg_water_slow2.getContentSize().height ) );

        this.background_layers.push( [sprite_bg_water_slow, CONFIG.BACKGROUND_MOVEMENT.BG_WATER_SLOW] );
        this.background_layers.push( [sprite_bg_water_slow2, CONFIG.BACKGROUND_MOVEMENT.BG_WATER_SLOW] );        
        
        this.addChild(sprite_bg_water_slow, CONFIG.BACKGROUND_Z_INDEX.BG_WATER_SLOW);
        this.addChild(sprite_bg_water_slow2, CONFIG.BACKGROUND_Z_INDEX.BG_WATER_SLOW);

        //

        var sprite_bg_water_fast = cc.Sprite.create(s_image_bg_water_fast);
        var sprite_bg_water_fast2 = cc.Sprite.create(s_image_bg_water_fast);
        sprite_bg_water_fast.setPosition( cc.p( 0, 0 ) );
        sprite_bg_water_fast2.setPosition( cc.p( 0, sprite_bg_water_fast2.getContentSize().height ) );

        this.background_layers.push( [sprite_bg_water_fast, CONFIG.BACKGROUND_MOVEMENT.BG_WATER_FAST] );
        this.background_layers.push( [sprite_bg_water_fast2, CONFIG.BACKGROUND_MOVEMENT.BG_WATER_FAST] );

        this.addChild(sprite_bg_water_fast, CONFIG.BACKGROUND_Z_INDEX.BG_WATER_FAST);
        this.addChild(sprite_bg_water_fast2, CONFIG.BACKGROUND_Z_INDEX.BG_WATER_FAST);

        //

        var sprite_bg_grass = cc.Sprite.create(s_image_bg_grass);
        var sprite_bg_grass2 = cc.Sprite.create(s_image_bg_grass);
        sprite_bg_grass2.setPosition( cc.p( 0, 0 ) );
        sprite_bg_grass2.setPosition( cc.p( 0, sprite_bg_grass2.getContentSize().height ) );

        this.background_layers.push( [sprite_bg_grass, CONFIG.BACKGROUND_MOVEMENT.BG_GRASS] );
        this.background_layers.push( [sprite_bg_grass2, CONFIG.BACKGROUND_MOVEMENT.BG_GRASS] );

        this.addChild(sprite_bg_grass, CONFIG.BACKGROUND_Z_INDEX.BG_GRASS);
        this.addChild(sprite_bg_grass2, CONFIG.BACKGROUND_Z_INDEX.BG_GRASS);

        //

        for (var i=0; i<this.background_layers.length; i++) {
            this.background_layers[i][0].setAnchorPoint(0,0);
        }
    },

    //

    spawnItem : function() {
        if ( this.items.length >= CONFIG.ITEM_LIMIT ) {
            return;
        }

        var randomItem = Math.floor( Math.random() * 12 );
        var new_item = null;
        
        switch (randomItem) {
            case 0:
            case 1:
                new_item = new Mana( this.getRandomXPosition(), this.getRandomItemSpeed(), CONFIG.UNIT_TAG.ITEM_MANA );
                break;
            case 2:
            case 3:
                new_item = new Toast( this.getRandomXPosition(), this.getRandomItemSpeed(), CONFIG.UNIT_TAG.ITEM_TOAST );
                break;
            case 4:
            case 5:
            case 6:
            case 7:
                new_item = new Log( this.getRandomXPosition(), this.getRandomItemSpeed(), CONFIG.UNIT_TAG.ENEMY );
                break;
            case 8:
            case 9:
            case 10:
                new_item = new Bottle( this.getRandomXPosition(), this.getRandomItemSpeed(), CONFIG.UNIT_TAG.ENEMY );
                break;
            case 11:
                new_item = new Molotov( this.getRandomXPosition(), this.getRandomItemSpeed(), CONFIG.UNIT_TAG.ITEM_MOLOTOV );
                break;           
        }
        
        if (new_item != null) {
            this.addChild(new_item, CONFIG.BACKGROUND_Z_INDEX.ENEMY, new_item.tag);
            this.items.push( new_item );
        }

    },

    spawnEnemy : function() {
        
        var new_enemy = null;

        new_enemy = new Drake(  this.getRandomXPosition(), this.getRandomItemSpeed(), CONFIG.UNIT_TAG.ENEMY_WITH_ATTACK );

        if (new_enemy != null) {
            this.addChild(new_enemy, CONFIG.BACKGROUND_Z_INDEX.ENEMY, CONFIG.UNIT_TAG.ENEMY);
            this.enemies.push( new_enemy );
        }
    },

    getRandomXPosition: function () {
        var randomXPositionPadding = 100;
        var randomXPosition = ( Math.floor( Math.random()* this.winSize.width ));

        if (randomXPosition < randomXPositionPadding) {
            randomXPosition = randomXPositionPadding;
        } else if (randomXPosition > this.winSize.width - randomXPositionPadding) {
            randomXPosition = this.winSize.width - randomXPositionPadding;
        }

        return randomXPosition;
    },

    getRandomItemSpeed: function () {
        var randomItemSpeed = 3.0 + ( Math.random() * 6 );

        return randomItemSpeed;
    }

});

GameLayer.create = function () {
    var sg = new GameLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

GameLayer.scene = function () {
    var scene = cc.Scene.create();
    var layer = GameLayer.create();
    scene.addChild(layer, 1);
    return scene;
};

