const setoresFixos = ["Bebidas","Confeitaria","Panificação"]

let dados = JSON.parse(localStorage.getItem("dadosPedidos")) || {}

setoresFixos.forEach(setor=>{
if(!dados[setor]) dados[setor] = {}
})

function salvar(){
localStorage.setItem("dadosPedidos",JSON.stringify(dados))
}

function render(){
const container = document.getElementById("setores")
container.innerHTML=""

setoresFixos.forEach(setor=>{

const div = document.createElement("div")
div.className="setor"

const titulo = document.createElement("div")
titulo.className="setorTitulo"
titulo.innerText=setor

const produtosDiv = document.createElement("div")
produtosDiv.className="produtos"

titulo.onclick=()=>{
produtosDiv.style.display =
produtosDiv.style.display==="block"?"none":"block"
}

for(let produto in dados[setor]){

const linha = document.createElement("div")
linha.className="produto"

const nome = document.createElement("span")
nome.innerText=produto

const qtd = document.createElement("input")
qtd.type="number"
qtd.value=dados[setor][produto]
qtd.placeholder="0"

qtd.oninput=()=>{
dados[setor][produto]=qtd.value
salvar()
}

const del = document.createElement("button")
del.innerText="X"
del.className="excluir"

del.onclick=()=>{
delete dados[setor][produto]
salvar()
render()
}

linha.appendChild(nome)
linha.appendChild(qtd)
linha.appendChild(del)

produtosDiv.appendChild(linha)

}

const add = document.createElement("button")
add.innerText="+ Produto"
add.className="addProduto"

add.onclick=()=>{
const nome = prompt("Nome do produto")

if(!nome) return

dados[setor][nome] = ""
salvar()
render()
}

produtosDiv.appendChild(add)

div.appendChild(titulo)
div.appendChild(produtosDiv)

container.appendChild(div)

})

}

render()

document.getElementById("finalizarBtn").onclick=()=>{

const resumo = document.getElementById("pedidoFinal")
resumo.innerHTML=""

for(let setor in dados){

let itens = ""

for(let prod in dados[setor]){

if(dados[setor][prod] && dados[setor][prod] > 0){

itens += `<div>${prod} - ${dados[setor][prod]}</div>`

}

}

if(itens){

resumo.innerHTML += `
<h3>${setor}</h3>
${itens}
`

}

}

document.getElementById("modal").style.display="flex"

}

function fecharModal(){
document.getElementById("modal").style.display="none"
}

function copiarPedido(){

let texto=""

for(let setor in dados){

let itens=""

for(let prod in dados[setor]){

if(dados[setor][prod] && dados[setor][prod] > 0){

itens += `${prod} - ${dados[setor][prod]}\n`

}

}

if(itens){

texto += `${setor}\n${itens}\n`

}

}

navigator.clipboard.writeText(texto)

alert("Pedido copiado")

}
