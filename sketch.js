//the library being used
kaboom({
  scale: 1,
  background: [10,150,200],
})
//how the sprites are retrieved and loaded
loadSpriteAtlas("https://kaboomjs.com/sprites/dungeon.png", "atlas.json");

//the setup for the levels
const levelConfig = {
  width: 16,
  height: 16,
  pos: vec2(32,32),
  "w": () => [
    "wall",
    rect(16,16),
    color(50,50,200),
    area(),
    solid()
  ],
  "&": () => [
    "wallp",
    rect(16,16),
    color(50,50,200),
    area(),
    solid()
  ],
   "f": () => [
    "floor",
    color(50,50,200),
    rect(16,16),
    area(),
    solid()
  ],
  "*": () => [
    "floor",
    color(50,50,200),
    rect(16,16),
    area(),
    opacity(0)
  ],
  "g": () => [
    "gate",
    rect(32,64),
    area(),
    origin("left"),
    solid()
    //opacity(0)
  ],
  "B": () => [
    "barrier",
    rect(16,16),
    area(),
    opacity(0)
  ],
  //green enemy
  "p": () => [
    "platform",
    rect(32,16),
    area(),
    solid(),
    origin("top"),
    {
      "yVel": -25
    }
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
    rect(32,16),
    area({
      "scale": 0.60
    }),
    solid(),
    origin("topleft")
  ],
  //required to win
    "c": () => [
    "button",
    sprite("chest"),
    area(),
    solid(),
    origin("topleft")
  ],
  //red enemy
  "d": () => [
    "enemy",
    color(200,20,20),
    rect(16,16),
    area(),
    body(),
    cleanup()
  ],
  //red enemy
  "#": () => [
    "enemy",
    color(50,100,250),
    rect(16,16),
    area(),
    solid(),
    cleanup()
  ],
   "b": () => [
    "boxes",
    color(160,100,20),
    rect(16,16),
    area(),
    body(),
    cleanup()
  ],
  "k": () => [
    "key",
    color(250,250,0),
    rect(16,16),
    area(),
  ],
  "u": () => [
    "button",
    sprite("chest"),
    area(),
    solid(),
    origin("topleft")
  ],
  "t": () => [
    "tele",
    color(150,30,150),
    rect(16,16),
    area(),
    origin("topleft")
  ],
  "-": () => [
    "tele2",
    color(150,30,150),
    rect(16,16),
    area(),
    origin("topleft")
  ],
}

let levelNum = 0

const levels = [
  //1st level introduces you to an enemy, the heart pickup, and the knowledge that you need the chest.
  [ " wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
    "w                                        ww",
    "w             ",
    "w                            ",   
    "w             k                          g",
    "w s  h      d         b              ",
    " ffffffffffffffffffffffffff      fffffffffffD ",
    "                          w      w",
    "                          w      w",
    "                          w     fw",
    "                          w     ww",
    "                          w    fww",
    "                          w  ffffw",
    "                        ww&      w",
    "                        w &      w",
    "                        wc&ffffffw",
    "                        www        ",

  ],
  //2nd level introduces you to the platforming.
  [ " wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
    "w                                w",
    "w -                              w",
    "w                                w",
    "w                                w",
    "w                                w",
    "w          B       B             w",
    "w    f                           w",
    "w    w                  ff       w",
    "w s fw     p       p    w        w",
    "wffffwf################fffffD    w",
    "w                                w",
    "w                                w",
    "w                 B              w",
    "w                                w",
    "wt                p              w",
    "wfff              *  ffffffffffffw",
    "          ",
    "          ",
    "          ",
    "          ",
    "          ",
  ],
  //3rd level starts to test your platforming skill.
   [" wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
    "w       w   ",
    "w       w   ",
    "w       w   ",
    "w       w   ", 
    "w       w        ", 
    "w       wwwwwwwwww",
    "w         ",
    "w         ",
    "w sh",
    "wddddddddddddddddd      c",
    " fffffffffwwwwwwwwwwwwwwfffD "
  ],
  //4th ups the difficulty by adding enemies that you have to jump between.
  [ "  wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww ",
    " w                               w",
    " w                               w",
    " w                               w",
    " w                               w", 
    " w                               w",
    " w                               w",
    " w                               w",  
    " w                               w",
    " w s                             w",
    " wfffffffffffffffffffffffff      w",
    " w     f   f   f   f   f         w",
    " w   f   f   f   f   f   f       w",
    " w   ffffffffffffffffffffffffffff ",
    " w   w",
    " w   w  b         d             b",
    " w     ",
    " w      b  o    o    o    o   o b",
    "  fffffffffffffffffffffffffffffffD",
  ],
  //5th level a real test of your skill in platforming
   ["wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
    "w                               w",
    "w                               w",
    "w                               w",
    "w                   f           w", 
    "w              b d bw      ff   w",
    "w         h   f  f  w     w     w",
    "w        ff         w     w     w",
    "w    ff  ww         fffffff     w",
    "w s   b       o      o b        w" ,
    "wfffffffffffffffffffffffffff    w",
    "wwwfff    f   f   f   f   f     w",
    "w       f   f   f   f   f   f   w",
    "wff fffffffffffffffffffffffffffffwwww",
    "w   w                               w",
    "w ffw                               w",
    "w   w                               w",
    "wff w         b     d       b       w",
    "w   w                               w",
    "w ffw          f          f         w",
    "w   w     f    w    f     w         w",
    "wff    f  w         w         f     w",
    "wfffffff                            w",
    "wwwwwww                         b obw", 
    "wwww       b       d       b     fffw",
    "www                             fwwww",
    "w  b  o b       ff             fwwwww",
    "w   ffff  ff    ww    ff      fwwwwww",
    "w   wwww        w     w    fffwwwwwww",
    "w    www                            w",
    "w     w                             w",
    "w                                   w",
    "wc b o  b      ff         w  b  o b w",
    "wffffffffff         ff       ffffffD",
  ],
]

//how the game itself runs
scene("game",() => {
  
  let hp = 2
  
  let tempinv = false
  
  let hasKey = false
  
  let hasCKey = false
  
  let platjump = true
  
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
      {"speed": 200,"jumpSpeed": 420}
  ]) 
  onUpdate("boxes", (b) => {
    if(hasCKey){
     b.color.r = 200
     b.color.g = 140
     b.color.b = 60
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
  onUpdate("gate", (b) => {
    if(hasKey){
      b.solid = false
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
  //enemy button activation
  onCollide("enemy","button",(e,c) => {
    c.play("open")
    hasKey = true
  })
  //box player collision
  player.onCollide("boxes",(b) => {
   if(hasCKey == true){
    if(player.pos.x <= b.pos.x) {
    b.pos.x += 1
    }
      if(player.pos.x >= b.pos.x) {
    b.pos.x -= 1
    }
   }
  })
  //box pushes enemy
  onCollide("boxes","enemy",(b,e) => {
    if(b.pos.x <= e.pos.x) {
    e.pos.x += 0.5
    }
      if(b.pos.x >= e.pos.x) {
    e.pos.x -= 0.5
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

  //box pushes other boxes
  onCollide("boxes","boxes",(u,b) => {
    if(b.pos.x <= u.pos.x) {
    u.pos.x += 0.5
    }
      if(b.pos.x >= u.pos.x) {
    u.pos.x -= 0.5
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
    onKeyPress("space",() => {
     if(platjump == true) {
     player.jump(player.jumpSpeed)
     platjump = false
     }
    })
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
     if(player.isGrounded) {
       player.jump(player.jumpSpeed)      
      }      
  })
})

//the main menu
scene("menu",() => {
  add([
    text("Dragon World"),
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