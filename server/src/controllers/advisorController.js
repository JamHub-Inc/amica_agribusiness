import { generateFarmingAdvice, generateFarmingAdviceFromFrontend, getWeatherByLocation } from '../services/advisorService.js';
import prisma from '../database.js';

export const getFarmingAdviceController = async (req, res) => {
    try {
        const userId = req.user.id;
        
        // Get user location from database or query params
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { location: true }
        });

        const location = req.query.location || user?.location || 'Nairobi'; // Fallback

        let advice;
        if (req.method === 'POST') {
            advice = await generateFarmingAdviceFromFrontend(req.body, userId);
        } else {
            advice = await generateFarmingAdvice(location, userId);
        }
        
        
        res.status(200).json({
            success: true,
            data: advice
        });
    } catch (error) {
        console.error('Advisor Controller Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error generating farming advice.'
        });
    }
};

export const getWeatherController = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { location: true }
        });

        const location = req.query.location || user?.location || 'Nairobi';

        const weather = await getWeatherByLocation(location);
        
        if (!weather) {
            return res.status(404).json({
                success: false,
                message: 'Weather data not found'
            });
        }

        res.status(200).json({
            success: true,
            data: weather
        });
    } catch (error) {
        console.error('Weather Controller Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error fetching weather data.'
        });
    }
};
