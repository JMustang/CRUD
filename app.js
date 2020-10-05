window.addEventListener("load", start);

//variaveis globais
var GlobalNames = ["Um", "Dois", "Tres", "Quatro", "Cinco"];
var nomes = document.querySelector("#nomes");
var ul = document.createElement("ul");
var Input = document.getElementById("Input");
var form = document.getElementById("Formulario");
var isEditing = false;
var Posicao;

//não consegui usar Arrow function aqui.
//não entendi o motivo, deve ser algo bem simples, isso que me deixa com mais raiva.
function start() {
    PrevenirComportamentoDefault(form);
    AplicarFoco(Input);
    CapiturarValoresDigitados(Input);
    ExibirVetor();
}

var PrevenirComportamentoDefault = (Objeto) => {
    Objeto.addEventListener("submit", (event) => {
        event.preventDefault();
    });
};

var AplicarFoco = (Objeto) => {
    Objeto.focus();
};

var CapiturarValoresDigitados = (Objeto) => {
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
};

var ExibirVetor = () => {
    ul.innerHTML = "";
    Input.value = "";

    GlobalNames.forEach(PercorrerVetor);
    nomes.appendChild(ul);
};

var PercorrerVetor = (item) => {
    var li = document.createElement("li");

    li.appendChild(CriarBotao());
    li.appendChild(CriarSpan(item));
    ul.appendChild(li);
};

var CriarBotao = () => {
    var botao = document.createElement("button");
    botao.classList.add("DeleteButton");
    botao.textContent = "x";

    return botao;
};

var CriarSpan = (Valor) => {
    var span = document.createElement("span");
    span.textContent = Valor;
    span.classList.add("clicavel");
    span.addEventListener("click", EditarItem);

    return span;
};

var EditarItem = (event) => {
    var valor = event.target.innerHTML;

    var index = GlobalNames.indexOf(valor);
    Input.value = GlobalNames[index];
    AplicarFoco(Input);
    isEditing = true;
    Posicao = index;
};

ul.addEventListener("click", (event) => {
    if (event.target.localName === "button") {
        var valor = event.srcElement.nextElementSibling.innerHTML;

        var index = GlobalNames.indexOf(valor);
        GlobalNames.splice(index, 1);

        var ancestral = event.target.parentElement;
        ancestral.remove();
        ExibirVetor();
    }
});