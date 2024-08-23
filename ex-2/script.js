let tarefasPendentes = JSON.parse(localStorage.getItem('tarefasPendentes')) || [];
let tarefasConcluidas = JSON.parse(localStorage.getItem('tarefasConcluidas')) || [];
let filtro = '';
let mode = localStorage.getItem('mode') || 'light';

document.body.classList.add(mode);

const toggleMode = () => {
    if (mode === 'light') {
        mode = 'dark';
    } else if (mode === 'dark') {
        mode = 'light';
    }
    renameTags();
    salvarDados();
}

const renameTags = () => {
    if (mode === 'light') {
        document.body.classList.add('light');
        document.body.classList.remove('dark');
    } else {
        document.body.classList.add('dark');
        document.body.classList.remove('light');
    }
};



const salvarDados = () => {
    localStorage.setItem('mode', mode);
    localStorage.setItem('tarefasPendentes', JSON.stringify(tarefasPendentes));
    localStorage.setItem('tarefasConcluidas', JSON.stringify(tarefasConcluidas));
};

const adicionarTarefa = () => {
    const nomeTarefa = document.getElementById('tarefa').value;
    if(nomeTarefa.trim()){
        tarefasPendentes.unshift(nomeTarefa)
        document.getElementById('tarefa').value = '';
        salvarDados();
        renderizarTarefas();
    }
}

const marcarComoConcluida = (index) => {
    const tarefa = tarefasPendentes.splice(index, 1)[0];
    tarefasConcluidas.unshift(tarefa);
    salvarDados();
    renderizarTarefas();
};

const removerTarefa = (index) => {
    tarefasConcluidas.splice(index, 1)[0];
    salvarDados();
    renderizarTarefas();
}

const renderizarTarefas = () => {
    const listaTarefasPendentes = document.getElementById('listaTarefasPendentes');
    const listaTarefasConcluidas = document.getElementById('listaTarefasConcluidas');
    const filtroDiv = document.getElementById('filtroDiv');

    listaTarefasPendentes.innerHTML = '';
    listaTarefasConcluidas.innerHTML = '';

    const tarefasPendentesFiltradas = tarefasPendentes.filter(tarefa =>
        tarefa.toString().toLowerCase().includes(filtro.toLowerCase())
    );

    const tarefasConcluidasFiltradas = tarefasConcluidas.filter(tarefa =>
        tarefa.toString().toLowerCase().includes(filtro.toLowerCase())
    );

    const pExistente = filtroDiv.querySelector('p');
    if (filtro.length > 0) {
        if (!pExistente) {
            const p = document.createElement('p');
            p.textContent = `Filtrando por: ${filtro}`;
            filtroDiv.appendChild(p);
        } else {
            pExistente.textContent = `Filtrando por: ${filtroNome}`;
        }
    } else {
        if (pExistente) {
            filtroDiv.removeChild(pExistente);
        }
    }

    tarefasPendentesFiltradas.forEach((tarefa, index) => {
        const li = document.createElement('li');
        li.textContent = tarefa;

        const botaoConcluir = document.createElement('button');
        botaoConcluir.textContent = 'Concluir';
        botaoConcluir.onclick = () => marcarComoConcluida(index);

        li.appendChild(botaoConcluir);
        listaTarefasPendentes.appendChild(li);
    });

    tarefasConcluidasFiltradas.forEach((tarefa, index) => {
        const li = document.createElement('li');
        li.textContent = tarefa;

        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = 'Remover';
        botaoRemover.onclick = () => removerTarefa(index);

        li.appendChild(botaoRemover);
        listaTarefasConcluidas.appendChild(li);
    });
};

const filtrarTarefas = () => {
    filtro = document.getElementById('filtro').value;
    document.getElementById('filtro').value = '';
    renderizarTarefas()
}

const removerFiltro = () => {
    filtro = '';
    renderizarTarefas()
}

document.addEventListener('DOMContentLoaded', renderizarTarefas);