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
   "f": () => [
    "floor",
    color(50,50,200),
    rect(16,16),
    area(),
    solid()
  ],
  "b": () => [
    "barrier",
    rect(32,64),
    area(),
    origin("left"),
    solid()
    //opacity(0)
  ],
  //green enemy
  "o": () => [
    "enemy",
    sprite("ogre",{
      "anim":"run"
    }),
    area({
      "scale":0.50
    }),
    origin("center"),
    {
      "xVel": 25
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
    rect(32,32),
    area({
      "scale": 0.60
    }),
    solid(),
    origin("left")
  ],
  //required to win
    "c": () => [
    "chest",
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
  ],
}

let levelNum = 0

const levels = [
  //1st level introduces you to an enemy, the heart pickup, and the knowledge that you need the chest.
  [ "w    wwwwwwwwwwwwwww          ",
    "w             ww",
    "w             ",
    "w     c       ",   
    "w    ww       b",
    "w s h     d    "  ,
    "fffff   ffffffffffffD "
  ],
  //2nd level introduces you to the platforming.
  [ "w    wwwwwwwwwwwwwwwwwwwwwwwwwwwww",
    "w            ",
    "w            ",
    "w                     c",
    "w     ff  ff  f   f  ff  ff",
    "w s      b    d  h   d    b",
    "fffff ff  ff  ff ff  ff  fffffD "
  ],
  //3rd level starts to test your platforming skill.
   ["w     wwwwwwwwwwwwwwwwwwwwwwwwwww",
    "w           ",
    "w           ",
    "w           ",
    "w           ", 
    "w                ", 
    "w              b d  bh       ",
    "w         h   f  f  ff    ff",
    "w        ff               ww",
    "w    ff                   ww",
    "w s   b       o      o b  wwfc  " ,
    "ffffffffffffffffffffffffffffffffD "
  ],
  //4th ups the difficulty by adding enemies that you have to jump between.
  [ "w     wwwwwwwwwwwwwwwwwwwwwwwwwww",
    "w                               w",
    "w                               w",
    "w                               w",
    "w                               w", 
    "w              b d bh           w",
    "w         h   f  f  f           w",
    "w        ff         wc   b   d bw",
    "w    ff  ww         ffffff      w",
    "w s   b       o      o b        w" ,
    "wfffffffffffffffffffffffff      w",
    "w     f   f   f   f   f         w",
    "w   f   f   f   f   f   f       w",
    "w   ffffffffffffffffffffffffffff ",
    "w   w",
    "w   w  b         d             b",
    "w     ",
    "w      b  o    o    o    o   o b",
    "wfffffffffffffffffffffffffffffffD",
  ],
  //5th level a real test of your skill in platforming
   [ "w     wwwwwwwwwwwwwwwwwwwwwwwwwww",
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
  
  let hasKey = false
  
  const level = addLevel(levels[levelNum],levelConfig)

  const hpLabel = add([
      text("hp: " + hp,{"size":16}),
      pos(16,16),
      fixed()
  ])
  
  const player = add([
      sprite("hero"),
      pos(level.getPos(2,0)),
      area({scale:0.5}),
      origin("bot"),
      body(),
      {"speed": 200,"jumpSpeed": 420}
  ])
  
  onUpdate("barrier", (b) => {
    if(hasKey){
      b.solid = false
    }   
  }) 
  
  //allows the enemies to move
  onUpdate("enemy",(e) => {
    e.move(e.xVel,0)
  })
  //height check to see if you fell off the map
  onUpdate(() => {
    if(player.pos.y >= 1000) {
       go("lose")
    }
  })
  //keeps the enemies within a confined area
  onCollide("enemy","barrier",(e,b) => {
    e.xVel = -e.xVel
    e.move(e.xVel,0)
    if(e.xVel < 0) {
       e.flipX(true)
    }
    else{
      e.flipX(false)
    }
  })
  
  player.onCollide("chest",(c) => {
    c.play("open")
    hasKey = true
  }) 
  
  player.onCollide("wall",() => {
    player.play("idle")
  }) 
  //the damage system
  player.onCollide("enemy",() => {
    addKaboom(player.pos)
      hp--
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