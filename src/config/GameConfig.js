var CONFIG = CONFIG || {};

//game state
CONFIG.GAME_STATE = {
    MENU:0,
    GAME:1,
    GAME_OVER:2
};

CONFIG.HEALTH = 80;
CONFIG.DAMAGE = 10;

CONFIG.MANA = 100;
CONFIG.MANA_COST = 1;

CONFIG.ADD_HEALTH = 20;
CONFIG.ADD_MANA = 33;

CONFIG.ENEMY_LIMIT = 5;
CONFIG.ITEM_LIMIT = 4;

CONFIG.POINTS = {
    ITEM:200,
    ENEMY_HURT:25,
    ENEMY_KILL:500,
    MOLOTOV:500
};

CONFIG.SOUND = true;
CONFIG.SOUND_VOLUME = 1.0;

CONFIG.UNIT_TAG = {
    GUI:-1,
    DUCK:0,
    ENEMY:1,
    ENEMY_WITH_ATTACK:2,
    ITEM_MANA:3,
    ITEM_TOAST:4,
    USER_FIRE:5,
    ENEMEY_FIRE:6,
    ITEM_MOLOTOV:7,
    MOLOTOV_FIRE:7,
    KILLED:100
};

CONFIG.PLAYER_MODE_TYPE = {
    NORMAL:0,
    FLAMETHROWER:1
};

CONFIG.ENEMY_MOVE_TYPE = {
    ATTACK:0,
    VERTICAL:1,
    HORIZONTAL:2,
    OVERLAP:3
};

CONFIG.SPEED = 355;

CONFIG.BACKGROUND_Z_INDEX = {
    BG_MENU: 0,
    BG_BUTTON: 90,
    BUTTON: 100,
    //
    BG_WATER_GROUND: 0,
    BG_WATER_SLOW: 10,
    BG_WATER_FAST: 20,
    BG_GRASS: 30,
    ENEMY: 60,
    DUCK: 150,
    ANIMATION: 125,
    GUI : 200
}

CONFIG.BACKGROUND_MOVEMENT = {
    BG_WATER_SLOW: 5,
    BG_WATER_FAST: 12,
    BG_GRASS: 17
}

CONFIG.ITEM_FIRE_ANIMATION_TIME = 4.0;

CONFIG.MENU_BAR_ANIMATION_TIME = 1.0;



