let listaNumerosSorteados = [];
let max = 1000;
let numeroSecreto = geraNumeroAleatorio(max);
let tentativas = 0;

msgInicial();



function alteraTexto (tag , texto){
    let campo = document.querySelector (tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2} ); 
}

function msgInicial(){
    alteraTexto ('h1' , 'Bem vindo ao jogo do número secreto');

    alteraTexto ('p' , `Escolha um numero entre 1 e ${max}:`); 
}

function chutar (){
    let chute = document.querySelector ('input').value;
    tentativas++;
    limpaCampo ();
    if (chute == numeroSecreto) {
        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemCerta = `O numero secreto é ${numeroSecreto}. Você precisou de ${tentativas} ${palavraTentativas}!`;
        alteraTexto ('h1', 'ACERTOU!');
        alteraTexto ('p', mensagemCerta);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('chutar').setAttribute('disabled',true);
        } else if (chute > numeroSecreto) {
        alteraTexto ('h1', 'ERROU!');
        alteraTexto ('p', 'O numero secreto é menor que ' + chute);
    } else {
        alteraTexto ('h1', 'ERROU!');
        alteraTexto ('p', 'O numero secreto é maior que ' + chute);
    }
}

function geraNumeroAleatorio() {
    let numeroSorteado = parseInt(Math.random() * max + 1);
    let tamanhoLista = listaNumerosSorteados.length;

    if (tamanhoLista == max){
        alert ('Sua lista será limpa');
        listaNumerosSorteados = [];
    }
    
    if (listaNumerosSorteados.includes(numeroSorteado)){
        return geraNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroSorteado);
        console.log(listaNumerosSorteados);
        return numeroSorteado;
    }
}

function limpaCampo(){
    campo = document.querySelector ('input');
    campo.value = '';
}

function reiniciaJogo(){
    numeroSecreto = geraNumeroAleatorio();
    tentativas = 0;
    limpaCampo();
    msgInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
    document.getElementById('chutar').removeAttribute('disabled');
}
