const setoresFixos = ["Bebidas","Confeitaria","Panificação"];
let setores = [];
let pedidos = {};

function init() {
  setores = [...setoresFixos];
  setores.forEach(s=>pedidos[s]=[]);
  renderTabs();
}
init();

function renderTabs() {
  const tabs = document.getElementById("tabs");
  tabs.innerHTML="";
  setores.forEach(setor=>{
    const div = document.createElement("div");
    div.className="tab";
    div.innerHTML=`<span>${setor}</span>`;
    if(!setoresFixos.includes(setor)){
      const btn = document.createElement("button");
      btn.textContent="X";
      btn.onclick=()=>excluirSetor(setor);
      div.appendChild(btn);
    }
    tabs.appendChild(div);
  });
  renderConteudo();
}

function renderConteudo(){
  const conteudo = document.getElementById("conteudo");
  conteudo.innerHTML="";
  setores.forEach(setor=>{
    const div = document.createElement("div");
    div.className="setor";
    div.innerHTML=`<h3>${setor}</h3>`;

    const inputNome = document.createElement("input");
    inputNome.placeholder="Nome do produto";

    const quantidade = document.createElement("input");
    quantidade.type="number";
    quantidade.min=1;
    quantidade.value=1;
    quantidade.style.width="60px";

    const qtdBtns = [1,2,3,4].map(n=>{
      const b=document.createElement("button");
      b.textContent=n;
      b.onclick=()=>{quantidade.value = parseInt(quantidade.value)+n;};
      return b;
    });

    const btnAdd = document.createElement("button");
    btnAdd.textContent="Adicionar";
    btnAdd.onclick=()=>{
      if(!inputNome.value) return;
      if(!pedidos[setor]) pedidos[setor]=[];
      pedidos[setor].push({nome: inputNome.value,qtd:parseInt(quantidade.value)});
      inputNome.value="";
      quantidade.value=1;
      salvar();
      renderConteudo();
    };

    div.appendChild(inputNome);
    div.appendChild(quantidade);
    qtdBtns.forEach(b=>div.appendChild(b));
    div.appendChild(btnAdd);

    if(pedidos[setor]){
      pedidos[setor].forEach((item,i)=>{
        const itemDiv = document.createElement("div");
        itemDiv.className="item";
        itemDiv.textContent=`${item.nome} - ${item.qtd}`;
        const delBtn=document.createElement("button");
        delBtn.textContent="X";
        delBtn.onclick=()=>{
          pedidos[setor].splice(i,1);
          salvar();
          renderConteudo();
        }
        itemDiv.appendChild(delBtn);
        div.appendChild(itemDiv);
      });
    }

    conteudo.appendChild(div);
  });
}

function novoSetor(){
  const nome = prompt("Nome do novo setor:");
  if(!nome) return;
  if(setores.includes(nome)) return alert("Setor já existe!");
  setores.push(nome);
  pedidos[nome]=[];
  salvar();
  renderTabs();
}

function excluirSetor(nome){
  if(!confirm(`Deseja excluir o setor ${nome}?`)) return;
  setores = setores.filter(s=>s!==nome);
  delete pedidos[nome];
  salvar();
  renderTabs();
}

// Modal finalizar pedido
function finalizarPedido(){
  const modal = document.getElementById("modalPedido");
  const container = document.getElementById("modalPedidos");
  container.innerHTML="";
  modal.style.display="flex";

  setores.forEach(setor=>{
    if(pedidos[setor] && pedidos[setor].length>0){
      const divSetor = document.createElement("div");
      divSetor.className="pedido-setor";
      const h = document.createElement("h3");
      h.textContent=`Pedido ${setor}`;
      divSetor.appendChild(h);

      pedidos[setor].forEach(item=>{
        const p = document.createElement("p");
        p.textContent=`${item.nome} - ${item.qtd}`;
        divSetor.appendChild(p);
      });

      container.appendChild(divSetor);
    }
  });

  const btnCopy = document.getElementById("copiarPedido");
  btnCopy.onclick=()=>{
    let texto="";
    const setoresModal = container.querySelectorAll(".pedido-setor");
    setoresModal.forEach(s=>{
      texto += s.querySelector("h3").textContent + "\n";
      s.querySelectorAll("p").forEach(p=>{
        texto += p.textContent + "\n";
      });
      texto += "\n";
    });
    navigator.clipboard.writeText(texto);
    alert("Pedido copiado!");
  }
}

function fecharModal(){
  document.getElementById("modalPedido").style.display="none";
}

function salvar(){
  localStorage.setItem("pedidosApp_setores",JSON.stringify(setores));
  localStorage.setItem("pedidosApp_pedidos",JSON.stringify(pedidos));
}

window.onload=()=>{
  const s = localStorage.getItem("pedidosApp_setores");
  const p = localStorage.getItem("pedidosApp_pedidos");
  if(s) setores = JSON.parse(s);
  if(p) pedidos = JSON.parse(p);
  renderTabs();
}
