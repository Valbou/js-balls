
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

    listeballs = []
    for(let i = 0; i < N_BALLS; i++)
    {
        listeballs[i] = this.document.createElement('li')
        listeInfosBalles.appendChild(listeballs[i])
    }

    let balls = [];
    let frameRate = 0;

    function loop() {
        contexte.fillStyle = 'rgba(0, 0, 0, 0.25)'
        contexte.fillRect(0, 0, width, height)
        frameRate++

        for(let i = 0; balls.length < N_BALLS; i++) {
            var ball = new Ball(
                i,
                random(0 + MAX_SIZE, width - MAX_SIZE),
                random(0 + MAX_SIZE, height - MAX_SIZE),
                random(-5, 5),
                random(-5, 5),
                randomColor(),
                random(MIN_SIZE, MAX_SIZE),
                contexte
            )
            balls.push(ball)
        }

        for (let i = 0; i < balls.length; i++) {
            balls[i].draw()
            balls[i].update()
            balls[i].collisionDetect(balls)
        }
        requestAnimationFrame(loop)
    }

    function majInfos() {
        balls.sort((a, b) => a.nbcollisions - b.nbcollisions);
        for(let i = 0; i < N_BALLS; i++)
        {
            listeballs[i].textContent = balls[i].infos()
        }
        span.textContent = ' ('+ frameRate +'fps)'
        frameRate = 0
    }
    this.window.setInterval(majInfos, 1000)

    loop()
})