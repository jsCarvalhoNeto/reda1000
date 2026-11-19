export interface AISettings {
  provider: "gemini";
  apiKey: string;
  model: string;
}

export const STORAGE_API_KEY = "redacao1000_gemini_key";
export const STORAGE_MODEL_KEY = "redacao1000_gemini_model";

export const DEFAULT_AI_SETTINGS: AISettings = {
  provider: "gemini",
  apiKey: "",
  model: "gemini-2.5-flash",
};

export function loadAISettings(): AISettings {
  if (typeof window === "undefined") return DEFAULT_AI_SETTINGS;
  return {
    provider: "gemini",
    apiKey: localStorage.getItem(STORAGE_API_KEY) || "",
    model: localStorage.getItem(STORAGE_MODEL_KEY) || DEFAULT_AI_SETTINGS.model,
  };
}

export function saveAISettings(settings: AISettings): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_API_KEY, settings.apiKey.trim());
  localStorage.setItem(
    STORAGE_MODEL_KEY,
    settings.model.trim() || DEFAULT_AI_SETTINGS.model
  );
}

export function clearAISettings(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_API_KEY);
  localStorage.setItem(STORAGE_MODEL_KEY, DEFAULT_AI_SETTINGS.model);
}
