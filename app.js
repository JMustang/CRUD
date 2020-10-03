window.addEventListener("load", start);

//variaveis globais
var GlobalNames = ["Um", "Dois", "Tres", "Quatro", "Cinco"];
var nomes = document.querySelector("#nomes");
var ul = document.createElement("ul");
var Input = document.getElementById("Input");
var form = document.getElementById("Formulario");
var isEditing = false;
var Posicao;

start = () => {
    PrevenirComportamentoDefault(form);
    AplicarFoco(Input);
    CapiturarValoresDigitados(Input);
    ExibirVetor();
}

PrevenirComportamentoDefault = (Objeto) => {
    Objeto.addEventListener("submit", (event) => {
        event.preventDefault();
    });
}

AplicarFoco = (Objeto) => {
    Objeto.focus();
}

CapiturarValoresDigitados = (Objeto) => {
    Objeto.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            var ValorDigitado = event.target.value;

            if (ValorDigitado) {
                if (isEditing) {
                    //editando valores
                    GlobalNames.splice(Posicao, 1, ValorDigitado);
                    isEditing = false;
                } else {
                    //inserindo valores
                    GlobalNames.push(ValorDigitado);
                }
            }
            ExibirVetor();
        }
    });
}