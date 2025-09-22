import dados from "../data/models/dados.js";
const { eventos } = dados;

// GET /eventos - Listar todos os eventos com filtros
const getAllEventos = (req, res) => {
    const { nome, dataEvento, local, categoria, capacidade, preco, organizador } = req.query;
    let resultado = eventos;

    // Filtro por nome
    if (nome) {
        resultado = resultado.filter(eventos => 
            eventos.nome.toLowerCase().includes(nome.toLowerCase())
        );
    }

    // Filtrar por data de evento 

    if (dataEvento) {
        resultado = resultado.filter(eventos => 
            eventos.dataEvento.toLowerCase().includes(dataEvento.toLowerCase())
        );
    }

    // Filtro por local
    if (local) {
        resultado = resultado.filter(eventos => 
            eventos.local.toLowerCase() === local.toLowerCase()
        );
    }

    // Filtro por categoria
    if (categoria) {
        resultado = resultado.filter(eventos => 
            eventos.categoria.toLowerCase() === categoria.toLowerCase()
        );
    }

    // Filtro por capacidade
    if (capacidade) {
        resultado = resultado.filter(eventos => 
            eventos.capacidade.toLowerCase() === capacidade.toLowerCase()
        );
    }

    // Filtro por preco
    if (preco) {
        resultado = resultado.filter(eventos => 
            eventos.preco.toLowerCase() === preco.toLowerCase()
        );
    }

    // Filtro por organizador
    if (organizador) {
        resultado = resultado.filter(eventos => 
            eventos.organizador.toLowerCase() === organizador.toLowerCase()
        );
    }



    res.status(200).json({
        total: resultado.length,
        eventos: resultado
    });
};

// GET /eventos/:id - Buscar evento específico por ID
const getEventoById = (req, res) => {
    const { id } = req.params;

    // Validar se ID é um número
    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "ID deve ser um número válido!"
        });
    }

    // Buscar evento pelo ID
    const evento = eventos.find(e => e.id === parseInt(id));

    if (!evento) {
        return res.status(404).json({
            success: false,
            message: "Evento não encontrado!"
        });
    }

    res.status(200).json({
        success: true,
        evento: evento
        });
};

// POST /eventos - Cadastrar novo evento
const createEvento = (req, res) => {
    const { nome, dataEvento, local, categoria, capacidade, preco, organizador } = req.body;
    const hoje = new Date();

    // Validações obrigatórias básicas
    if (!capacidade > 0 || dataEvento > hoje ||!nome || !dataEvento || !local || !categoria || !capacidade || !preco ||  !organizador) {
        return res.status(400).json({
            success: false,
            message: "Nome, dataEvento, local, categoria, capacidade, preco, organizador são obrigatórios!"
        });
    }



    // Gerar novo ID simples
    const novoId = eventos.length + 1;

    

    // Criar novo Evemto
    const novoEvento = {
        id: novoId,
        nome,
        dataEvento,
        local,
        categoria,
        capacidade,
        preco,
        organizador
    };

    eventos.push(novoEvento);

    res.status(201).json({
        success: true,
        message: "Evento cadastrado com sucesso!",
        evento: novoEvento
    });
};


// PUT /eventos/:id - Atualizar personagem existente por ID
const updateEvento = (req, res) => {
    const { id } = req.params;
    const { nome, dataEvento, local, categoria, capacidade, preco, organizador } = req.body;
    const idParaEditar = parseInt(id);

    // Validar ID
    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "ID deve ser um número válido!"
        });
    }


    
    // Verificar se evento existe
    const eventoExiste = eventos.find(e => e.id === idParaEditar);
    if (!eventoExiste) {
        return res.status(404).json({
            success: false,
            message: `Evento com ID ${id} não encontrado para atualização!`
        });
    }

    // Atualizar evento usando map
    const eventosAtualizados = eventos.map(evento => 
        evento.id === idParaEditar 
            ? { 
                ...evento, 
                ...(nome && { nome }),
                ...(dataEvento && { dataEvento }),
                ...(dataEvento && { dataEvento: parseInt(dataEvento) }),
                ...(local && { local }),
                ...(categoria && { categoria }),
                ...(preco && { preco }),
                ...(organizador && { organizador }),
            }
            : evento
    );

    // Atualizar array global
    eventos.splice(0, eventos.length, ...eventosAtualizados);

    // Buscar evento atualizado para retorno
    const eventoAtualizado = eventos.find(e => e.id === idParaEditar);

    res.status(200).json({
        success: true,
        message: `Dados do evento com ID ${id} atualizados com sucesso!`,
        evento: eventoAtualizado
    });
};



// DELETE /eventos/:id - Remover evento por ID
const deleteEvento = (req, res) => {
    const { id } = req.params;

    // Validar ID
    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "ID deve ser um número válido!"
        });
    }

    const idParaApagar = parseInt(id);
    
    // Verificar se evento existe antes de remover
    const eventoParaRemover = eventos.find(e => e.id === idParaApagar);
    if (!eventoParaRemover) {
        return res.status(404).json({
            success: false,
            message: `Evento com ID ${id} não encontrado para remoção!`
        });
    }

    // Remover evento usando filter
    const eventosFiltrados = eventos.filter(evento => evento.id !== idParaApagar);
    
    // Atualizar array global
    eventos.splice(0, eventos.length, ...eventosFiltrados);

    res.status(200).json({
        success: true,
        message: `${eventoParaRemover.nome} (ID: ${id}) foi removido com sucesso!`,
        eventoRemovido: eventoParaRemover
    });
};




  





// Exportar funções liberadas
export { getAllEventos, getEventoById, createEvento, updateEvento, deleteEvento};