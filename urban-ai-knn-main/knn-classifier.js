/**
 * Módulo de Classificação KNN (K-Nearest Neighbors)
 * Agrupa imóveis por "vizinhança de conveniência" e características.
 */

const KNN = require('ml-knn');
const KDTree = require('kd-tree-javascript').kdTree;

function distanceFn(a, b) {
    // Distância euclidiana em 4D: [lat, lng, metroDistance, amenitiesCount]
    return Math.sqrt(
        Math.pow(a[0] - b[0], 2) +
        Math.pow(a[1] - b[1], 2) +
        Math.pow(a[2] - b[2], 2) +
        Math.pow(a[3] - b[3], 2)
    );
}

class PropertyClassifier {
    constructor() {
        this.knn = null;
        this.labels = [];
        this.trainingData = [];
        this.kdTree = null;
    }

    /**
     * Prepara os dados para o KNN.
     * Features: [latitude, longitude, proximidade_metro, qualidade_bairro]
     * Labels: 0 (Econômico), 1 (Standard), 2 (Premium/Alta Atratividade)
     */
    train(properties) {
        this.trainingData = properties.map(p => [
            p.lat,
            p.lng,
            p.metroDistance,
            p.amenitiesCount
        ]);
        
        this.labels = properties.map(p => p.category);
        this.knn = new KNN(this.trainingData, this.labels, { k: 3 });

        // Construção da k-d tree para acelerar busca de vizinhos
        const points = this.trainingData.map((features, idx) => ({
            features,
            label: this.labels[idx]
        }));

        this.kdTree = new KDTree(
            points,
            (a, b) => distanceFn(a.features, b.features),
            ["0", "1", "2", "3"] // índices fictícios, não usados diretamente
        );
    }

    /**
     * Classifica um novo imóvel ou um imóvel existente no contexto de um evento.
     * Usa k-d tree para filtrar candidatos antes de chamar o KNN completo.
     */
    classify(property) {
        if (!this.knn || !this.kdTree) throw new Error("Modelo KNN não treinado.");

        const input = [
            property.lat,
            property.lng,
            property.metroDistance,
            property.amenitiesCount
        ];

        // Busca rápida dos N vizinhos mais próximos via k-d tree
        const NEIGHBOR_CANDIDATES = 20;
        const nearest = this.kdTree.nearest({ features: input }, NEIGHBOR_CANDIDATES);

        // nearest é uma lista de [node, distance]
        const filteredData = nearest.map(([node]) => node.features);
        const filteredLabels = nearest.map(([node]) => node.label);

        // Cria um KNN temporário só com os candidatos mais próximos
        const localKnn = new KNN(filteredData, filteredLabels, { k: 3 });
        const prediction = localKnn.predict(input);

        return {
            categoryId: prediction,
            categoryName: this.getCategoryName(prediction)
        };
    }

    getCategoryName(id) {
        const names = ["Econômico", "Standard", "Premium"];
        return names[id] || "Desconhecido";
    }
}

module.exports = PropertyClassifier;
