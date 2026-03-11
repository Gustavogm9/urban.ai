require("dotenv").config();

/**
 * Middleware simples de autenticação por API Key.
 * Envie o header: x-api-key: SEU_TOKEN
 */
function apiKeyAuth(req, res, next) {
    const clientKey = req.header("x-api-key");
    const serverKey = process.env.API_KEY;

    if (!serverKey) {
        console.error("API_KEY não configurada nas variáveis de ambiente.");
        return res.status(500).json({ error: "Configuração de segurança ausente." });
    }

    if (!clientKey || clientKey !== serverKey) {
        return res.status(401).json({ error: "Não autorizado. API Key inválida ou ausente." });
    }

    next();
}

module.exports = apiKeyAuth;

//Criar no env - API_KEY
