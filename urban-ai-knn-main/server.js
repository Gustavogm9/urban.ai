const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const UrbanAIPricingEngine = require('./pricing-engine');
const apiKeyAuth = require('./auth');
const { validatePricingRequest } = require('./validation');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Middleware de autenticação global (protege todos os endpoints abaixo)
app.use(apiKeyAuth);

// Inicializa o Motor de IA
const engine = new UrbanAIPricingEngine();

// Mock de dados para treinamento (Em produção, viria de um DB)
const mockProperties = [
    { id: 1, lat: -23.5505, lng: -46.6333, metroDistance: 0.2, amenitiesCount: 10, category: 2 },
    { id: 2, lat: -23.6666, lng: -46.7000, metroDistance: 1.5, amenitiesCount: 3, category: 0 },
    { id: 3, lat: -23.5854, lng: -46.6784, metroDistance: 0.5, amenitiesCount: 8, category: 1 },
];
engine.initialize(mockProperties);

/**
 * Endpoint: POST /api/pricing/suggest
 */
app.post('/api/pricing/suggest', validatePricingRequest, async (req, res) => {
    try {
        const { property, event, basePrice } = req.body;
        const suggestion = await engine.suggestPrice(property, event, basePrice);
        res.json(suggestion);
    } catch (error) {
        console.error("Erro no processamento:", error);
        res.status(500).json({ error: "Erro interno ao calcular sugestão de preço." });
    }
});

/**
 * Endpoint: GET /api/status
 */
app.get('/api/status', (req, res) => {
    res.json({ status: "online", service: "Urban AI Pricing API" });
});

app.listen(port, () => {
    console.log(`Urban AI API rodando em http://localhost:${port}`);
});
