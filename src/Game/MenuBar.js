var MenuBar = cc.Sprite.extend({

    ctor: function(target, zindex) {
        this.winSize = cc.Director.getInstance().getWinSize();

        this.label_points = cc.LabelTTF.create("4242", "Arial", 38);
        // label_points.setAnchorPoint(cc.p(0.5, 0.5));
        this.label_points.setPosition(cc.p(this.winSize.width - 20, this.winSize.height - 20));
    	this.label_points.setColor( cc.c3b(0,0,0) );

        this.menu_bar = cc.Sprite.create(s_image_menu_bar);
        this.health = cc.Sprite.create(s_image_menu_health);
        this.mana = cc.Sprite.create(s_image_menu_mana);

        this.menu_bar.setAnchorPoint(cc.p(0.5, 0.5));
        this.health.setAnchorPoint(cc.p(1, 0.5));
        this.mana.setAnchorPoint(cc.p(0, 0.5));
    	this.label_points.setAnchorPoint( cc.p(0.5, 0.5) );

    	var panel_x = this.winSize.width / 2.0;
    	var panel_y = this.winSize.height - this.menu_bar.getContentSize().height / 2.0 - 5;

        this.menu_bar.setPosition( cc.p(panel_x, panel_y) );
        this.health.setPosition( cc.p(panel_x, panel_y) );
        this.mana.setPosition( cc.p(panel_x - 9, panel_y + 2) );
        this.label_points.setPosition( cc.p(panel_x, this.winSize.height - this.label_points.getContentSize().height / 2.0 - 60 ) );

        target.addChild( this.menu_bar, zindex );
        target.addChild( this.health, zindex - 10);
        target.addChild( this.mana, zindex - 10);
        target.addChild( this.label_points, zindex + 10);
    },

    setPoints: function(value) {
    	this.label_points.setString(value);
    },

    setMana: function(value) {
    	// 0.35
    	var baseline_mana = 0.35;
        this.mana.setScaleX( baseline_mana + ((1 - baseline_mana) * value )  );

        // this.mana.runAction( 
        //     cc.Sequence.create(
        //         cc.ScaleTo.create(CONFIG.MENU_BAR_ANIMATION_TIME, baseline_mana + ((1 - baseline_mana) * value ), 1.0) 
        //     )
        // );
    },

    setHealth: function(value) {
    	// 0.31
    	var baseline_health = 0.31;
        this.health.setScaleX( baseline_health + ((1 - baseline_health) * value ) );

        // this.health.runAction( 
        //     cc.Sequence.create(
        //         cc.ScaleTo.create(CONFIG.MENU_BAR_ANIMATION_TIME, baseline_health + ((1 - baseline_health) * value ), 1.0) 
        //     )
        // );
    },

    destroy: function() {
    
    }

});
