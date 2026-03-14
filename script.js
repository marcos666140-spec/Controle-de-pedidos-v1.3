let setores = JSON.parse(localStorage.getItem("setores")) || []
let dados = JSON.parse(localStorage.getItem("pedidos")) || {}

function salvar(){
localStorage.setItem("setores",JSON.stringify(setores))
localStorage.setItem("pedidos",JSON.stringify(dados))
}

function render(){

const container=document.getElementById("setores")

container.innerHTML=""

/* BOTÃO NOVO SETOR */

const novoSetorBtn=document.createElement("button")
novoSetorBtn.innerText="+ Novo setor"
novoSetorBtn.className="novoSetor"

novoSetorBtn.onclick=()=>{

let nome=prompt("Nome do setor")

if(!nome) return

setores.push(nome)

dados[nome]={}

salvar()

render()

}

container.appendChild(novoSetorBtn)

/* LOOP SETORES */

setores.forEach(setor=>{

const box=document.createElement("div")
box.className="setor"

/* HEADER */

const header=document.createElement("div")
header.className="setorHeader"

/* CONTADOR */

let contador=0

for(let p in dados[setor]){
if(dados[setor][p]>0) contador++
}

const titulo=document.createElement("span")
titulo.innerText=setor+" ("+contador+")"

/* EDITAR */

const editar=document.createElement("button")
editar.innerText="✏️"

editar.onclick=()=>{

let novoNome=prompt("Novo nome do setor",setor)

if(!novoNome) return

dados[novoNome]=dados[setor]

delete dados[setor]

setores=setores.map(s=>s===setor?novoNome:s)

salvar()

render()

}

/* EXCLUIR */

const excluir=document.createElement("button")
excluir.innerText="🗑"

excluir.onclick=()=>{

if(!confirm("Excluir setor?")) return

delete dados[setor]

setores=setores.filter(s=>s!==setor)

salvar()

render()

}

/* FINALIZAR */

const finalizar=document.createElement("button")
finalizar.innerText="✅"

finalizar.onclick=()=>{

let texto=setor+"\n\n"

for(let produto in dados[setor]){

if(dados[setor][produto]>0){

texto+=produto+" - "+dados[setor][produto]+"\n"

}

}

if(texto.trim()===setor){
alert("Nenhum item")
return
}

navigator.clipboard.writeText(texto)

alert("Pedido copiado:\n\n"+texto)

}

header.appendChild(titulo)
header.appendChild(editar)
header.appendChild(excluir)
header.appendChild(finalizar)

box.appendChild(header)

/* PRODUTOS */

for(let produto in dados[setor]){

const linha=document.createElement("div")
linha.className="produto"

const nome=document.createElement("span")
nome.innerText=produto

const input=document.createElement("input")
input.type="number"
input.value=dados[setor][produto]||""

input.oninput=()=>{

dados[setor][produto]=input.value

salvar()

}

/* BOTÕES QUANTIDADE */

const botoes=document.createElement("div")
botoes.className="qtdBtns"

;[1,2,5,10,20].forEach(v=>{

const b=document.createElement("button")
b.innerText=v

b.onclick=()=>{

let atual=parseInt(input.value)||0

input.value=atual+v

dados[setor][produto]=input.value

salvar()

}

botoes.appendChild(b)

})

/* LIMPAR QTD */

const limpar=document.createElement("button")
limpar.innerText="🧹"

limpar.onclick=()=>{

input.value=""

dados[setor][produto]=""

salvar()

}

/* EXCLUIR PRODUTO */

const excluirProd=document.createElement("button")
excluirProd.innerText="❌"

excluirProd.onclick=()=>{

if(!confirm("Excluir produto?")) return

delete dados[setor][produto]

salvar()

render()

}

linha.appendChild(nome)
linha.appendChild(input)
linha.appendChild(botoes)
linha.appendChild(limpar)
linha.appendChild(excluirProd)

box.appendChild(linha)

}

/* ADD PRODUTO */

const addProduto=document.createElement("button")
addProduto.innerText="+ Produto"

addProduto.onclick=()=>{

let nome=prompt("Nome do produto")

if(!nome) return

dados[setor][nome]=""

salvar()

render()

}

box.appendChild(addProduto)

container.appendChild(box)

})

}

render()
