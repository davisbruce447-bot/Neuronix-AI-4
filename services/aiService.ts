
import { AiResponse, Model } from '../types';
import { MODELS } from '../constants';

// --- IMPORTANT ---
// 1. Add your OpenRouter API key here.
// To get a key, visit https://openrouter.ai/keys
// For production, it is highly recommended to use environment variables.
const OPENROUTER_API_KEY = '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';

// Maps our internal model IDs to the identifiers used by OpenRouter.
const OPENROUTER_MODEL_MAP: { [key: string]: string } = {
  chatgpt: 'openai/gpt-3.5-turbo',
  gemini: 'google/gemini-flash-1.5',
  claude: 'anthropic/claude-3-haiku-20240307',
  grok: 'xai/grok-1',
  mistral: 'mistralai/mistral-7b-instruct',
  llama: 'meta-llama/llama-3-8b-instruct',
};

export const getAiResponses = async (
  prompt: string,
  selectedModels: string[]
): Promise<AiResponse[]> => {
  console.log(`Fetching responses for prompt: "${prompt}" from models: ${selectedModels.join(', ')}`);
  
  // Return a helpful error message if the API key has not been set.
  if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === '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') {
      return selectedModels.map(modelId => {
          const modelInfo = MODELS.find(m => m.id === modelId)!;
          return {
              id: `${modelId}-${Date.now()}`,
              role: 'model',
              content: "OpenRouter API key not configured. Please add your key to `services/aiService.ts`.",
              model: modelInfo.name,
              modelIcon: modelInfo.icon,
          };
      });
  }

  const responsePromises = selectedModels.map(async (modelId): Promise<AiResponse> => {
    const modelInfo = MODELS.find(m => m.id === modelId) as Model;
    const openRouterModel = OPENROUTER_MODEL_MAP[modelId];
    
    if (!openRouterModel) {
        return {
          id: `${modelId}-${Date.now()}`,
          role: 'model',
          content: `Model ${modelInfo.name} is not configured for OpenRouter.`,
          model: modelInfo.name,
          modelIcon: modelInfo.icon
        };
    }

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          // Recommended headers to identify your app to OpenRouter.
          "HTTP-Referer": "http://localhost:3000", // Replace with your actual site URL in production
          "X-Title": "Neuronix-AI",
        },
        body: JSON.stringify({
          model: openRouterModel,
          messages: [
            { role: "user", content: prompt }
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(`Error from OpenRouter for model ${modelInfo.name}:`, errorData);
        throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      const content = data.choices[0].message.content;

      return {
        id: `${modelId}-${Date.now()}`,
        role: 'model',
        content,
        model: modelInfo.name,
        modelIcon: modelInfo.icon
      };

    } catch (error) {
      console.error(`Failed to fetch response for ${modelInfo.name}:`, error);
      return {
        id: `${modelId}-${Date.now()}`,
        role: 'model',
        content: `Sorry, there was an error communicating with ${modelInfo.name}.`,
        model: modelInfo.name,
        modelIcon: modelInfo.icon
      };
    }
  });

  return Promise.all(responsePromises);
};
