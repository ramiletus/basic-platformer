const canvas = document.querySelector('canvas')

canvas.width = innerWidth
canvas.height = innerHeight

const c = canvas.getContext('2d')

gravity = 1.5

class Player {
    constructor(x, y) {
        this.position = {
            x: x,
            y: y
        }

        this.velocity = {
            xVelocity: 0,
            yVelocity: 1
        }

        this.width = 30
        this.height = 30
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()

        this.position.x += this.velocity.xVelocity
        this.position.y += this.velocity.yVelocity    

        if(this.position.y + this.height + this.velocity.yVelocity <= canvas.height){
            this.velocity.yVelocity += gravity
        } else {
            this.velocity.yVelocity = 0
        }


    }
}

let platformImage = new Image()

//Can't get to access the image width and height properties
//once created the Image object, since they value 0 each,
//so I'm fixing the width and height as constants since they are known
let platformImageSize = {
    width: 580,
    height: 125
}
platformImage.src = './platform.png'

class Platform {
    constructor(x, y) {
        this.position = {
            x: x,
            y: y
        }

        this.image = platformImage

        console.log(this.image)
        
        this.width = platformImageSize.width
        this.height = platformImageSize.height
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

player = new Player(100, 200)
platformArray = []

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

let scrollOffset = 0

function init(){
    player = new Player(100, 200)

    platformArray = []
    platform1 = new Platform(200, 100)
    platform2 = new Platform(500, 300)
    platform3 = new Platform(0, canvas.height - platformImageSize.height)
    platformArray.push(platform1)
    platformArray.push(platform2)
    platformArray.push(platform3)
}
player.draw()

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()


    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.xVelocity = 3;
    } else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.xVelocity = -3;
    } else {
        //Parallex effect can be implemented here, just by
        //adding an extra array of backgorund objects and
        //changing their position.x by a different amount
        player.velocity.xVelocity = 0;
        if (keys.right.pressed) {
            scrollOffset += 5
            platformArray.forEach(platform => platform.position.x -= 3)
        } else if (keys.left.pressed) {
            scrollOffset -= 5
            platformArray.forEach(platform => platform.position.x += 3)
        }
    }

    //collision detection with all platforms
    platformArray.forEach(platform => {
        platform.draw()
        if (
            player.position.y + player.height <= platform.position.y 
        &&  player.position.y + player.height + player.velocity.yVelocity >= platform.position.y
        &&  player.position.x + player.width >= platform.position.x
        &&  player.position.x + player.width <= platform.position.x + platform.width 
        )
        {
            player.velocity.yVelocity = 0;
        }
    });

    //Win condition
    if (scrollOffset > 2000) {
        console.log("you win")
    }
    
    //Loose condition
    if (player.position.y + player.height+ 1 > canvas.height) {
        console.log("you loose")
        init()
    }

}

init()
animate()

addEventListener('keydown', ({code}) => {
    switch (code) {
        case 'KeyA':
            console.log('left')
            keys.left.pressed = true

            break;

        case 'KeyD':
            console.log('right')
            keys.right.pressed = true


            break;
            
        case 'KeyW':
            console.log('up')
            player.velocity.yVelocity -= 50
            break;
    
        default:
            break;
    }
})


addEventListener('keyup', ({code}) => {
    switch (code) {
        case 'KeyA':
            console.log('left')
            keys.left.pressed = false

            break;

        case 'KeyD':
            console.log('right')
            keys.right.pressed = false


            break;
            
        case 'KeyW':
            console.log('up')
            break;
    
        default:
            break;
    }
})