
const N_BALLS = 100;
const MIN_SIZE = 10;
const MAX_SIZE = 20;

const VELOCITY_X_MIN = -5;
const VELOCITY_X_MAX = 5;
const VELOCITY_Y_MIN = -5;
const VELOCITY_Y_MAX = 5;

function random (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor() {
    return 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
}

function Ball (num, width, height, contexte) {
    this.id = num;
    this.x = random(0 + MAX_SIZE, width - MAX_SIZE);
    this.y = random(0 + MAX_SIZE, height - MAX_SIZE);
    this.velX = random(VELOCITY_X_MIN, VELOCITY_X_MAX);
    this.velY = random(VELOCITY_Y_MIN, VELOCITY_Y_MAX);
    this.color = randomColor();
    this.size = random(MIN_SIZE, MAX_SIZE);
    this.ctx = contexte;
    this.nbcollisions = 0;
    this.collisions = [];
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
    this.ctx.fillText(this.id, this.x - (this.size / 3), this.y + (this.size / 3))
}

Ball.prototype.update = function() {
    if ((this.x + this.size) >= width) {this.velX = -(this.velX)}
    if ((this.x - this.size) <= 0) {this.velX = -(this.velX)}
    if ((this.y + this.size) >= height) {this.velY = -(this.velY)}
    if ((this.y - this.size) <= 0) {this.velY = -(this.velY)}
    this.x += this.velX
    this.y += this.velY
}

Ball.prototype.is_near = function(ball) {
    let min_dist = this.size + ball.size
    let near_x = Math.abs(this.x - ball.x) < min_dist
    let near_y = Math.abs(this.y - ball.y) < min_dist
    return near_x && near_y;
}

Ball.prototype.collisionDetect = function(balls) {
    // Need optimisation !
    // N_BALLS * N_BALLS * framerate = collision test number
    // For N_BALLS = 100 -> 600 000 collision tests per second

    for (var j = 0; j < balls.length; j++) {
        if (!(this.id == balls[j].id) && this.is_near(balls[j])) {
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
