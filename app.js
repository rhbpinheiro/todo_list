'use strict';
/*
<label class="todo__item">
    <input type="checkbox">
    <div>teste de item 1</div>
    <input type="button" value="X">
</label>
  */
//Criando o banco de dados.

//OBS: ANTES DE ENVIAR UM JSON PARA O BANCO DE DADOS TEMOS QUE TRANSFORMAR EM UMA STRING
//EX: localStorage.setItem('todoList', JSON.stringify(banco));
// E QUANDO VAMOS RECEBER A STRING EM JSON.
//EX: JSON.parse(localStorage.getItem('todoList'))
/*let banco = [
    {'tarefa': 'estudar', 'status': 'checked'}
];*/
const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco));

//Primeiro vou criar uma função para criar a div todo-list
const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label');//criei o label
    item.classList.add('todo__item');//adicionei a classe "todo-item"
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice = ${indice} >
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice = ${indice} >
    `// agora adiciona a tarefa ao item com o checkbox.
    document.getElementById('todoList').appendChild(item);//agora adicionao item criado acima a div de classe
    //todo__list para ser exibido as tarefas  o appendChild adiciona um novo elemento ou filho ao elemento pai.
}
const limparTarefas = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild); 
    } 
}

const atualizarTela = () => {
    limparTarefas();
    const banco = getBanco();
    banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
}

const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if(tecla === 'Enter') {
        const banco = getBanco();
        banco.push({'tarefa': texto, 'status': ''});
        setBanco(banco);
        atualizarTela();
        evento.target.value = '';
    }   
}

const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice(indice,1);
    setBanco(banco);
    atualizarTela();
}

const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status ===  '' ? 'checked' : '' ;
    setBanco(banco);
    atualizarTela();
}

const clickItem = (evento) => {
    const elemento = evento.target;
    if(elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem(indice);
    } else if(elemento.type === 'checkbox'){
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
    }
    
}

document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);
atualizarTela();



