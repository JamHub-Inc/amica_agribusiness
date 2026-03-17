import axios from 'axios';
import OpenAI from 'openai';
import { config } from '../configs/configs.js';

const openai = new OpenAI({
    apiKey: config.openai.apiKey,
});

/**
 * Fetch current weather for a location
 */
const fetchWeather = async (location) => {
    try {
        const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json`, {
            params: {
                key: config.weather.apiKey,
                q: location,
                days: 3,
                aqi: 'no',
                alerts: 'no'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Weather API Error:', error.response?.data || error.message);
        return null;
    }
};

/**
 * Get simple weather data for dashboard
 */
export const getWeatherByLocation = async (location) => {
    const data = await fetchWeather(location);
    if (!data) return null;
    return {
        location: data.location.name,
        country: data.location.country,
        temp: data.current.temp_c,
        condition: data.current.condition.text,
        humidity: data.current.humidity
    };
};

/**
 * Generate farming advice using OpenAI
 */
export const generateFarmingAdvice = async (location, userId) => {
    const weatherData = await fetchWeather(location);

    if (!weatherData) {
        // Fallback to mock data if API fails to prevent blocking the UI
        console.warn('Weather API failed. Using fallback mock data for development.');
        return generateMockAdvice(location);
    }

    const { current, forecast, location: loc } = weatherData;
    const condition = current.condition.text;
    const temp = current.temp_c;
    const humidity = current.humidity;
    const resolvedLocation = loc.name;
    
    // Prepare a prompt for OpenAI
    const prompt = `
        You are a professional agricultural advisor for the 'Amica' platform.
        Location: ${resolvedLocation}
        Current Weather: ${condition}, ${temp}°C, Humidity: ${humidity}%
        Forecast (Next 3 days): ${forecast.forecastday.map(d => `${d.date}: ${d.day.condition.text}, Max: ${d.day.maxtemp_c}°C`).join('; ')}

        Based on this real-time data and the geographical context of ${resolvedLocation}:
        1. Write a single detailed paragraph (summaryStatement) starting with "The current weather in ${resolvedLocation} is...". This paragraph MUST mention the current weather, the forecast for the next three days, and general strategic advice for optimal agricultural production and what crops are great for this weather.
        2. Suggest specific farming activities to do NOW.
        3. Suggest the best types of crops to plant in the NEXT MONTHS (taking into account seasonal transitions).
        4. Provide a LONG-TERM strategic suggestion for the NEXT YEAR (crop rotation, soil health, or climate adaptation).

        Format the response in JSON with the following structure:
        {
            "summaryStatement": "The current weather in...",
            "now": "...",
            "nextMonths": "...",
            "nextYear": "...",
            "crops": ["Crop1", "Crop2", ...],
            "weatherSummary": "..."
        }
    `;

    try {
        // Check if OpenAI key is valid/present
        if (!config.openai.apiKey || config.openai.apiKey.includes('your_openai_key')) {
             console.warn('OpenAI API key missing. Using fallback mock data.');
             return generateMockAdvice(resolvedLocation);
        }

        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo-preview", // or gpt-3.5-turbo
            messages: [
                { role: "system", content: "You are a helpful agricultural expert." },
                { role: "user", content: prompt }
            ],
            response_format: { type: "json_object" }
        });

        return JSON.parse(response.choices[0].message.content);
    } catch (error) {
        console.error('OpenAI Error:', error);
        // Final fallback for any error
        return generateMockAdvice(resolvedLocation);
    }
};

/**
 * Generate farming advice directly from frontend payloads
 */
export const generateFarmingAdviceFromFrontend = async (data, userId) => {
    const { location, condition, temp, humidity, forecastText } = data;
    
    // Prepare a prompt for OpenAI
    const prompt = `
        You are a professional agricultural advisor for the 'Amica' platform.
        Location: ${location}
        Current Weather: ${condition}, ${temp}°C, Humidity: ${humidity}%
        Forecast (Next 3 days): ${forecastText}

        Based on this real-time data and the geographical context of ${location}:
        1. Write a single detailed paragraph (summaryStatement) starting with "The current weather in ${location} is...". This paragraph MUST mention the current weather, the forecast for the next three days, and general strategic advice for optimal agricultural production and what crops are great for this weather.
        2. Suggest specific farming activities to do NOW.
        3. Suggest the best types of crops to plant in the NEXT MONTHS (taking into account seasonal transitions).
        4. Provide a LONG-TERM strategic suggestion for the NEXT YEAR (crop rotation, soil health, or climate adaptation).

        Format the response in JSON with the following structure:
        {
            "summaryStatement": "The current weather in...",
            "now": "...",
            "nextMonths": "...",
            "nextYear": "...",
            "crops": ["Crop1", "Crop2"],
            "weatherSummary": "..."
        }
    `;

    try {
        if (!config.openai.apiKey || config.openai.apiKey.includes('your_openai_key')) {
             console.warn('OpenAI API key missing. Using fallback mock data.');
             return generateMockAdvice(location);
        }

        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo-preview", // or gpt-3.5-turbo
            messages: [
                { role: "system", content: "You are a helpful agricultural expert." },
                { role: "user", content: prompt }
            ],
            response_format: { type: "json_object" }
        });

        return JSON.parse(response.choices[0].message.content);
    } catch (error) {
        console.error('OpenAI Error from Frontend Input:', error);
        return generateMockAdvice(location);
    }
};

/**
 * Mock data for development when APIs are unavailable
 */
const generateMockAdvice = (location) => {
    return {
        summaryStatement: `The current weather in ${location || 'your region'} is partly cloudy with a mild temperature of 24.2°C. Over the next three days, patchy rain is expected with temperatures ranging from 25.3°C to 26.3°C. This weather is conducive for pre-planting activities and supports the growth of a wide variety of crops, especially those requiring fewer water inputs. Planning ahead for the next months and the following year with appropriate crop choices and soil management practices will leverage this weather pattern for optimal agricultural production.`,
        now: "Based on seasonal patterns for this time of year, ensure your irrigation systems are checked. Apply top-dressing fertilizer to your cereal crops if they are at the tillering stage.",
        nextMonths: "The upcoming season suggests transitioning to legumes like beans or peas. These will help fix nitrogen in your soil for the next planting cycle.",
        nextYear: "Consider implementing a crop rotation plan between maize and sunflowers to balance soil nutrient extraction and reduce pest cycles.",
        crops: ["Maize", "Beans", "Sunflowers", "Cabbage"],
        weatherSummary: "Typically warm and slightly humid in this region. Perfect for most vegetable varieties."
    };
};
