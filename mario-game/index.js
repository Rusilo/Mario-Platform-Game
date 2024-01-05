// import platform from './mario-game-assets/platform.png'


platformImage = new Image();
platformImage.src = './mario-game-assets/platform.png'

hillsImage = new Image();
hillsImage.src = './mario-game-assets/hills.png'

backgroundImage = new Image();
backgroundImage.src = './mario-game-assets/background.png'

platformSmallTallImage = new Image();
platformSmallTallImage.src = './mario-game-assets/platformSmallTall.png'

spriteRunLeftImage = new Image();
spriteRunLeftImage.src = './mario-game-assets/spriteRunLeft.png'

spriteRunRightImage = new Image();
spriteRunRightImage.src = './mario-game-assets/spriteRunRight.png'

spriteStandLeftImage = new Image();
spriteStandLeftImage.src = './mario-game-assets/spriteStandLeft.png'

spriteStandRightImage = new Image();
spriteStandRightImage.src = './mario-game-assets/spriteStandRight.png'






const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');
canvas.width = 1024
// canvas.width = 1495
// canvas.height = window.innerHeight
canvas.height = 576

const gravity = 1.5;


// #################################### PLATFORM ######################################################

class Platform {
  constructor({xP, yP, imageSrc}){
    this.position = {
      x: xP,
      y: yP,
    }


    this.image = new Image();
    this.image.src = imageSrc;
    this.width = this.image.width;
    this.height = this.image.height;
    // this.color = 'blue';


  }

  draw(){
  ctx.drawImage(this.image, this.position.x, this.position.y)
  }
}





// ##################################### PLAYER ############################################
class Player{
  
  constructor({speed}){
    this.speed = speed;

    this.position = {
      x: 100,
      y: 100
    }

    this.velocity = {
      x: 0,
      y: 1
    }

    this.width = 30;
    this.height = 30;
    this.color = 'red';
  }


  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if(this.position.y + this.height + this.velocity.y <= canvas.height) {
    this.velocity.y += gravity;
    }
  }
}



// #########################################################################################


// ################################ GENERIC OBJECT #######################################
class GenericObject{
  constructor({xP, yP, imageSrc}){
    this.position = {
      x: xP,
      y: yP
    },

    this.image = new Image();
    this.image.src = imageSrc;
    this.width = this.image.width;
    this.height = this.image.height;
  }

  draw(){
    ctx.drawImage(this.image, this.position.x, this.position.y)
    }
}

// ####################################################################################

// ############################### INITIALIZING VALUES ################################


let player;
let platforms;
let genericObjects;


// ####################### KEYS ############################

const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  }
}

let scrollOffset = 0;


function init(){
    player = new Player({speed: 10});

    platforms = [
      new Platform({xP: ((platformImage.width * 4) + 300) -2 + platformImage.width - platformSmallTallImage.width, yP: 270, imageSrc: './mario-game-assets/platformSmallTall.png'}),
      new Platform({xP:-1, yP: 470, imageSrc: './mario-game-assets/platform.png'}), 
      new Platform({xP: (platformImage.width - 3), yP: 470, imageSrc: './mario-game-assets/platform.png'}),
      new Platform({xP: ((platformImage.width * 2) + 100), yP: 470, imageSrc: './mario-game-assets/platform.png'}),
      new Platform({xP: ((platformImage.width * 3) + 300), yP: 470, imageSrc: './mario-game-assets/platform.png'}),
      new Platform({xP: ((platformImage.width * 4) + 300) -2, yP: 470, imageSrc: './mario-game-assets/platform.png'}),
      new Platform({xP: ((platformImage.width * 5) + 700) -2, yP: 470, imageSrc: './mario-game-assets/platform.png'}),
      new Platform({xP: ((platformImage.width * 6) + 900) -2, yP: 470, imageSrc: './mario-game-assets/platform.png'}),
    ];



    genericObjects = [new GenericObject({xP:-1, yP:-1, imageSrc: "./mario-game-assets/background.png" }), new GenericObject({xP:0, yP:0, imageSrc: "./mario-game-assets/hills.png"})]




    scrollOffset = 0;


}







//#######################  Animation loop ##################################
function animate(){

  requestAnimationFrame(animate);
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  genericObjects.forEach(genericObject => {genericObject.draw()})

  
  platforms.forEach(platform => platform.draw());
  player.update();
  
  
  

  if(keys.right.pressed && player.position.x < 400){
    player.velocity.x = player.speed;}
  else if((keys.left.pressed && player.position.x > 100) || keys.left.pressed && scrollOffset === 0 && player.position.x > 0){
player.velocity.x = -player.speed
  }
  else {
    player.velocity.x = 0;

    if(keys.right.pressed){
      scrollOffset += player.speed;
      platforms.forEach(platform => platform.position.x -= player.speed)
      genericObjects.forEach(genericObject => genericObject.position.x -= player.speed * 0.06)
    }else if(keys.left.pressed && scrollOffset > 0){
      scrollOffset -= player.speed;
      platforms.forEach(platform => platform.position.x += player.speed);
      genericObjects.forEach(genericObject => genericObject.position.x += player.speed * 0.06);
    }
  }


//PLATFORM COLLISION DETECTION
platforms.forEach(platform => {
  if(player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width){
    player.velocity.y = 0
  }
})

// Win condition

  if(scrollOffset > (((platformImage.width * 5) + 300) -2)){
    console.log("You win!");
  }

  // Lose condition
  if(player.position.y > canvas.height){
    init();
  }
}

init();
animate();


window.addEventListener('keydown', ({ keyCode }) => {
  console.log(keyCode);
  switch (keyCode) {
    case 65:
      keys.left.pressed = true;
      break;

    case 83:
      break;
      
    case 68:
      keys.right.pressed = true;
      break;

    case 87:
      player.velocity.y -= 25;
      break;
  }
})


window.addEventListener('keyup', ({ keyCode }) => {
  console.log(keyCode);
  switch (keyCode) {
    case 65:
      keys.left.pressed = false;
      break;

    case 83:
      break;
      
    case 68:
      keys.right.pressed = false;
      break;
      
    case 87:
      break;
  }
})

