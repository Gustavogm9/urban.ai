/**
 * TravelTimeEngine com integração real via Mapbox Directions API e Isochrones API
 */

require("dotenv").config();
const axios = require("axios");

class TravelTimeEngine {
    constructor() {
        this.token = process.env.MAPBOX_TOKEN;

        if (!this.token) {
            throw new Error("MAPBOX_TOKEN não definido nas variáveis de ambiente.");
        }
    }

    /**
     * Calcula o tempo real de viagem usando Mapbox Directions API
     * Modes suportados: driving, walking, cycling, transit (beta)
     */
    async calculateTravelTime(origin, destination, mode = "driving") {
        const url = `https://api.mapbox.com/directions/v5/mapbox/${mode}/${origin[0]},${origin[1]};${destination[0]},${destination[1]}?overview=false&access_token=${this.token}`;

        const response = await axios.get(url);

        const route = response.data.routes?.[0];
        if (!route) {
            throw new Error("Nenhuma rota encontrada pelo Mapbox.");
        }

        // Mapbox retorna duração em segundos → convertemos para minutos
        return route.duration / 60;
    }

    /**
     * Gera isócrona real usando Mapbox Isochrones API
     */
    async generateIsochrone(center, minutes, mode = "driving") {
        const url = `https://api.mapbox.com/isochrone/v1/mapbox/${mode}/${center[0]},${center[1]}?contours_minutes=${minutes}&polygons=true&access_token=${this.token}`;

        const response = await axios.get(url);

        return response.data; // GeoJSON real
    }

    /**
     * Verifica se um imóvel está dentro da área de influência (tempo real)
     */
    async isPropertyNearEvent(propertyCoord, eventCoord, thresholdMinutes = 20) {
        const time = await this.calculateTravelTime(propertyCoord, eventCoord, "driving");

        return {
            isNear: time <= thresholdMinutes,
            travelTime: time
        };
    }
}

module.exports = TravelTimeEngine;


/*

Criar variável de ambiente:
MAPBOX_TOKEN=SEU_TOKEN_AQUI

Instalar:
npm install dotenv axios



*/