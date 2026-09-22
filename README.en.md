# dsh-wsl-vllm

> **Languages:** [中文（首页）](./README.md) · **English** (this file)

OpenAI-compatible vLLM client (default :8000).

| | |
|---|---|
| Version | **0.1.0** |
| Kit | Optional companion to [dsh-wsl-kit](https://github.com/173787247/dsh-wsl-kit); not in `install.sh` |

## Install

```sh
dsh plugin --profile web add github:173787247/dsh-wsl-vllm
```

Batch link (optional): `bash dsh-wsl-kit/scripts/link-linux-plugins.sh`

## Tools

| Tool | Role |
|------|------|
| `vllm_status` | reachability + models |
| `vllm_chat` | chat completions |

## Config

`baseUrl / defaultModel / timeoutMs`

Prefer Docker/AI1 history over Windows-native vLLM. Env: `DSH_VLLM_BASE`, `DSH_VLLM_MODEL`.

## License

MIT
