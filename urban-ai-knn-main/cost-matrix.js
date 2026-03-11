/**
 * Módulo de Matriz de Custo de Deslocamento
 * Avalia a atratividade do imóvel baseada na facilidade de acesso a eventos específicos.
 */

class DisplacementCostMatrix {
    constructor(travelEngine) {
        this.travelEngine = travelEngine;
        // Preços base estimados de transporte em SP
        this.costs = {
            uber_base: 10,
            uber_per_km: 2.5,
            transit_ticket: 4.40
        };
    }

    /**
     * Calcula o custo total (tempo + dinheiro) para ir do imóvel ao evento.
     */
    async calculateAttractivityScore(property, event, isPeakHour = true) {
        const propertyCoord = [property.lng, property.lat];
        const eventCoord = [event.lng, event.lat];

        // 1. Tempo de viagem (minutos)
        const travelTime = await this.travelEngine.calculateTravelTime(propertyCoord, eventCoord, "driving");

        // 2. Custo financeiro estimado (Uber)
        const distance = require('@turf/turf').distance(propertyCoord, eventCoord, { units: 'kilometers' });
        const financialCost = this.costs.uber_base + (distance * this.costs.uber_per_km);

        // 3. Cálculo de Score (Quanto menor o custo, maior a atratividade)
        // Score de 0 a 100
        // Penalizamos tempos > 45 min e custos > R$ 60
        const timePenalty = Math.max(0, travelTime - 15) * 1.5;
        const costPenalty = Math.max(0, financialCost - 20) * 0.8;
        
        let score = 100 - (timePenalty + costPenalty);
        score = Math.max(0, Math.min(100, score));

        return {
            score: parseFloat(score.toFixed(2)),
            travelTime: Math.round(travelTime),
            estimatedUber: parseFloat(financialCost.toFixed(2)),
            attractivityLevel: this.getAttractivityLevel(score)
        };
    }

    getAttractivityLevel(score) {
        if (score > 80) return "Alta Atratividade";
        if (score > 50) return "Média Atratividade";
        return "Baixa Atratividade";
    }
}

module.exports = DisplacementCostMatrix;
