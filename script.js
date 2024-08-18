let senhaAtual = 1;
let totalSenhas = 500;
let mesas = {
    mesa1: false,
    mesa2: false,
    mesa3: false,
    mesa4: false,
};
let atendimentos = [];
let inicioAtendimento;

function formatarSenha(numero) {
    return 'AT' + numero.toString().padStart(4, '0');
}

function chamarProximaSenha() {
    for (let mesa in mesas) {
        if (!mesas[mesa]) {
            mesas[mesa] = true;
            document.getElementById(mesa).textContent = `${mesa}: Ocupada - Senha ${formatarSenha(senhaAtual)}`;
            document.getElementById('senhaAtual').textContent = formatarSenha(senhaAtual);
            senhaAtual++;
            if (senhaAtual > totalSenhas) senhaAtual = 1;
            break;
        }
    }
}

function liberarMesa(mesa) {
    mesas[mesa] = false;
    document.getElementById(mesa).textContent = `${mesa}: Livre`;
}

function iniciarAtendimento() {
    let cpf = document.getElementById('cpf').value;
    let contato = document.getElementById('contato').value;
    let servico = document.getElementById('servico').value;
    inicioAtendimento = new Date();

    let atendimento = {
        cpf: cpf,
        contato: contato,
        servico: servico,
        inicio: inicioAtendimento,
        mesa: Object.keys(mesas).find(mesa => mesas[mesa])
    };

    atendimentos.push(atendimento);

    console.log(atendimento);
}

function finalizarAtendimento() {
    let fimAtendimento = new Date();
    let atendimento = atendimentos[atendimentos.length - 1];
    atendimento.fim = fimAtendimento;

    liberarMesa(atendimento.mesa);

    console.log(atendimento);
}

function gerarRelatorio() {
    let wb = XLSX.utils.book_new();
    let ws_data = [["CPF", "Contato", "Serviço", "Mesa", "Início", "Fim"]];
    
    atendimentos.forEach(atendimento => {
        ws_data.push([
            atendimento.cpf, 
            atendimento.contato, 
            atendimento.servico, 
            atendimento.mesa, 
            atendimento.inicio.toLocaleString(), 
            atendimento.fim ? atendimento.fim.toLocaleString() : ''
        ]);
    });

    let ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(wb, ws, "Atendimentos");

    XLSX.writeFile(wb, "Relatorio_Atendimentos.xlsx");
}
