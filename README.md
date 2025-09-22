🚀 API RESTful de Gerenciamento de Eventos
Este projeto implementa um controlador para uma API RESTful simples, que permite a gestão completa de recursos de eventos (CRUD - Create, Read, Update, Delete), com a funcionalidade adicional de filtragem para a listagem.

Os dados dos eventos são armazenados em memória (usando o array eventos importado de ../data/models/dados.js), ideal para prototipagem e aprendizado.

✨ Funcionalidades
O controlador expõe as seguintes rotas e métodos para gerenciar eventos:

Método	Rota	Descrição
GET	/eventos	Lista todos os eventos, suportando filtros por query parameters.
GET	/eventos/:id	Busca um evento específico pelo ID.
POST	/eventos	Cria um novo evento.
PUT	/eventos/:id	Atualiza os dados de um evento existente pelo ID.
DELETE	/eventos/:id	Remove um evento pelo ID.

Exportar para as Planilhas
🔎 Detalhes das Rotas
1. Listar Eventos (GET /eventos)
A função getAllEventos permite buscar todos os eventos e aplicar múltiplos filtros através de query parameters.

Query Parameter	Descrição	Tipo de Filtro
nome	Filtra por parte do nome (busca parcial/inclusão).	Case Insensitive
dataEvento	Filtra por parte da data do evento (busca parcial/inclusão).	Case Insensitive
local	Filtra pelo local exato.	Case Insensitive
categoria	Filtra pela categoria exata.	Case Insensitive
capacidade	Filtra pela capacidade exata.	Case Insensitive
preco	Filtra pelo preço exato.	Case Insensitive
organizador	Filtra pelo organizador exato.	Case Insensitive

Exportar para as Planilhas
Exemplo de uso:
GET /eventos?categoria=Show&local=Estadio

2. Buscar Evento por ID (GET /eventos/:id)
A função getEventoById busca um evento específico. Inclui validação para garantir que o :id é um número.

3. Criar Novo Evento (POST /eventos)
A função createEvento cria um novo evento.

Validações Implementadas:

Verifica se todos os campos obrigatórios estão preenchidos: nome, dataEvento, local, categoria, capacidade, preco, e organizador.

Verifica se a capacidade é maior que 0.

Inclui uma validação inicial de data para garantir que a dataEvento seja futura (embora a lógica dataEvento > hoje precise de formatação de data mais robusta para funcionar corretamente com strings).

4. Atualizar Evento (PUT /eventos/:id)
A função updateEvento permite a atualização parcial (e.g., patch-like) ou total dos dados de um evento.

A atualização só ocorre para os campos passados no corpo da requisição (req.body).

O evento é buscado e atualizado pelo seu ID.

5. Remover Evento (DELETE /eventos/:id)
A função deleteEvento remove um evento permanentemente da lista.

Inclui validação para garantir que o ID é um número e que o evento existe antes da remoção.
