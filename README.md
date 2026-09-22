# dsh-wsl-vllm

> **语言：** **中文**（本页） · [English](./README.en.md)

对接本机 / Docker **vLLM** 的 OpenAI 兼容服务（默认 `http://127.0.0.1:8000`）。

可选。Windows 原生 vLLM 一般没有；优先 Docker / AI1 历史环境。

## 工具

| 工具 | 作用 |
|------|------|
| `vllm_status` | 可达性与模型 id |
| `vllm_chat` | 对话补全 |

环境变量：`DSH_VLLM_BASE`、`DSH_VLLM_MODEL`。

## License

MIT
