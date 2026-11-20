export const DEFAULT_SERVER_GEMINI_MODEL = "gemini-4-hydrogen";

export interface ResolvedServerAIConfig {
  apiKey: string;
  model: string;
  usingServerDefaultKey: boolean;
}

/**
 * Resolve a chave da API e o modelo a serem usados nas rotas do servidor.
 * Prioriza:
 * 1) Configuração explícita enviada pelo cliente (quando preenchida)
 * 2) Variáveis de ambiente do servidor / Coolify (GEMINI_API_KEY / GEMINI_MODEL)
 * 3) Modelo padrão gemini-4-hydrogen
 */
export function resolveServerAIConfig(
  clientApiKey?: string | null,
  clientModel?: string | null
): ResolvedServerAIConfig {
  const trimmedClientKey = clientApiKey?.trim() || "";
  const envKey = process.env.GEMINI_API_KEY?.trim() || "";
  const apiKey = trimmedClientKey || envKey;

  const trimmedClientModel = clientModel?.trim() || "";
  const envModel = process.env.GEMINI_MODEL?.trim() || "";
  const model = trimmedClientModel || envModel || DEFAULT_SERVER_GEMINI_MODEL;

  return {
    apiKey,
    model,
    usingServerDefaultKey: !trimmedClientKey && Boolean(envKey),
  };
}
