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

class Platform {
    constructor(x, y, widht, height) {
        this.position = {
            x: x,
            y: y
        }
        
        this.width = widht
        this.height = height
    }

    draw() {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }


}

const player = new Player(100, 200)

const platformArray = []
const platform1 = new Platform(100, 100, 150, 25)
const platform2 = new Platform(300, 250, 250, 25)
platformArray.push(platform1)
platformArray.push(platform2)

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

let scrollOffset = 0

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

    if (scrollOffset > 2000) {
        console.log("scroll offset")
    }

}

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