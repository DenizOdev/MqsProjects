function adicionarEntradaNaTabela(data, entradaExpediente, entradaIntervalo, saidaIntervalo, saidaExpediente, horasTrabalhadas) {
    // Acesse a tabela
    const tabela = document.getElementById("tabelaExpediente");

    // Verifique se o corpo da tabela já existe, se não, crie-o
    if (!tabela.tBodies[0]) {
        tabela.createTBody();
    }

    // Crie uma nova linha
    const linha = tabela.tBodies[0].insertRow(-1); // -1 para adicionar na última linha

    // Adicione células com os valores
    const celulaData = linha.insertCell(0);
    celulaData.innerText = data;

    const celulaEntradaExpediente = linha.insertCell(1);
    celulaEntradaExpediente.innerText = entradaExpediente;

    const celulaEntradaIntervalo = linha.insertCell(2);
    celulaEntradaIntervalo.innerText = entradaIntervalo;

    const celulaSaidaIntervalo = linha.insertCell(3);
    celulaSaidaIntervalo.innerText = saidaIntervalo;

    const celulaSaidaExpediente = linha.insertCell(4);
    celulaSaidaExpediente.innerText = saidaExpediente;

    const celulaHorasTrabalhadas = linha.insertCell(5);
    celulaHorasTrabalhadas.innerText = formatarHorasTrabalhadas(horasTrabalhadas);

    const celulaHorasExtrasAtraso = linha.insertCell(6);
    celulaHorasExtrasAtraso.innerText = calcularHorasExtrasAtraso(horasTrabalhadas);
}

function formatarHorasTrabalhadas(horas) {
    const horasFormatadas = Math.floor(horas);
    const minutosFormatados = Math.round((horas % 1) * 60);
    
    // Adiciona zero à esquerda se necessário
    const horasStr = String(horasFormatadas).padStart(2, '0');
    const minutosStr = String(minutosFormatados).padStart(2, '0');
    
    return `${horasStr}:${minutosStr}`;
}
function calcularHorasExtrasAtraso(horasTrabalhadas) {
    const padraoMilissegundos = (8 * 60 + 45) * 60 * 1000;
    const horasTrabalhadasMilissegundos = horasTrabalhadas * 60 * 60 * 1000;
    const diferencaMilissegundos = horasTrabalhadasMilissegundos - padraoMilissegundos;
    const horasExtrasAtraso = diferencaMilissegundos / (60 * 60 * 1000);

    return formatarHorasTrabalhadas(horasExtrasAtraso);

}
function registrarExpediente() {
    // Obtenha os elementos de input
    const entradaExpediente = document.getElementById("horaEntradaExpediente").value;
    const entradaIntervalo = document.getElementById("horaEntradaIntervalo").value;
    const saidaIntervalo = document.getElementById("horaSaidaIntervalo").value;
    const saidaExpediente = document.getElementById("horaSaidaExpediente").value;

    // Verifique se todos os campos foram preenchidos
    if (!entradaExpediente || !entradaIntervalo || !saidaIntervalo || !saidaExpediente) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Preencha todos os campos!',
            confirmButtonColor: '#079cff',
        });
        return;
    }
    if (saidaExpediente <= entradaExpediente) {
        Swal.fire({
            icon: 'warning',
            title: 'Êpa!',
            text: 'O valor de saída do expediente deve ser maior que o de entrada do expediente.',
            confirmButtonColor: '#079cff',
        });
        return;
    }

    // Converta os horários para objetos Date
    const entradaExpedienteTime = new Date(`1970-01-01T${entradaExpediente}`);
    const entradaIntervaloTime = new Date(`1970-01-01T${entradaIntervalo}`);
    const saidaIntervaloTime = new Date(`1970-01-01T${saidaIntervalo}`);
    const saidaExpedienteTime = new Date(`1970-01-01T${saidaExpediente}`);

    // Calcule a diferença de tempo em milissegundos
    const diferencaIntervalo = entradaIntervaloTime - entradaExpedienteTime;
    const diferencaExpediente = saidaExpedienteTime - saidaIntervaloTime;

    // Calcule a quantidade total de horas trabalhadas em horas
    const horasTrabalhadas = (diferencaIntervalo + diferencaExpediente) / (1000 * 60 * 60);

    // Exiba o resultado
    document.getElementById("resultado").innerText = "Horas registradas.";

    // Adicione a entrada na tabela
    adicionarEntradaNaTabela(
        new Date().toLocaleDateString(),
        entradaExpediente,
        entradaIntervalo,
        saidaIntervalo,
        saidaExpediente,
        horasTrabalhadas
    );
}

function definirPadrao() {
    // Salvar os horários atuais como padrão
    padraoEntradaExpediente = document.getElementById('horaEntradaExpediente').value;
    padraoEntradaIntervalo = document.getElementById('horaEntradaIntervalo').value;
    padraoSaidaIntervalo = document.getElementById('horaSaidaIntervalo').value;
    padraoSaidaExpediente = document.getElementById('horaSaidaExpediente').value;

    document.getElementById("resultado").innerText = "Padrão definido com sucesso!";
    //alert("Padrão definido com sucesso!");
}

function inserirPadrao() {
    // Inserir os horários padrão nos inputs
    document.getElementById('horaEntradaExpediente').value = padraoEntradaExpediente;
    document.getElementById('horaEntradaIntervalo').value = padraoEntradaIntervalo;
    document.getElementById('horaSaidaIntervalo').value = padraoSaidaIntervalo;
    document.getElementById('horaSaidaExpediente').value = padraoSaidaExpediente;

    document.getElementById("resultado").innerText = "Padrão inserido com sucesso!";
}

function resetValores() {
    // Resetar os valores nos inputs
    document.getElementById('horaEntradaExpediente').value = "";
    document.getElementById('horaEntradaIntervalo').value = "";
    document.getElementById('horaSaidaIntervalo').value = "";
    document.getElementById('horaSaidaExpediente').value = "";

    document.getElementById("resultado").innerText = "Valores resetados com sucesso!";
}
function definirHorariosPadraoMarquise() {
    // Obtém os elementos de input
    const entradaExpedienteInput = document.getElementById("horaEntradaExpediente");
    const entradaIntervaloInput = document.getElementById("horaEntradaIntervalo");
    const saidaIntervaloInput = document.getElementById("horaSaidaIntervalo");
    const saidaExpedienteInput = document.getElementById("horaSaidaExpediente");

    // Define os horários padrões Marquise
    entradaExpedienteInput.value = "08:00";
    entradaIntervaloInput.value = "12:00";
    saidaIntervaloInput.value = "13:30";
    saidaExpedienteInput.value = "18:15";

    document.getElementById("resultado").innerText = "Padrão Marquise Inserido.";
}

// Adiciona o evento ao botão "Padrão Marquise"
const padraoMarquiseButton = document.getElementById("botaoPadraoMarquise");
padraoMarquiseButton.addEventListener("click", definirHorariosPadraoMarquise);

