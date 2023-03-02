const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

context.fillRect(0,0,canvas.width,canvas.height)
const gravity = 0.25


const background = new Sprite({
  position: {
    x:0,
    y:0
  },
  imageSrc: ''
})

const shop = new Sprite({
  position: {
    x: 600,
    y: 128
  },
  imageSrc: 
  scale: 2.75,
  frameMax: 6
})


class Sprite{
  constructor({position, velocity}){
    this.position=position
    this.velocity=velocity
    this.height = 150
  }
  draw(){
    context.fillStyle='red'
    context.fillRect(this.position.x,this.position.y,50, this.height)
  }
  update() {
    this.draw()

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    if(this.position.y + this.height + this.velocity.y >= canvas.height){
      this.velocity.y = 0
    } else this.velocity.y += gravity

  }
}
  

const player = new Fighter({
  position: {
  x:0,
  y:0
},
velocity: {
  x:0,
  y:0
},
offset: {
  x: 0,
  y: 0
},
imageSrc:
framesMax:8 ,
scale: 2.5,
offset: {
  x:217,
  y:160
},
sprites: {
  idle: {
    imageSrc:
    frameMax: 8
  },
  jump: {
    imageSrc:
    framesMax: 2
  },
  fall: {
    imageSrc:
    frameMax:2
  },
  attack1:{
    imageSrc:
    frameMax:6
  },
  takeHit:{
    imageSrc:
    frameMax:4
  },
  death:{
    imageSrc:
    frameMax:6
  }
},
attackbox: {
  offset: {
    x:100,
    y:50
  },
  width:160,
  height: 50
}
})



const enemy = new Fighter({
  position: {
  x:400,
  y:100
},
velocity: {
  x:0,
  y:0
},
color: 'blue',
offset: {
  x:-50,
  y:0
},
imageSrc:
framesMax:4,
scale:2.5,
offset: {
  x:215,
  y:167
},
sprites: {
  idle: {
    imageSrc:
    frameMax: 4
  },
  run: {
    imageSrc:
    framesMax:8
  },
  jump: {
    imageSrc:
    framesMax: 2
  },
  fall: {
    imageSrc:
    frameMax:2
  },
  attack1:{
    imageSrc:
    frameMax:4
  },
  takeHit:{
    imageSrc:
    frameMax:3
  },
  death:{
    imageSrc:
    frameMax:7
  }
  },

attackbox: {
  offset: {
    x:-170,
    y:50
  },
  width:170,
  height: 50
}
})



console.log(player)

const keys = {
  a: {
    pressed: false
  }, 
  d: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  }
}

decreaseTimer()
//let lastKey 

function animate() {
  window.requestAnimationFrame(animate)
  context.fillStyle = 'black'
  context.fillRect(0,0,canvas.width,canvas.height)
  background.update()
  shop.update()
  context.fillStyle='rgba(255,255,255,0.15)'
  context.fillRect(0,0,canvas.width,canvas.height)
  player.update()
  enemy.update()

  player.velocity.x = 0
  enemy.velocity.x=0

  if(keys.a.pressed && lastKey === 'a') {
    player.velocity.x = -5
    player.switchSprite('run')
  } else if(keys.d.pressed && lastKey === 'd') {
    player.velocity.x = 5
    player.switchSprite('run')
  } else {
    player.switchSprite('idle')
  }

  if(player.velocity.y<0){
    player.switchSprite('jump')
  } else if(player.velocity>0){
    player.switchSprite('fall')
  }

  if(keys.ArrowLeft.pressed && enemy.lastKey==='ArrowLeft'){
    enemy.velocity.x=-5
    enemy.switchSprite('run')
  } else if(keys.ArrowRight.pressed && enemy.lastKey==='ArrowRight'){
    enemy.velocity.x=5
    enemy.switchSprite('run')
  } else{
    enemy.switchSprite('idle')
  }
  if (enemy.velocity.y < 0) {
    enemy.switchSprite('jump')
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite('fall')
  }

  if(
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy,
      }) &&
      player.isAttacking && 
      player.framesCurrent===4
  ) {
    enemy.takeHit()
    player.isAttacking = false
    gsap.to('#enemyHealth', {
      width: enemy.health +'%'
    })
  }

  if(player.isAttacking && player.framesCurrent===4){
    player.isAttacking = false
  }

  if(
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player
    }) &&
    enemy.isAttacking &&
    enemy.framesCurrent===2
  ) {
    player.takeHit()
    enemy.isAttacking = false
    gsap.to('#playerHealth', {
      width: player.health +'%'
    })
  }

  if(enemy.health<=0 || player.health<=0){
    determineWinner()
  }
}


animate()

window.addEventListener( 'keydown', (event) => {
  if(!player.dead) {
    switch(event.key) {
      case 'ArrowRight':
        keys.d.pressed =true
        player.lastKey='Arrowright'
        break
      case 'ArrowLeft':
        keys.d.pressed =true
        player.lastKey='ArrowLeft'
        break
      case 'ArrowUp':
        player.velocity.y=-20
        break
      case 'ArrowDown ':
        player.attack()
        break
    }
  }
})

window.addEventListener('keyup',(event) =>{
  switch(event.key) {
    case 'd':
      keys.d.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
  }

  switch(event.key){
    case 'ArrowRight':
      keys.ArrowRight.pressed = false
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false
      break
  }
})