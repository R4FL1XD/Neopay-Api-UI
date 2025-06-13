const { SuzakuTeam } = require("@suzakuteam/scraper-node");

module.exports = function(app) {
    async function fetchGeminiContent(content) {
        try {
            const response = await SuzakuTeam.ai.gemini({content});
            return response;
        } catch (error) {
            console.error("Error fetching content from Gemini:", error);
            throw error;
        }
    }

    app.get('/ai/gemini', async (req, res) => {
        try {
            const { text } = req.query;
            if (!text) {
                return res.status(400).json({ status: false, error: 'Text is required' });
            }
            const result = await fetchGeminiContent(text);
            res.status(200).json({
                status: true,
                result
            });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    });
};
