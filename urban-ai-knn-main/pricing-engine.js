/**
 * Urban AI - Motor de Precificação Dinâmica
 * Orquestra a lógica de Isócronas, KNN e Matriz de Custo para sugerir preços.
 */

const TravelTimeEngine = require('./travel-engine-mapbox');
const PropertyClassifier = require('./knn-classifier');
const DisplacementCostMatrix = require('./cost-matrix');

class UrbanAIPricingEngine {
    constructor() {
        this.travelEngine = new TravelTimeEngine();
        this.classifier = new PropertyClassifier();
        this.costMatrix = new DisplacementCostMatrix(this.travelEngine);
    }

    /**
     * Inicializa o motor com dados históricos/atuais de imóveis.
     */
    initialize(properties) {
        this.classifier.train(properties);
    }

    /**
     * Lógica Principal: Sugere um preço para um imóvel em um dia de evento.
     */
    async async suggestPrice(property, event, basePrice) {
        // 1. Classificação KNN (Perfil do Imóvel)
        const classification = this.classifier.classify(property);
        
        // 2. Análise de Atratividade (Geospatial Intelligence)
        const attractivity = await this.costMatrix.calculateAttractivityScore(property, event);

        // 3. Cálculo do Multiplicador de Preço
        let multiplier = 1.0;

        // Boost por categoria (KNN)
        if (classification.categoryId === 2) multiplier += 0.2; // Premium
        if (classification.categoryId === 1) multiplier += 0.1; // Standard

        // Boost por Atratividade ao Evento (Matriz de Custo/Isócrona)
        if (attractivity.score > 80) {
            multiplier += 0.5; // Alta atratividade (ex: perto de metrô que vai pro evento)
        } else if (attractivity.score > 50) {
            multiplier += 0.2;
        }

        // Boost adicional se o tempo de viagem for muito curto (Isócrona < 15min)
        if (attractivity.travelTime <= 15) {
            multiplier += 0.3;
        }

        const suggestedPrice = basePrice * multiplier;

        return {
            propertyId: property.id,
            eventName: event.name,
            basePrice: basePrice,
            suggestedPrice: parseFloat(suggestedPrice.toFixed(2)),
            increasePercentage: Math.round((multiplier - 1) * 100),
            details: {
                classification: classification.categoryName,
                attractivity: attractivity.attractivityLevel,
                travelTimeMinutes: attractivity.travelTime,
                reasoning: `Imóvel classificado como '${classification.categoryName}'. ` +
                           `Acesso ao evento '${event.name}' em ${attractivity.travelTime} min (${attractivity.attractivityLevel}).`
            }
        };
    }
}

// --- Exemplo de Uso (Simulação) ---

const engine = new UrbanAIPricingEngine();

// Dados de treino (Imóveis em SP) -- Reunindo dataset no Urban AI, conectar aqui.
const mockProperties = [
    { id: 1, lat: -23.5505, lng: -46.6333, metroDistance: 0.2, amenitiesCount: 10, category: 2 }, // Centro - Premium
    { id: 2, lat: -23.6666, lng: -46.7000, metroDistance: 1.5, amenitiesCount: 3, category: 0 },  // Longe - Econômico
    { id: 3, lat: -23.5854, lng: -46.6784, metroDistance: 0.5, amenitiesCount: 8, category: 1 },  // Itaim - Standard
];

engine.initialize(mockProperties);

// Cenário: GP de F1 em Interlagos - Conectar eventos contidos no DB aqui.
const f1Event = { name: "GP de Fórmula 1", lat: -23.7013, lng: -46.6970 }; // Autódromo de Interlagos

// Imóvel de teste: Próximo à Linha Esmeralda (Santo Amaro) - Propriedade passada por parâmetro.
const testProperty = { id: 101, lat: -23.6273, lng: -46.6945, metroDistance: 0.3, amenitiesCount: 5 };

const result = engine.suggestPrice(testProperty, f1Event, 400);

//console.log("=== Sugestão Urban AI ===");
//console.log(JSON.stringify(result, null, 2));

module.exports = UrbanAIPricingEngine;
