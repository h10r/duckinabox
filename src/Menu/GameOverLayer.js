var GameOverLayer = cc.Layer.extend({
    isMouseDown:false,
    winSize:null,
    points:null,

    init:function (points) {
        var selfPointer = this;
        this._super();

        this.winSize = cc.Director.getInstance().getWinSize();

        this.setTouchEnabled(true);

        this.setTouchEnabled(true);
        this.setKeyboardEnabled(true);

        // anchorpoint ist die mitte

        // background sprite
        var gameover_bg = cc.Sprite.create(s_image_gameover_bg);
        gameover_bg.setPosition( this.winSize.width / 2.0, this.winSize.height / 2.0);
        this.addChild(gameover_bg, CONFIG.BACKGROUND_Z_INDEX.BG_MENU);

        var gameover_title = cc.MenuItemImage.create(s_image_gameover_title, s_image_gameover_title );
        var gameover_title_y_start = this.winSize.height;
        var gameover_title_y_end = this.winSize.height - 571;
        gameover_title.setPosition( 347, gameover_title_y_start );

        gameover_title.runAction( cc.Sequence.create( cc.MoveTo.create( 1.5, cc.p(347, gameover_title_y_end) ) ) );

        var gameover_button = cc.MenuItemImage.create(s_image_gameover_button, s_image_gameover_button, 'startGame', this);
        var gameover_button_y_start = -100;
        var gameover_button_y_end = this.winSize.height - 643;
        gameover_button.setPosition( 352, gameover_button_y_start);

        gameover_button.runAction( cc.Sequence.create( 
            cc.DelayTime.create( 1.0 ),
            cc.MoveTo.create( 0.5, cc.p(352, gameover_button_y_end) ) 
        ) );

        var gameover_button2 = cc.MenuItemFont.create("Start Game", 'startGame', this);
        gameover_button2.setPosition( 352, this.winSize.height - 643 );
        gameover_button2.setFontSize(40);
        gameover_button2.setOpacity(0.0);

        var gameover_menu = cc.Menu.create( gameover_button2, gameover_button, gameover_title );
        gameover_menu.setPosition( 0,0 );
        this.addChild(gameover_menu, CONFIG.BACKGROUND_Z_INDEX.BUTTON);

        // points

        var gameover_points = cc.MenuItemFont.create(points, 'startGame', this);
        gameover_points.setPosition( -200, this.winSize.height - 370 );
        gameover_points.setFontSize(120);
        gameover_points.setColor( new cc.Color4B(255, 242, 0) );
        this.addChild(gameover_points, CONFIG.BACKGROUND_Z_INDEX.BUTTON);

        gameover_points.runAction( cc.Sequence.create( 
            cc.DelayTime.create( 1.6 ),
            cc.MoveTo.create( 0.3, cc.p(this.winSize.width / 2.0, this.winSize.height - 370) ) 
        ) );

        // green background
        var gameover_points2 = cc.MenuItemFont.create(points, 'startGame', this);
        gameover_points2.setPosition( this.winSize.width + 200, -6 + this.winSize.height - 370 );
        gameover_points2.setFontSize(120);
        gameover_points2.setColor( new cc.Color4B(0, 126, 116) );
        this.addChild(gameover_points2, CONFIG.BACKGROUND_Z_INDEX.BUTTON-1);

        gameover_points2.runAction( cc.Sequence.create( 
            cc.DelayTime.create( 1.6 ),
            cc.MoveTo.create( 0.3, cc.p( -6 + this.winSize.width / 2.0, -6 + this.winSize.height - 370) ) 
        ) );
        

        // this.adjustSizeForWindow();
        // window.addEventListener("resize", function (event) {
        //     selfPointer.adjustSizeForWindow();
        // });

        return true;
    },

    startGame : function() {
        var scene = cc.Scene.create();
        scene.addChild(StartmenuLayer.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.6,scene));
    },

    //

    onTouchesBegan:function (touches, event) {
        console.log("onTouchesBegan");
        this.startGame();
    },  

    onKeyDown:function (e) {
        console.log("onKeyDown");
        this.startGame();
    },

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

GameOverLayer.create = function (points) {
    var sg = new GameOverLayer();
    if (sg && sg.init(points)) {
        return sg;
    }
    return null;
};

GameOverLayer.scene = function () {
    var scene = cc.Scene.create();
    var layer = GameOverLayer.create();
    scene.addChild(layer, 1);
    return scene;
};


