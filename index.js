import { createVllmClient } from "./lib/client.js";

export const name = "dsh-wsl-vllm";
export const inject = ["tools", "systemPrompt"];

export function apply(ctx, config = {}) {
  if (config.enabled === false) {
    console.log("[dsh-wsl-vllm] disabled");
    return;
  }
  const client = createVllmClient({
    baseUrl: config.baseUrl || undefined,
    defaultModel: config.defaultModel || process.env.DSH_VLLM_MODEL || "",
    apiKey: config.apiKey || "",
    timeoutMs: positive(config.timeoutMs, 120_000),
    maxPromptChars: positive(config.maxPromptChars, 32_000),
  });
  console.log(`[dsh-wsl-vllm] base=${client.root}`);

  ctx.systemPrompt.section({
    name: "tool:vllm",
    order: 128,
    text: "dsh-wsl-vllm talks to a local/Docker vLLM OpenAI-compatible server (default http://127.0.0.1:8000). Use vllm_status before vllm_chat. Prefer for high-throughput local serving; do not assume Windows-native vLLM.",
  });

  const timeoutMs = client.timeoutMs;

  ctx.tools.register({
    name: "vllm_status",
    description: "Check whether vLLM OpenAI endpoint is reachable; list model ids.",
    parameters: { type: "object", additionalProperties: false, properties: {} },
    output: { schema: { type: "object", additionalProperties: true }, render: (_a, v) => [{ type: "text", text: JSON.stringify(v, null, 2) }] },
    timeoutMs: 15_000,
    isConcurrencySafe: () => true,
    async execute() {
      return client.status();
    },
    presentCall: () => ({ card: "generic", title: "vLLM status" }),
    presentResult: (_a, r) => ({ card: "generic", title: "vLLM status", content: r.content }),
  });

  ctx.tools.register({
    name: "vllm_chat",
    description: "Chat completion via vLLM /v1/chat/completions.",
    parameters: {
      type: "object",
      additionalProperties: false,
      properties: {
        model: { type: "string" },
        prompt: { type: "string" },
        system: { type: "string" },
        maxTokens: { type: "number" },
      },
    },
    output: {
      schema: { type: "object", additionalProperties: true },
      render: (_a, v) => [{ type: "text", text: v.ok === false ? v.error : String(v.message || "") }],
    },
    timeoutMs,
    isConcurrencySafe: () => true,
    async execute(args) {
      try {
        return await client.chat(args || {});
      } catch (e) {
        return { ok: false, error: e instanceof Error ? e.message : String(e) };
      }
    },
    presentCall: () => ({ card: "generic", title: "vLLM chat" }),
    presentResult: (_a, r) => ({ card: "generic", title: "vLLM chat", content: r.content }),
  });
}

function positive(v, fb) {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : fb;
}
