/**
 * Feline Neurological Diagnosis AI Service
 * Handles communication with Google Gemini API
 * Updated for Gemini 2.5 Flash
 */
const AIService = {
    // API Configuration
    API_KEY: 'AIzaSyA-KLWo3tpDx8JXXos1z3YuxiQltndG768', // ⚠️ PASTE YOUR API KEY HERE
    
    // Using Gemini 2.5 Flash as per your available models list
    MODEL_NAME: 'gemini-2.5-flash',
    
    getKey: function () {
        return this.API_KEY;
    },
    
    /**
     * Sends a message to the AI with context about the diagnosis.
     * @param {string} userMessage - The user's question.
     * @param {object} diagnosisContext - The result from your expert system (optional).
     */
    chat: async function (userMessage, diagnosisContext) {
        const apiKey = this.getKey();
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${this.MODEL_NAME}:generateContent`;

        // 1. Define the System Persona (Who the AI is)
        let systemInstructionText = `You are a helpful AI assistant integrated into a Feline Neurological Diagnosis Expert System. You provide educational information about cat health conditions and veterinary diagnoses.

Keep your responses:
- Concise and helpful (2-3 sentences max)
- Educational and informative
- Empathetic and supportive
- Always emphasizing veterinary consultation

IMPORTANT: You are NOT a veterinarian and cannot provide medical advice. Always recommend consulting with a licensed veterinarian for actual medical care.`;

        // 2. Add dynamic context if a diagnosis exists
        if (diagnosisContext && diagnosisContext.diagnosis) {
            systemInstructionText += `\n\nCURRENT DIAGNOSIS CONTEXT:
The user's cat has been tentatively diagnosed with: ${diagnosisContext.diagnosis}
Urgency Level: ${diagnosisContext.urgency}
Description: ${diagnosisContext.description}
Clinical Notes: ${diagnosisContext.clinicalNotes?.join(', ') || 'None'}`;
        } else {
            systemInstructionText += `\n\nCONTEXT: No diagnosis has been run yet. The user is asking general questions.`;
        }

        // 3. Construct the API Payload
        // Note: We use 'system_instruction' for the persona, and 'contents' for the actual chat
        const requestBody = {
            system_instruction: {
                parts: [{ text: systemInstructionText }]
            },
            contents: [{
                parts: [{ text: userMessage }]
            }],
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 512,
            }
        };

        try {
            const response = await fetch(`${apiUrl}?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || `API Request Failed with status ${response.status}`);
            }

            const data = await response.json();
            
            // Safety check for response structure
            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                 return data.candidates[0].content.parts[0].text;
            } else {
                 throw new Error("Invalid response structure from Gemini API");
            }
           
        } catch (error) {
            console.error("AI Service Error:", error);
            
            // Helpful fallback for the UI
            return "I'm currently unable to connect to the diagnosis server. Please double-check your internet connection or consult a veterinarian directly for urgent concerns.";
        }
    }
};

// Expose to window for your HTML/UI scripts
window.AIService = AIService;