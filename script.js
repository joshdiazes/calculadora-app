let runningTotal=0;
let buffer=0;
let previousOperator;

const resultado = document.querySelector('.resultado');
const historial = document.querySelector('.historial');
function buttonClick(valor){
    if(isNaN(valor)){
        handleOperador(valor);
        if (['+','-','×','÷'].includes(valor)){
            updateHistorial(valor);
        }
        if(valor==='='){
            clearHistorial();
        }
    } else{
        handleNumero(valor);
        updateHistorial(valor);
    }
    resultado.innerText = buffer;
}
function handleOperador(operador) {
    switch (operador){
        case 'C':
            buffer = '0';
            runningTotal = 0;
            clearHistorial();
            break;
        case '=':
            if (previousOperator===null){
                return
            }
            realizarOperacion(parseInt(buffer));
            previousOperator=null;
            buffer=runningTotal;
            runningTotal=0;
            break;
        case '←':
            if (buffer.length===1){
                buffer='0'
            } else{
                buffer=buffer.substring(0,buffer.length-1);
            }
            break;
        case '.':
            handleDecimal();
            break;
        case '%':
            if (previousOperator ===null){
                buffer=(parseFloat(buffer)/100).toString();
                clearHistorial();
            } else{
                handleMath(operador);
                clearHistorial();
            }
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(operador);
            break;
    }
    resultado.innerText=buffer;
}
function handleDecimal(){
    if(!buffer.includes('.')){
        buffer+='.';
    }
}
function handleMath(operador){
    if (buffer ==='0'){
        return;
    }
    const intBuffer = parseFloat(buffer);
    if(runningTotal===0){
        runningTotal=intBuffer;
    } else{
        realizarOperacion(intBuffer);
    }
    previousOperator=operador;
    buffer='0';
}
function realizarOperacion(intBuffer){
    if(previousOperator==='+'){
        runningTotal+=intBuffer;
    } else if(previousOperator==='-'){
        runningTotal-=intBuffer; 
    } else if(previousOperator==='×'){
        runningTotal*=intBuffer; 
    } else if(previousOperator==='÷'){
        runningTotal/=intBuffer; 
    } else if(previousOperator==='%'){
        runningTotal=runningTotal*(intBuffer/100); 
    }
    buffer=runningTotal.toString();
}

function handleNumero(numberString){
    if (buffer==="0"){
        buffer=numberString;
    } else{
        buffer+=numberString;
    }
}
function updateHistorial(valor){
    historial.innerText += valor;
}
function clearHistorial(){
    historial.innerText = '';
}
function init(){
    document.querySelector('.calc-btns').
    addEventListener('click', function(event){ 
        buttonClick(event.target.innerText);
    })
}
init();
