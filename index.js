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

const player = new Player(100, 100)
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}
player.draw()

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()

    if (keys.right.pressed) {
        player.velocity.xVelocity = 5;
    } else if (keys.left.pressed) {
        player.velocity.xVelocity = -5;
    } else {
        player.velocity.xVelocity = 0;
    }

}

animate()

addEventListener('keydown', ({code}) => {
    switch (code) {
        case 'KeyA':
            console.log('left')
            // player.velocity.xVelocity -= 5
            keys.left.pressed = true

            break;

        case 'KeyD':
            console.log('right')
            // player.velocity.xVelocity += 5
            keys.right.pressed = true


            break;
            
        case 'KeyW':
            console.log('up')
            player.velocity.yVelocity -= 20
            break;
    
        default:
            break;
    }
})


addEventListener('keyup', ({code}) => {
    switch (code) {
        case 'KeyA':
            console.log('left')
            // player.velocity.xVelocity -= 5
            keys.left.pressed = false

            break;

        case 'KeyD':
            console.log('right')
            // player.velocity.xVelocity += 5
            keys.right.pressed = false


            break;
            
        case 'KeyW':
            console.log('up')
            break;
    
        default:
            break;
    }
})