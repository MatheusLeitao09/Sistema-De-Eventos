// Importar pacotes/bibliotecas
import express from "express";
import dotenv from "dotenv";
import eventosRoutes from  "./src/routes/eventosRoutes.js";


// Criar aplicação com Express e configurar para aceitar JSON
const app = express();
app.use(express.json());
app.use ("/eventos", eventosRoutes)


// Carregar variáveis de ambiente e definir constante para porta do servidor
dotenv.config();
const serverPort = process.env.PORT || 3001;

// Rota principal GET para "/"
app.get("/", (req, res) => {
    res.send("🚀 Servidor funcionando...");
});


// Aqui vão todas suas Rotas


// Iniciar servidor escutando na porta definida
app.listen(serverPort, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
});