//
// IMAGES
//
var s_image_path = "assets/images/";
var s_image_bg_path = s_image_path + "bg/";
var s_image_gameobject_path = s_image_path + "gameObject/";
var s_image_control_path = s_image_path + "control/";
var s_image_sprite_path = s_image_path + "sprites/";
var s_image_menu_path = s_image_path + "menu/";

var s_image_startmenu_path = s_image_path + "startmenu/";
var s_image_gameover_path = s_image_path + "gameover/";
var s_image_infomenu_path = s_image_path + "infomenu/";

// startmenu
var s_image_startmenu_bg = s_image_startmenu_path + "startmenu_bg.png";

var s_image_startmenu_button_play = s_image_startmenu_path + "button_play.png";
var s_image_startmenu_button_play_hover = s_image_startmenu_path + "button_play_hover.png";

var s_image_startmenu_button_help = s_image_startmenu_path + "button_help.png";
var s_image_startmenu_button_help_hover = s_image_startmenu_path + "button_help_hover.png";

var s_image_startmenu_button_about = s_image_startmenu_path + "button_about.png";
var s_image_startmenu_button_about_hover = s_image_startmenu_path + "button_about_hover.png";

// infomenus
var s_image_infomenu_bg = s_image_infomenu_path + "infomenu_bg.png";
var s_image_infomenu_title_bg = s_image_infomenu_path + "infomenu_bg_title.png";
var s_image_infomenu_about = s_image_infomenu_path + "infomenu_about.png";
var s_image_infomenu_about_content = s_image_infomenu_path + "infomenu_about_content.png";
var s_image_infomenu_help = s_image_infomenu_path + "infomenu_help.png";
var s_image_infomenu_help_content = s_image_infomenu_path + "infomenu_help_content.png";

// gameover
var s_image_gameover_bg = s_image_gameover_path + "gameover_bg.png";
var s_image_gameover_button = s_image_gameover_path + "gameover_button.png";
var s_image_gameover_title = s_image_gameover_path + "gameover_title.png";

// bg
var s_image_bg_water_slow = s_image_bg_path + "bg_water_slow.png";
var s_image_bg_water_fast = s_image_bg_path + "bg_water_fast.png";
var s_image_bg_grass = s_image_bg_path + "bg_grass.png";

var s_image_menu_bar = s_image_menu_path + "menu_bar.png";
var s_image_menu_health = s_image_menu_path + "health.png";
var s_image_menu_mana = s_image_menu_path + "mana.png";

// sprites
var s_image_duck = s_image_sprite_path + "duck.png";
var s_image_drake = s_image_sprite_path + "drake.png";

var s_image_duck_fire_grow = s_image_sprite_path + "duck_fire_grow.png";
var s_image_duck_fire_loop = s_image_sprite_path + "duck_fire_loop.png";
var s_image_item_bottle = s_image_sprite_path + "item_bottle.png";
var s_image_item_molotov = s_image_sprite_path + "item_molotov.png";
var s_image_item_fire_grow = s_image_sprite_path + "item_fire_grow.png";
var s_image_item_fire_loop = s_image_sprite_path + "item_fire_loop.png";
var s_image_item_log = s_image_sprite_path + "item_log.png";
var s_image_item_mana = s_image_sprite_path + "item_mana.png";
var s_image_item_toast = s_image_sprite_path + "item_toast.png";

//
// SOUNDS
//
var s_sound_path = "assets/sounds/";
var s_sound_effects_path = "assets/sounds/effects/";
// atmo
var s_sound_bg_mp3 = s_sound_path + "bg.mp3";
var s_sound_bg_ogg = s_sound_path + "bg.ogg";
// effects
var s_sound_effect_drink_mp3 = s_sound_effects_path + "drink.mp3";
var s_sound_effect_chew_mp3 = s_sound_effects_path + "chew.mp3";
var s_sound_effect_duck_mp3 = s_sound_effects_path + "duck.mp3";
var s_sound_effect_fire_mp3 = s_sound_effects_path + "fire.mp3";
var s_sound_effect_hurt_mp3 = s_sound_effects_path + "hurt.mp3";

var s_sound_effect_drink_ogg = s_sound_effects_path + "drink.ogg";
var s_sound_effect_chew_ogg = s_sound_effects_path + "chew.ogg";
var s_sound_effect_duck_ogg = s_sound_effects_path + "duck.ogg";
var s_sound_effect_fire_ogg = s_sound_effects_path + "fire.ogg";
var s_sound_effect_hurt_ogg = s_sound_effects_path + "hurt.ogg";

//
// PLISTS
//
var s_plist_path = "assets/images/sprites/";
var s_plist_duck = s_plist_path + "duck.plist";
var s_plist_drake = s_plist_path + "drake.plist";
var s_plist_duck_fire_grow = s_plist_path + "duck_fire_grow.plist";
var s_plist_duck_fire_loop = s_plist_path + "duck_fire_loop.plist";
var s_plist_item_bottle = s_plist_path + "item_bottle.plist";
var s_plist_item_molotov = s_plist_path + "item_molotov.plist";
var s_plist_item_fire_grow = s_plist_path + "item_fire_grow.plist";
var s_plist_item_fire_loop = s_plist_path + "item_fire_loop.plist";
var s_plist_item_log = s_plist_path + "item_log.plist";
var s_plist_item_mana = s_plist_path + "item_mana.plist";
var s_plist_item_toast = s_plist_path + "item_toast.plist";

//
var g_ressources = [
    //image
    
    // bg
    {type:"image", src:s_image_bg_grass},
    {type:"image", src:s_image_bg_water_fast},
    {type:"image", src:s_image_bg_water_slow},
    
    {type:"image", src:s_image_duck},
    {type:"image", src:s_image_drake},

    {type:"image", src:s_image_duck_fire_grow},
    {type:"image", src:s_image_duck_fire_loop},
    {type:"image", src:s_image_item_bottle},
    {type:"image", src:s_image_item_molotov},
    {type:"image", src:s_image_item_fire_grow},
    {type:"image", src:s_image_item_fire_loop},
    {type:"image", src:s_image_item_log},
    {type:"image", src:s_image_item_mana},
    {type:"image", src:s_image_item_toast},

    {type:"image", src:s_image_infomenu_bg},
    {type:"image", src:s_image_infomenu_about},
    {type:"image", src:s_image_infomenu_help},
    
    {type:"image", src:s_image_gameover_bg},
    {type:"image", src:s_image_gameover_button},
    {type:"image", src:s_image_gameover_title},

    //plist
    {type:"plist", src:s_plist_duck},
    {type:"plist", src:s_plist_drake},

    {type:"plist", src:s_plist_duck_fire_grow},
    {type:"plist", src:s_plist_duck_fire_loop},
    {type:"plist", src:s_plist_item_bottle},
    {type:"plist", src:s_plist_item_molotov},
    {type:"plist", src:s_plist_item_fire_grow},
    {type:"plist", src:s_plist_item_fire_loop},
    {type:"plist", src:s_plist_item_log},
    {type:"plist", src:s_plist_item_mana},
    {type:"plist", src:s_plist_item_toast},

    // menu
    {type:"image", src:s_image_menu_bar},
    {type:"image", src:s_image_menu_health},
    {type:"image", src:s_image_menu_mana},

    // audio
    {type:"effect", src:s_sound_bg_mp3},
    {type:"effect", src:s_sound_bg_ogg},
    // effects
    {type:"effect", src:s_sound_effect_drink_mp3},
    {type:"effect", src:s_sound_effect_chew_mp3},
    {type:"effect", src:s_sound_effect_duck_mp3},
    {type:"effect", src:s_sound_effect_fire_mp3},
    {type:"effect", src:s_sound_effect_hurt_mp3},

    {type:"effect", src:s_sound_effect_drink_ogg},
    {type:"effect", src:s_sound_effect_chew_ogg},
    {type:"effect", src:s_sound_effect_duck_ogg},
    {type:"effect", src:s_sound_effect_fire_ogg},
    {type:"effect", src:s_sound_effect_hurt_ogg}
];