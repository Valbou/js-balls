
const N_BALLS = 100;
const MIN_SIZE = 10;
const MAX_SIZE = 20;

function random (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor() {
    return 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
}

function Ball (num, x, y, velX, velY, color, size, contexte) {
    this.id = num
    this.x = x
    this.y = y
    this.velX = velX
    this.velY = velY
    this.color = color
    this.size = size
    this.ctx = contexte
    this.nbcollisions = 0
}

Ball.prototype.infos = function () {
    return 'n°' + this.id + ': ' + this.nbcollisions + ' collisions'
}

Ball.prototype.draw = function () {
    this.ctx.beginPath()
    this.ctx.fillStyle = this.color
    this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
    this.ctx.font = this.size+"px Arial"
    this.ctx.fill()
    this.ctx.fillStyle = "rgb(255,255,255)"
    this.ctx.fillText(this.id, this.x - (this.size/3), this.y + (this.size/3))
}

Ball.prototype.update = function() {
    if ((this.x + this.size) >= width) {this.velX = -(this.velX)}
    if ((this.x - this.size) <= 0) {this.velX = -(this.velX)}
    if ((this.y + this.size) >= height) {this.velY = -(this.velY)}
    if ((this.y - this.size) <= 0) {this.velY = -(this.velY)}
    this.x += this.velX
    this.y += this.velY
}

Ball.prototype.collisionDetect = function(balls) {
    // Need optimisation !
    // N_BALLS * N_BALLS * framerate = collision test number
    // For N_BALLS = 100 -> 600 000 collision tests

    for (var j = 0; j < balls.length; j++) {
        if (!(this.id === balls[j].id)) {
            var dx = this.x - balls[j].x
            var dy = this.y - balls[j].y
            var distance = Math.sqrt(dx * dx + dy * dy)

            if (distance <= this.size + balls[j].size) {
                balls[j].color = this.color = randomColor();
                balls[j].nbcollisions++
            }
        }
    }
}
