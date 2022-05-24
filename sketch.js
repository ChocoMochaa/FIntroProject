//the library being used
kaboom({
  scale: 1,
  background: [10,150,200],
})

//how the sprites are retrieved and loaded
loadSpriteAtlas("Slime Time Art Assets.png", "atlas.json");
loadSpriteAtlas("Gate.png", "atlas2.json");
loadSprite("Door", "Door-1.png.png")
loadSprite("Plat", "Plat-1.png.png")

//the setup for the levels
const levelConfig = {
  width: 16,
  height: 16,
  pos: vec2(32,32),
  
  "w": () => [
    "wall",
    sprite("wall"),
    area(),
    solid()
  ],
  //clippable wall
  "&": () => [
    "wallp",
    sprite("wall"),
    area(),
    solid()
  ],
   "f": () => [
    "floor",
    sprite("floor"),
    area(),
    solid()
  ],
  //lower barrier for plat
  "*": () => [
    "floor",
    sprite("floor"),
    area(),
    opacity(0)
    //openable gate (requires keycard)
  ],
  "g": () => [
    "gate",
    sprite("Gate"),
    area(),
    origin("left"),
    solid()
    //opacity(0)
  ],
  //top barrier for plat
  "B": () => [
    "barrier",
    rect(16,16),
    area(),
    opacity(0)
  ],
  //moving platform
  "p": () => [
    "platform",
    sprite("Plat"),
    area(),
    solid(),
    origin("top"),
    {
      "yVel": -25
    }
    //actually a potion (totally not reused code)
  ],
  "h": () => [
    "hHeart",
    sprite("half_heart",{
      "anim":"idle"
    }),
    area(),
    solid()
  ],
  "D": () => [
    "door",
    sprite("Door"),
    area(),
    solid(),
    origin("topleft")
  ],
  //required to access door
    "c": () => [
    "button",
    sprite("chest"),
    area(),
    solid(),
    origin("topleft")
  ],
  //spike (reused name)
  "d": () => [
    "enemy",
    sprite("demon"),
    area(),
    body(),
    cleanup()
  ],
  //plasma enemy
  "#": () => [
    "enemy",
    sprite("plasma"),
    area(),
    solid(),
    cleanup()
  ],
  //physics based (locked)
   "b": () => [
    "boxes",
    sprite("box"),
    area(),
    body(),
    cleanup()
  ],
  //physics based (unlocked)
  "^": () => [
    "boxe",
    sprite("boxe"),
    area(),
    body(),
    cleanup()
  ],
  //keycard (unlocks chest and gate)
  "k": () => [
    "key",
    sprite("key"),
    area(),
  ],
  //teleporter (sends to tele 2 on contact)
  "t": () => [
    "tele",
    sprite("tele"),
    area(),
    solid(),
    origin("topleft")
  ],
  "-": () => [
    "tele2",
    sprite("tele"),
    area(),
    solid(),
    origin("topleft")
  ],
}

let levelNum = 0

const levels = [
  //1st level introduces you to glitch, gate, a spike, and key
  [ " wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
    "w                                        ww",
    "w             ",
    "w                             ",   
    "w                                        g",
    "w    h    d           b               ",
    " ffffffffffffffffffffffffff      fffffffffffD ",
    "                          w      w",
    "                          w      w",
    "                          w     fw",
    "                          w     ww",
    "                          w    fww",
    "                          w  ffffw",
    "                        ww&     kw",
    "                        w &      w",
    "                        wc&ffffffw",
    "                        www        ",

  ],
  //2nd level introduces you to the platforming.
  [ " wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
    "wk w                             w",
    "wh-w                             w",
    "w ww                             w",
    "w                                w",
    "w                                w",
    "w          B       B             w",
    "w    f                           w",
    "w    w                  ff       w",
    "w   fw     p       p    w        w",
    "wffffwf################fffffD    w",
    "w                                w",
    "w                                w",
    "w        B        B              w",
    "w                                w",
    "wt       p        p   b          w",
    "wfff                 ffffffffffffw",
    "          ",
    "          ",
    "         *        f   f",
    "                  f c f",
    "                   www",
  ],
  //3rd level starts to test your braincell count.
   [" wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
    " w                 ww ",
    " w   ",
    " wf   ",
    " wwff            k g", 
    " wwwwfff      b    ", 
    " wwwwwww fffffffffffffffffffD",
    "        ",
    "       ",
    "",
    "     dddcddd      ",
    "     ffffffw",
  ],
  //4th ups the difficulty by adding harder platforming
  [ "   wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww ",
    "  wwww                wwwwwwwwwwwww",
    "  ww                    wwwwww  www",
    "  w                      wwww    ww",
    "  w                       ww     ww", 
    "  w                       ww      w",
    "  w                               w",
    "ww&                               w",  
    "w    ^                    g       w",
    "w &ffff                           w",
    "w w ffffffffffffffffffffffff      w",
    "  w     f   f   f   f   f         w",
    "  w   f   f   f   f   f   f      fw",
    "  w   ffffffffffffffffffffffffffff ",
    "  w   w",
    "  w   w                        t  ",
    "  wf    ",
    "  wff     ",
    "   fffff     ffffffffff     fffffD",
    "",
    " ",
    "  wwwwwww",
    "  w#####w",
    "  w#   #w",
    "  w# - #w",
    "  w#   #w",
    "  w#hch#w",
    "  wwwwwww",
    " ",
    " ",
    " ",
    "",
    " ",  
    " ",
    " ",
    " k",
  ],
  //5th level a real test of your skill in platforming and skill
   [" wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
    "ww                  f          ww",
    "w                   f           w",
    "w                  ff           w",
    "w          fffffffff            w", 
    "w         w                     w",
    "w         w     w               w",
    "w         w  k bw               w",
    "ww         fffff                w",
    "wwww    h                       w" ,
    "wfffffffffffffffffffffffffff    w",
    "w                               w",
    "w fff                          fw",
    "w f fffffffffffffffffffffffffffffwwww",
    "w # w                               w",
    "w f w                               w",
    "w f w                               w",
    "w f w               #               w",
    "# f w               w               w",
    "w f w          f    w    f          w",
    "w   w     f         w               w",
    "wf     f  w        www              w",
    "wfffffff ffffffffffffffffffffff    fw",
    "w  wwww                    b      ffw", 
    "w ww                       b     fffw",
    "www         f              b    fw ww",
    "w     ff        ff         b   fw  ww",
    "w   f### ###########  f    b  fw   ww",
    "w   wwww            www    b fw   -ww",
    "w    www              fffffffff    ww",
    "w     w               tffffff       w",
    "wh        ff   ff     fff  ff       w",
    "whh  off fw          fff    ff      w",
    "wfffffff f           fff     fffffD w",
    "w      # #           fff            w",
    "w      # #           fff            w",
    "w      #c#           fff            w",
    "w####################fff            w",
    "wfffffffffffffffffffffffwwwwwwwwwwwww",
  ],
]

//how the game itself runs
scene("game",() => {
  
  let hp = 2
  
  let tempinv = false
  //keycard
  let hasKey = false
  //chest key
  let hasCKey = false
  //allows you to actually jump off the plats
  let platjump = false
  //stops teleporting for a sec after you do it
  let telePaused = false
  
  let Tele2posX = 0
  
  let Tele2posY = 0
  
  let TeleposX = 0
  
  let TeleposY = 0
  
  const level = addLevel(levels[levelNum],levelConfig)

  const hpLabel = add([
      text("hp: " + hp,{"size":16}),
      pos(16,16),
      fixed()
  ])
  
  const player = add([
      sprite("hero"),
      pos(level.getPos(4,4)),
      area({scale:0.5}),
      origin("bot"),
      body(),
      {"speed": 250,"jumpSpeed": 450}
  ]) 
  //unlocks box allows it to move
  onUpdate("boxes", (b) => {
    if(hasCKey){
    b.play("unlock")
    }   
  })

  onUpdate("tele2", (t) => {
     Tele2posX = t.pos.x
     Tele2posY = t.pos.y
  })
  
  onUpdate("tele", (t) => {
     TeleposX = t.pos.x
     TeleposY = t.pos.y
  })
  
  //gate lock/unlock
  onUpdate("gate", (g) => {
    if(hasCKey){
      g.solid = false
      g.play("retract")
    }   
  }) 
  
  //plat movement
  onUpdate("platform",(p) => {
    p.move(0,p.yVel)
  })
  //height check to see if you fell off the map
  onUpdate(() => {
    if(player.pos.y >= 1000) {
       go("lose")
    }
  })
  //plat going down
  onCollide("platform","barrier",(p,b) => {
    p.yVel = -p.yVel
    p.move(0,p.yVel)
  })
  //plat going up
  onCollide("platform","floor",(p,f) => {
    p.yVel = -25
  })
  
    onCollide("platform","enemy",(p,e) => {
    p.yVel = -25
  })
  
  //player button activation
  player.onCollide("button",(c) => {
   if(hasCKey == true){
    c.play("open")
    hasKey = true
   }
  }) 
  //grabbing key
  player.onCollide("key",(k) => {
    hasCKey = true
    destroy(k)
  }) 
  //box button activation
  onCollide("boxes","button",(b,c) => {
    c.play("open")
    hasKey = true
  })
  onCollide("boxe","button",(b,c) => {
    c.play("open")
    hasKey = true
  })
  //box key grab
  onCollide("boxe","key",(b,k) => {
    hasCKey = true
    destroy(k)
  })
  //enemy button activation
  onCollide("enemy","button",(e,c) => {
    c.play("open")
    hasKey = true
  })
  //box player collision
  player.onCollide("boxes",(b) => {
   if(hasCKey == true){
    if(player.pos.x <= b.pos.x) {
    b.pos.x += 2
    }
      if(player.pos.x >= b.pos.x) {
    b.pos.x -= 2
    }
   }
  })
  player.onCollide("boxe",(b) => {
    if(player.pos.x <= b.pos.x) {
    b.pos.x += 2
    }
      if(player.pos.x >= b.pos.x) {
    b.pos.x -= 2
    }
  })
  //box pushes enemy
  onCollide("boxes","enemy",(b,e) => {
    if(b.pos.x <= e.pos.x) {
    e.pos.x += 1
    }
      if(b.pos.x >= e.pos.x) {
    e.pos.x -= 1
    }
   })
  //anti-clipping on box-wall collision
  onCollide("boxes","wall",(b,w) => {
    if(b.pos.x <= w.pos.x) {
    b.pos.x -= 1
    }
      if(b.pos.x >= w.pos.x) {
    b.pos.x += 1
    }
   })
  onCollide("boxe","wall",(b,w) => {
    if(b.pos.x <= w.pos.x) {
    b.pos.x -= 1
    }
      if(b.pos.x >= w.pos.x) {
    b.pos.x += 1
    }
   })

  //box pushes other boxes
  onCollide("boxes","boxes",(u,b) => {
    if(b.pos.x <= u.pos.x) {
    u.pos.x += 0.5
    }
      if(b.pos.x >= u.pos.x) {
    u.pos.x -= 0.5
    }
   })
  onCollide("boxe","boxes",(u,b) => {
    if(b.pos.x <= u.pos.x) {
    u.pos.x += 0.5
    }
      if(b.pos.x >= u.pos.x) {
    u.pos.x -= 0.5
    }
   })
  //teleporter box interaction
  onCollide("tele","boxes",(t,b) => {
    if(telePaused == false){
      player.pos.x = Tele2posX 
      player.pos.y = Tele2posY
      telePaused = true
      wait(0.5, () => {
       telePaused = false 
      }) 
     }
   })
  
   onKeyPress("space",() => {
     if(platjump == true) {
     player.jump(player.jumpSpeed)
     platjump = false
     }
    })
  
   //player moves on plat
   player.onCollide("platform",(p) => {
     player.play("idle")
    if(player.pos.y <= p.pos.y) {
    player.pos.y = p.pos.y-1
    }
    platjump = true
    telePaused = false
  }) 
  //animation reset on player
  player.onCollide("wall",() => {
    player.play("idle")
  }) 
  
  //the damage system
  player.onCollide("enemy",() => {
    if(tempinv == false){
      addKaboom(player.pos)
      hp--
      tempinv = true
      wait(1, () => {
    tempinv = false
    })
    }
      hpLabel.text = "hp: "+hp
    if(hp==0){
      destroy(player)
      wait(1,() => {
        go("lose")
      })
    }   
  })
  //checks for if you have the key and brings you to the next level
  player.onCollide("door",() => {
    if(hasKey){
      if(levelNum == levels.length - 1){
        go("win")
      }
      else {
        levelNum++         
        localStorage.setItem("level",levelNum)
        go("game")
      }
    } 
  })
  //teleports player
  player.onCollide("tele",(t) => {
    if(telePaused == false){
     player.pos.x = Tele2posX
     player.pos.y = Tele2posY
     telePaused = true
     wait(0.5, () => {
      telePaused = false
     })
    }
  }) 
  
  player.onCollide("tele2",(t) => {
    if(telePaused == false){
     player.pos.x = TeleposX
     player.pos.y = TeleposY
     telePaused = true
     wait(0.5, () => {
      telePaused = false
     })
    }
  }) 
  
  //health pickup
  player.onCollide("hHeart",(h) => {
      hp++
      hpLabel.text = "hp: "+hp  
      destroy(h)
  }) 
  //movement systems
  onKeyDown("d",() => {
      player.move(player.speed,0)
      player.flipX(false)
  }) 
  
  onKeyDown("right",() => {
      player.move(player.speed,0)
      player.flipX(false)
  }) 
  
  onKeyDown("a",() => {
      player.move(-player.speed,0)
      player.flipX(true)
  })  
  
   onKeyDown("left",() => {
      player.move(-player.speed,0)
      player.flipX(true)
  }) 
  
  onKeyPress(["d","a","left","right"],() => {
      player.play("run")           
  }) 
  
  onKeyRelease(["d","a","left","right"],() => {
     player.play("idle")           
  }) 
  
   onKeyPress("w",() => {
    if(player.isGrounded()) {
      player.jump(player.jumpSpeed)
    }
  })
  
   onKeyPress("up",() => {
    if(player.isGrounded()) {
      player.jump(player.jumpSpeed)  
    }
  })
  
   onKeyPress("space",() => {
     if(player.isGrounded()) {
       player.jump(player.jumpSpeed)
      }
  })
})

//the main menu
scene("menu",() => {
  add([
    text("Slime Time"),
    pos(width()/2,height()/2),
    origin("center")
  ])
  
  add([
    rect(200,65),
    "playButton",
    color(150,190,255),
    pos(width()/2,height()/2+70),
    origin("center"),
    area()
  ])
  //play button (sends you to the game and deletes save)
  add([
    text("PLAY"),
    "playButton",
    pos(width()/2,height()/2+75),
    origin("center"),
    area()
  ])
  //continue button (sends you to the game from last save)
  add([
    rect(420,70),
    "continue",
    color(150,190,255),
    pos(width()/2,height()/2+145),
    origin("center"),
    area()
  ])
  
  add([
    text("Continue?"),
    "continue",
    pos(width()/2,height()/2+150),
    origin("center"),
    area()
  ])
  
  onClick("playButton",() => {
    go("game")
  })
  
  onClick("continue",() => {
    levelNum =
    localStorage.getItem("level") ||0   
    go("game")
  })
}) 

//win scene (only shows after beating every level)
scene("win",() => {
  add([
    text("You Win!"),
    pos(width()/2,height()/2),
    origin("center")
  ])
  //same play button as menu
  add([
    rect(450,75),
    "playButton",
    color(150,190,255),
    pos(width()/2,height()/2+75),
    origin("center"),
    area()
  ])
  
  add([
    rect(300,75),
    "playButton",
    color(150,190,255),
    pos(width()/2,height()/2+175),
    origin("center"),
    area()
  ])
  //sends you to the menu screen
  add([
    text("Menu"),
    "menuButton",
    pos(width()/2,height()/2+175),
    origin("center"),
    area()
  ])
  
  add([
    text("Play Again"),
    "playButton",
    pos(width()/2,height()/2+75),
    origin("center"),
    area()
  ])
  
  onClick("playButton",() => {
    go("game")
    levelNum = 0
  })
  
  onClick("menuButton",() => {
    go("menu")
    levelNum = 0
  })
})
//lose screen (shows after losing all hp or falling into the void)
scene("lose",() => {
  add([
    text("You Lose"),
    pos(width()/2,height()/2),
    origin("center")
  ])
  //retry button (sends you to level you died at)
  add([
    rect(225,75),
    "playButton",
    color(150,190,255),
    pos(width()/2,height()/2+75),
    origin("center"),
    area()
  ])
  
  add([
    text("RETRY"),
    "playButton",
    pos(width()/2,height()/2+75),
    origin("center"),
    area()
  ])
  
  onClick("playButton",() => {
    go("game")
  })
})


go("menu")