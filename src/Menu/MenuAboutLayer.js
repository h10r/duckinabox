var MenuAboutLayer = cc.Layer.extend({
    isMouseDown:false,

    winSize:null,

    init:function () {
        var selfPointer = this;
        this._super();

        this.winSize = cc.Director.getInstance().getWinSize();

        this.setTouchEnabled(true);
        this.setKeyboardEnabled(true);

        // anchorpoint ist die mitte

        var MenuAbout_bg_plain = cc.LayerColor.create(new cc.Color4B(221, 241, 249, 255), 680, 680);
        this.addChild(MenuAbout_bg_plain, CONFIG.BACKGROUND_Z_INDEX.BG_MENU - 1);

        // delays

        var animation_duration_after_bg = 0.5 + 0.4;
        var animation_duration_after_title_bg = 0.5 + 0.4;
        var animation_duration_after_play = animation_duration_after_bg + 0.2;

        // background sprite
        var MenuAbout_bg = cc.Sprite.create(s_image_infomenu_bg);
        MenuAbout_bg.setPosition( this.winSize.width / 2.0, 2*this.winSize.height);
        this.addChild(MenuAbout_bg, CONFIG.BACKGROUND_Z_INDEX.BG_MENU);
        MenuAbout_bg.runAction( cc.Sequence.create( cc.MoveTo.create( 0.6, cc.p(this.winSize.width / 2.0, this.winSize.height / 2.0) ) ) );

        var MenuAbout_title_bg = cc.Sprite.create(s_image_infomenu_title_bg);
        MenuAbout_title_bg.setPosition( 339, this.winSize.height + 95 );
        this.addChild(MenuAbout_title_bg, CONFIG.BACKGROUND_Z_INDEX.BG_BUTTON);
        MenuAbout_title_bg.runAction( cc.Sequence.create( cc.DelayTime.create( animation_duration_after_title_bg ), cc.MoveTo.create( 0.2, cc.p(339, this.winSize.height - 95) ) ) );

        var MenuAbout_content_bg = cc.Sprite.create(s_image_infomenu_about_content);
        MenuAbout_content_bg.setPosition( 330, -this.winSize.height );
        this.addChild(MenuAbout_content_bg, CONFIG.BACKGROUND_Z_INDEX.BG_BUTTON);
        MenuAbout_content_bg.runAction( cc.Sequence.create( cc.DelayTime.create( animation_duration_after_play ), cc.MoveTo.create( 0.5, cc.p(330, this.winSize.height - 400) ) ) );

        var MenuAbout_button = cc.MenuItemImage.create(s_image_infomenu_about, s_image_infomenu_about, 'startGame', this);
        MenuAbout_button.setPosition( 343, this.winSize.height + 95 );
        MenuAbout_button.setColor( new cc.Color3B(246, 204, 74) );

        MenuAbout_button.runAction( cc.Sequence.create( cc.DelayTime.create( animation_duration_after_bg ), cc.MoveTo.create( 0.2, cc.p(343, this.winSize.height - 95) ) ) );

        var MenuAbout_button2 = cc.MenuItemFont.create("Help", 'help', this);
        MenuAbout_button2.setPosition( 343, this.winSize.height + 95 );
        MenuAbout_button2.setFontSize(160);
        MenuAbout_button2.setOpacity(0.0);
        MenuAbout_button2.setColor( new cc.Color3B(0,0,0) );

        //

        var gameover_button = cc.MenuItemImage.create(s_image_gameover_button, s_image_gameover_button, 'startGame', this);
        var gameover_button_y_start = -100;
        var gameover_button_y_end = this.winSize.height - 653;
        gameover_button.setPosition( 352, gameover_button_y_start);

        gameover_button.runAction( cc.Sequence.create( 
            cc.DelayTime.create( 1.0 ),
            cc.MoveTo.create( 0.5, cc.p(352, gameover_button_y_end) ) 
        ) );

        var gameover_button2 = cc.MenuItemFont.create("Start Game", 'startGame', this);
        gameover_button2.setPosition( 352, this.winSize.height - 653 );
        gameover_button2.setFontSize(40);
        gameover_button2.setOpacity(0.0);

        //

        var infomenu = cc.Menu.create( MenuAbout_button, MenuAbout_button2, gameover_button, gameover_button2 );
        infomenu.setPosition( 0,0 );
        this.addChild(infomenu, CONFIG.BACKGROUND_Z_INDEX.BUTTON);


        return true;
    },

    startGame : function() {
        console.log("startGame");

        var scene = cc.Scene.create();
        scene.addChild(StartmenuLayer.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.6,scene));
    },

    
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

    },

    onKeyUp:function (e) {
    }

});

MenuAboutLayer.create = function (points) {
    var sg = new MenuAboutLayer();
    if (sg && sg.init(points)) {
        return sg;
    }
    return null;
};

MenuAboutLayer.scene = function () {
    var scene = cc.Scene.create();
    var layer = MenuAboutLayer.create();
    scene.addChild(layer, 1);
    return scene;
};

var MenuAboutScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MenuAbout();
        layer.init();
        this.addChild(layer);
    }
});

