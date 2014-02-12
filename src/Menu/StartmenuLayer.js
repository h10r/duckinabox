var StartmenuLayer = cc.Layer.extend({
    isMouseDown:false,

    winSize:null,

    init:function () {
        var selfPointer = this;
        this._super();

        this.winSize = cc.Director.getInstance().getWinSize();

        this.setTouchEnabled(true);
        this.setKeyboardEnabled(true);

        // anchorpoint ist die mitte

        var startmenu_bg_plain = cc.LayerColor.create(new cc.Color4B(221, 241, 249, 255), 680, 680);
        this.addChild(startmenu_bg_plain, CONFIG.BACKGROUND_Z_INDEX.BG_MENU - 1);

        // delays

        var animation_duration_after_bg = 0.5 + 0.4;
        var animation_duration_after_play = animation_duration_after_bg + 0.2;
        var animation_duration_after_help = animation_duration_after_play + 0.2;

        // background sprite
        var startmenu_bg = cc.Sprite.create(s_image_startmenu_bg);
        startmenu_bg.setPosition( this.winSize.width / 2.0, 2*this.winSize.height);
        this.addChild(startmenu_bg, CONFIG.BACKGROUND_Z_INDEX.BG_MENU);
        startmenu_bg.runAction( cc.Sequence.create( cc.MoveTo.create( 0.6, cc.p(this.winSize.width / 2.0, this.winSize.height / 2.0) ) ) );


        var startmenu_button_play = cc.MenuItemImage.create(s_image_startmenu_button_play, s_image_startmenu_button_play, 'startGame', this);
        startmenu_button_play.setPosition( 342, this.winSize.height + 310 );
        startmenu_button_play.setColor( new cc.Color3B(246, 204, 74) );

        startmenu_button_play.runAction( cc.Sequence.create( cc.DelayTime.create( animation_duration_after_bg ), cc.MoveTo.create( 0.2, cc.p(342, this.winSize.height - 310) ) ) );

        var startmenu_button_play2 = cc.MenuItemFont.create("Play", 'startGame', this);
        startmenu_button_play2.setPosition( 342, this.winSize.height - 310 );
        startmenu_button_play2.setFontSize(160);
        startmenu_button_play2.setOpacity(0.0);
        startmenu_button_play2.setColor( new cc.Color3B(0,0,0) );

        //

        var startmenu_button_help = cc.MenuItemImage.create(s_image_startmenu_button_help, s_image_startmenu_button_help, 'help', this);
        startmenu_button_help.setPosition( 214, -473 );
        startmenu_button_help.setColor( new cc.Color3B(246, 204, 74) ); 

        startmenu_button_help.runAction( cc.Sequence.create( cc.DelayTime.create( animation_duration_after_play ), cc.MoveTo.create( 0.5, cc.p(214, this.winSize.height - 473) ) ) );

        var startmenu_button_help2 = cc.MenuItemFont.create("Help", 'help', this);
        startmenu_button_help2.setPosition( 214, this.winSize.height - 473 );
        startmenu_button_help2.setFontSize(64);
        startmenu_button_help2.setOpacity(0.0);
        startmenu_button_help2.setColor( new cc.Color3B(0,0,0) );

        //

        var startmenu_button_about = cc.MenuItemImage.create(s_image_startmenu_button_about, s_image_startmenu_button_about, 'about', this);
        startmenu_button_about.setPosition( 214, -593 );
        startmenu_button_about.setColor( new cc.Color3B(246, 204, 74) );        
        
        startmenu_button_about.runAction( cc.Sequence.create( cc.DelayTime.create( animation_duration_after_help ), cc.MoveTo.create( 0.5, cc.p(214, this.winSize.height - 593 ) ) ) );

        var startmenu_button_about2 = cc.MenuItemFont.create("About", 'about', this);
        startmenu_button_about2.setPosition( cc.p(214, this.winSize.height - 593 ) );
        startmenu_button_about2.setFontSize(64);
        startmenu_button_about2.setOpacity(0.0);
        startmenu_button_about2.setColor( new cc.Color3B(0,0,0) );

        var startmenu = cc.Menu.create( startmenu_button_play2, startmenu_button_help2, startmenu_button_about2, startmenu_button_play, startmenu_button_help, startmenu_button_about );
        startmenu.setPosition( 0,0 );
        this.addChild(startmenu, CONFIG.BACKGROUND_Z_INDEX.BUTTON);

        // this.adjustSizeForWindow();
        // window.addEventListener("resize", function (event) {
        //     selfPointer.adjustSizeForWindow();
        // });

        return true;
    },

    startGame : function() {
        var scene = cc.Scene.create();
        scene.addChild(GameLayer.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.6,scene));
    },

    help : function() {
        var scene = cc.Scene.create();
        scene.addChild(MenuHelpLayer.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.6,scene));
    },

    about : function() {
        var scene = cc.Scene.create();
        scene.addChild(MenuAboutLayer.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.6,scene));
    },

    addBackgroundAnimationElement : function (_file, _duration, _z_index) {
        var target = cc.Sprite.create(_file);
        var target_height = target.getContentSize().height;

        target.setAnchorPoint(cc.p(0, 0));
        target.setPosition(0, target_height);

        var target_animation = cc.MoveTo.create(
            _duration, 
            cc.p(0, -target_height) 
        )

        this.addChild(target, _z_index);

        var target_animation_reset = cc.MoveTo.create( 0, cc.p(0, target_height) )
        target.runAction( cc.RepeatForever.create( cc.Sequence.create(target_animation,target_animation_reset) ) );
    },

    //

    adjustSizeForWindow:function () {
        var margin = document.documentElement.clientWidth - document.body.clientWidth;
        if (document.documentElement.clientWidth < cc.originalCanvasSize.width) {
            cc.canvas.width = cc.originalCanvasSize.width;
        } else {
            cc.canvas.width = document.documentElement.clientWidth - margin;
        }
        if (document.documentElement.clientHeight < cc.originalCanvasSize.height) {
            cc.canvas.height = cc.originalCanvasSize.height;
        } else {
            cc.canvas.height = document.documentElement.clientHeight - margin;
        }

        var xScale = cc.canvas.width / cc.originalCanvasSize.width;
        var yScale = cc.canvas.height / cc.originalCanvasSize.height;
        if (xScale > yScale) {
            xScale = yScale;
        }
        cc.canvas.width = cc.originalCanvasSize.width * xScale;
        cc.canvas.height = cc.originalCanvasSize.height * xScale;
        var parentDiv = document.getElementById("Cocos2dGameContainer");
        if (parentDiv) {
            parentDiv.style.width = cc.canvas.width + "px";
            parentDiv.style.height = cc.canvas.height + "px";
        }
        cc.renderContext.translate(0, cc.canvas.height);
        cc.renderContext.scale(xScale, xScale);
        cc.Director.getInstance().setContentScaleFactor(xScale);
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

StartmenuLayer.create = function (points) {
    var sg = new StartmenuLayer();
    if (sg && sg.init(points)) {
        return sg;
    }
    return null;
};

StartmenuLayer.scene = function () {
    var scene = cc.Scene.create();
    var layer = StartmenuLayer.create();
    scene.addChild(layer, 1);
    return scene;
};

var StartmenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new StartmenuLayer();
        layer.init();
        this.addChild(layer);
    }
});

