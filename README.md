# dsh-wsl-vllm

> **语言：** **中文**（本页） · [English](./README.en.md)

对接本机/Docker vLLM 的 OpenAI 兼容服务（默认 :8000）。

| | |
|---|---|
| 版本 | **0.1.0** |
| 套件 | [dsh-wsl-kit](https://github.com/173787247/dsh-wsl-kit) **可选**，不在 `install.sh` |

## 安装

```sh
dsh plugin --profile web add github:173787247/dsh-wsl-vllm
# 或本机 path：
# dsh plugin --profile web add /mnt/c/Users/YOU/Desktop/AIFullStackDevelopment/dsh-wsl-vllm
```

kit 批量链接（可选）：`bash dsh-wsl-kit/scripts/link-linux-plugins.sh`

## 工具

| 工具 | 作用 |
|------|------|
| `vllm_status` | 可达性与模型 |
| `vllm_chat` | 对话补全 |

## 配置要点

`baseUrl / defaultModel / timeoutMs`

Windows 原生 vLLM 一般没有；优先 Docker。`DSH_VLLM_BASE` / `DSH_VLLM_MODEL`。

## 兼容性

| 字段 | 值 |
|------|----|
| **插件** | `dsh-wsl-vllm` **0.1.0** |
| **最低 dsh** | ≥ **0.1.2**（Web UI 一次性 `?token=`，Windows 中继 `:3081`） |
| **最新验证** | 以 [dsh-wsl-kit 兼容性](https://github.com/173787247/dsh-wsl-kit#compatibility-2026-09) 为准（当前 **`0.1.7-alpha.2`**）— 套件唯一真源 |
| **套件档位** | 可选（默认不在 `install.sh` / `KIT_SET=daily`） |

## License

MIT
