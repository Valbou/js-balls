
window.addEventListener('load', function() {
    canvas = this.document.querySelector('canvas');
    listeInfosBalles = this.document.querySelector('ul');
    infoCanvas = this.document.querySelector('p');

    contexte = canvas.getContext('2d');
    height = canvas.height = canvas.offsetHeight;
    width = canvas.width = canvas.offsetWidth;
    infoCanvas.textContent = 'Canvas ' + width + 'x' + height + 'px';

    span = document.createElement('span');
    span.setAttribute('id', 'framerate');
    infoCanvas.appendChild(span);

    let ballsEl = [];
    for(let i = 0; i < N_BALLS; i++)
    {
        ballsEl[i] = this.document.createElement('li')
        listeInfosBalles.appendChild(ballsEl[i])
    }

    let balls = [];
    let frameRate = 0;
    let isPaused = false;

    function loop() {
        contexte.fillStyle = 'rgba(0, 0, 0, 0.25)'
        contexte.fillRect(0, 0, width, height)
        frameRate++

        for(let i = 0; balls.length < N_BALLS; i++) {
            var ball = new Ball(i, width, height, contexte)
            balls.push(ball)
        }

        for (let i = 0; i < balls.length; i++) {
            balls[i].draw()
            balls[i].update()
            balls[i].collisionDetect(balls)
        }

        if (isPaused) {
            window.cancelAnimationFrame();
        }
        else {
            requestAnimationFrame(loop)
        }
    }

    function majFrameRate() {
        span.textContent = ' ('+ frameRate +'fps)'
        frameRate = 0
    }
    this.window.setInterval(majFrameRate, 1000)
    
    function majInfos() {
        if(!isPaused) {
            balls.sort((a, b) => a.nbcollisions - b.nbcollisions);
            for(let i = 0; i < N_BALLS; i++) {
                ballsEl[i].textContent = balls[i].infos()
            }
        }
    }
    this.window.setInterval(majInfos, 100)

    window.onkeydown = function(e) {
         // Flips the pause state
        if(e.key === "p") {
            isPaused = !isPaused;
            if (!isPaused) {
                loop();
            }
        }
    };

    loop();
})