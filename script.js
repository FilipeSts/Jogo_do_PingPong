// Nome: Jogo da Raquete
window.onload = function () {
    setInterval(executar, 1000 / 30)
}

var folhaDesenho = document.getElementById("folha");
var areaDesenho = folhaDesenho.getContext("2d");

var larguraCampo = 600;
var alturaCampo = 500;
var espessuraRede = 2;

var diametroBola = 10;

var espessuraRaquete = 5;
var alturaRaquete = 100;

var efeitoRaquete = 0.3;
var velocidadeJogador2 = 7
posicaoJogador1 = posicaoJogador2 = 40;
var posicaoBolaX = posicaoBolay = 10;
var velocidadeBolaPosicaoX = velocidadeBolaPosicaoY = 10;
var pontuacaoJogador1 = pontuacaoJogador2 = 0;


folhaDesenho.addEventListener('mousemove', function (e) {
    posicaoJogador1 = e.clientY - alturaRaquete / 2
})


function executar() {

    // campo
    areaDesenho.fillStyle = "#286047";   // Campo
    areaDesenho.fillRect(0, 0, larguraCampo, alturaCampo);
    areaDesenho.fillStyle = "#ffffff";  // COR branca
    areaDesenho.fillRect(larguraCampo / 2 - espessuraRede / 2, 0, espessuraRede, alturaCampo);
    areaDesenho.fillRect(posicaoBolaX - diametroBola / 2, posicaoBolay - diametroBola / 2, diametroBola, diametroBola) // Bola 


    // raquete 1
    areaDesenho.fillRect(0, posicaoJogador1, espessuraRaquete, alturaRaquete);
    areaDesenho.fillRect(larguraCampo - espessuraRaquete, posicaoJogador2, espessuraRaquete, alturaRaquete);

    // Escrever pontuação do jogo
    areaDesenho.fillText("Humano - " + pontuacaoJogador1 + "Pontos", 100, 100);
    areaDesenho.fillText("Computador- " + pontuacaoJogador2 + "Pontos", larguraCampo - 200, 100);

    // posicao inical bola
    posicaoBolaX = posicaoBolaX + velocidadeBolaPosicaoX
    posicaoBolay = posicaoBolay + velocidadeBolaPosicaoY


    // verifica lateral 
    if (posicaoBolay < 0 && velocidadeBolaPosicaoY < 0) {
        velocidadeBolaPosicaoY = -velocidadeBolaPosicaoY
    }
    if (posicaoBolay > alturaCampo && velocidadeBolaPosicaoY > 0) {
        velocidadeBolaPosicaoY = -velocidadeBolaPosicaoY
    }


    //verifica se jogador 2 fez ponto 
    if (posicaoBolaX < 0) {
        if (posicaoBolay > posicaoJogador1 && posicaoBolay < posicaoJogador1 + alturaRaquete) {
            //rebater a bola 
            velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX

            var diferencaY = posicaoBolay - (posicaoJogador1 + alturaRaquete / 2);
            velocidadeBolaPosicaoY = diferencaY * efeitoRaquete
        } else {
            //pontos jogador 2
            pontuacaoJogador2++
            // colocar no centro

            posicaoBolaX = larguraCampo / 2;
            posicaoBolay = larguraCampo / 2;
            velocidadeBolaPosicaoX = - velocidadeBolaPosicaoX;
            velocidadeBolaPosicaoY = 3;
        }
    }

    //Verifica se o jogador 1 fez ponto
    if (posicaoBolaX > larguraCampo) {
        if (posicaoBolay > posicaoJogador2 && posicaoBolay < posicaoJogador2 + alturaRaquete) {
            //Rebater a bola
            velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;

            var diferencaY = posicaoBolay - (posicaoJogador2 + alturaRaquete / 2);
            velocidadeBolaPosicaoY = diferencaY * efeitoRaquete
        } else {
            // Pontos do Jogador 1
            pontuacaoJogador1++

            posicaoBolaX = larguraCampo / 2;
            posicaoBolay = larguraCampo / 2;
            velocidadeBolaPosicaoX = - velocidadeBolaPosicaoX;
            velocidadeBolaPosicaoY = 3;
        }
    }

    if (posicaoJogador2 + alturaRaquete / 2 < posicaoBolay) {
        posicaoJogador2 = posicaoJogador2 + velocidadeJogador2;
    } else {
        posicaoJogador2 = posicaoJogador2 - velocidadeJogador2;
    }

}
