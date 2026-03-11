# Order Management API

Esta é uma API REST desenvolvida em Node.js para o gerenciamento de pedidos, construída como parte de um desafio técnico. O foco do projeto foi a implementação de uma arquitetura limpa, mapeamento de campos (Data Transformation) e persistência de dados em um ambiente SQL.

## Tecnologias Utilizadas

    - Node.js: Ambiente de execução.

    - Express: Framework para roteamento e middlewares.

    - Sequelize (ORM): Utilizado para abstração de banco de dados e gestão de relacionamentos.

    - SQLite: Banco de dados relacional (escolhido pela portabilidade durante a fase de testes).

## Funcionalidades e Regras de Negócio

A API implementa as operações obrigatórias de criação e consulta de pedidos, realizando o mapeamento automático entre o formato de entrada (JSON em português) e a estrutura persistida no banco de dados (campos em inglês).

## Endpoints Principais:

    - POST /order: Realiza a criação de um novo pedido. O endpoint recebe um objeto contendo numeroPedido, valorTotal, dataCriacao e um array de itens.

    - GET /order/:id: Recupera os detalhes de um pedido específico e seus itens associados através do parâmetro de URL.