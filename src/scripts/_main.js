const canvas = document.getElementById("game-screen");
const canvasContext2D = canvas.getContext("2d");

let stars = [];

class Rect {
    /***
     * @params (Eixo X, Eixo Y, Largura, Altura, Canvas Context)
     */
    constructor(x, y, width, heigth, canvasContext) {
        this.posX = x;
        this.posY = y;
        this.width = width;
        this.heigth = heigth;
        this.ctx = canvasContext;
    }

    draw() {
        this.ctx.fillStyle = "#009090"
        
        this.ctx.fillRect(
            this.posX, 
            this.posY, 
            this.width, 
            this.heigth
        );
    }

    coordinates(x, y){
        this.posX = x;
        this.posY = y;
    }
}

let quadrado = new Rect(500, 10, 50, 50, canvasContext2D);



for (let i = 0; i < 10; i++) {
    let cX = Math.floor(Math.random() * 800);
    let cY = Math.floor(Math.random() * 600);
    quadrado.coordinates(cX, cY);
    quadrado.draw();
}

