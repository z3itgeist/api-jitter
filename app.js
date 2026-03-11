const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(express.json());

// 1. Conexão com o Banco de Dados (SQL)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

// 2. Definição dos Modelos (Tabelas)
const Order = sequelize.define('Order', {
  orderId: { type: DataTypes.STRING, primaryKey: true },
  value: { type: DataTypes.FLOAT },
  creationDate: { type: DataTypes.DATE }
}, { timestamps: false });

const Item = sequelize.define('Item', {
  productId: { type: DataTypes.INTEGER },
  quantity: { type: DataTypes.INTEGER },
  price: { type: DataTypes.FLOAT }
}, { timestamps: false });

// Relacionamento 1:N (Um pedido tem vários itens)
Order.hasMany(Item, { as: 'items', foreignKey: 'orderId' });
Item.belongsTo(Order, { foreignKey: 'orderId' });

// Sincronizar banco de dados
sequelize.sync();

// --- ROTAS OBRIGATÓRIAS ---

// 3. Criar um novo pedido (POST /order)
app.post('/order', async (req, res) => {
  try {
    const data = req.body;

    // Mapping: Transformação de dados conforme solicitado na imagem
    const mappedOrder = {
      orderId: data.numeroPedido,
      value: data.valorTotal,
      creationDate: new Date(data.dataCriacao),
      items: data.items.map(item => ({
        productId: parseInt(item.idItem),
        quantity: item.quantidadeItem,
        price: item.valorItem
      }))
    };

    // Salva no banco (incluindo os itens associados)
    const newOrder = await Order.create(mappedOrder, {
      include: [{ model: Item, as: 'items' }]
    });

    return res.status(201).json(newOrder);
  } catch (error) {
    return res.status(400).json({ error: 'Erro ao criar pedido', message: error.message });
  }
});

// 4. Obter dados do pedido por parâmetro (GET /order/:id)
app.get('/order/:id', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [{ model: Item, as: 'items' }]
    });

    if (!order) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    return res.json(order);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar pedido' });
  }
});

// Inicialização do servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 API rodando em http://localhost:${PORT}`);
});