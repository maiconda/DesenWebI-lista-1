let tarefasPendentes = JSON.parse(localStorage.getItem('tarefasPendentes')) || [];
let tarefasConcluidas = JSON.parse(localStorage.getItem('tarefasConcluidas')) || [];
let filtro = '';
let mode = localStorage.getItem('mode') || 'light';

const lightModeSvg = `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z" fill="#000000"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V4C12.75 4.41421 12.4142 4.75 12 4.75C11.5858 4.75 11.25 4.41421 11.25 4V2C11.25 1.58579 11.5858 1.25 12 1.25ZM3.66865 3.71609C3.94815 3.41039 4.42255 3.38915 4.72825 3.66865L6.95026 5.70024C7.25596 5.97974 7.2772 6.45413 6.9977 6.75983C6.7182 7.06553 6.2438 7.08677 5.9381 6.80727L3.71609 4.77569C3.41039 4.49619 3.38915 4.02179 3.66865 3.71609ZM20.3314 3.71609C20.6109 4.02179 20.5896 4.49619 20.2839 4.77569L18.0619 6.80727C17.7562 7.08677 17.2818 7.06553 17.0023 6.75983C16.7228 6.45413 16.744 5.97974 17.0497 5.70024L19.2718 3.66865C19.5775 3.38915 20.0518 3.41039 20.3314 3.71609ZM1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H4C4.41421 11.25 4.75 11.5858 4.75 12C4.75 12.4142 4.41421 12.75 4 12.75H2C1.58579 12.75 1.25 12.4142 1.25 12ZM19.25 12C19.25 11.5858 19.5858 11.25 20 11.25H22C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75H20C19.5858 12.75 19.25 12.4142 19.25 12ZM17.0255 17.0252C17.3184 16.7323 17.7933 16.7323 18.0862 17.0252L20.3082 19.2475C20.6011 19.5404 20.601 20.0153 20.3081 20.3082C20.0152 20.6011 19.5403 20.601 19.2475 20.3081L17.0255 18.0858C16.7326 17.7929 16.7326 17.3181 17.0255 17.0252ZM6.97467 17.0253C7.26756 17.3182 7.26756 17.7931 6.97467 18.086L4.75244 20.3082C4.45955 20.6011 3.98468 20.6011 3.69178 20.3082C3.39889 20.0153 3.39889 19.5404 3.69178 19.2476L5.91401 17.0253C6.2069 16.7324 6.68177 16.7324 6.97467 17.0253ZM12 19.25C12.4142 19.25 12.75 19.5858 12.75 20V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22V20C11.25 19.5858 11.5858 19.25 12 19.25Z" fill="#000000"></path> </g></svg>`;
  
  const darkModeSvg = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#ffffff"></path> </g></svg>`;

document.body.classList.add(mode);

const toggleMode = () => {
    if (mode === 'light') {
        mode = 'dark';
    } else if (mode === 'dark') {
        mode = 'light';
    }
    renameTags();
    salvarDados();
    renderizarModo()
}

const renderizarModo = () => {
    const button = document.getElementById('mode-button');
    if (mode === 'light') {
        button.innerHTML = lightModeSvg;
    } else if (mode === 'dark') {
        button.innerHTML = darkModeSvg;
    }
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

    if(tarefasPendentesFiltradas.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'Sem tarefas pendentes disponíveis';
        listaTarefasPendentes.appendChild(li);
    }

    if(tarefasConcluidasFiltradas.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'Sem tarefas concluidas disponíveis';
        listaTarefasConcluidas.appendChild(li);
    }
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

document.addEventListener('DOMContentLoaded', renderizarModo);
document.addEventListener('DOMContentLoaded', renderizarTarefas);