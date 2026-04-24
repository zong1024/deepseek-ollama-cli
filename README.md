# DeepSeek Ollama-style CLI

一个 Linux 下可直接运行的 DeepSeek 官方 API 命令行聊天工具，交互方式接近 `ollama run`：进入后用 `>>>` 输入问题，支持流式输出、连续上下文、`/?` 帮助、`/clear` 清空上下文、`/bye` 退出。

## 特性

- 默认调用官方 OpenAI 兼容接口：`https://api.deepseek.com/chat/completions`
- 默认模型：`deepseek-v4-flash`
- 支持 `thinking` 开关与 `reasoning_effort`
- 无第三方 Python 依赖，适合 Linux 服务器直接使用
- 自动读取 `DEEPSEEK_API_KEY`
- 支持保存和加载本地会话

## 安装

```sh
cd deepseek-ollama-cli
sh install.sh
export PATH="$HOME/.local/bin:$PATH"
```

配置 API key：

```sh
export DEEPSEEK_API_KEY="sk-..."
```

可以把上面两行写进 `~/.bashrc` 或 `~/.zshrc`。

## 使用

进入交互聊天：

```sh
dsrun
```

一次性提问：

```sh
dsrun "用三句话解释 Linux epoll"
```

切换模型：

```sh
dsrun --model deepseek-v4-pro
```

关闭 thinking 模式：

```sh
dsrun --thinking disabled
```

显示 reasoning 内容：

```sh
dsrun --show-thinking
```

## 交互命令

```text
/? or /help                 显示帮助
/bye or /exit               退出
/clear or /reset            清空当前上下文
/show                       显示当前设置
/set model <name>           设置模型
/set system <text>          设置 system prompt
/set thinking enabled|disabled
/set effort high|max
/set show_thinking on|off
/set max_tokens <n|null>
/set temperature <n|null>   只在 thinking=disabled 时发送
/set top_p <n|null>         只在 thinking=disabled 时发送
/save <name>                保存会话
/load <name>                加载会话
/sessions                   列出会话
```

多行输入：

```text
>>> """
... 第一行
... 第二行
... """
```

## 环境变量

- `DEEPSEEK_API_KEY`：API key
- `DEEPSEEK_BASE_URL`：默认 `https://api.deepseek.com`
- `DEEPSEEK_MODEL`：默认 `deepseek-v4-flash`
- `DEEPSEEK_SYSTEM`：默认 system prompt
- `DEEPSEEK_THINKING`：`enabled` 或 `disabled`
- `DEEPSEEK_REASONING_EFFORT`：`high` 或 `max`

本地会话保存到：

```text
~/.local/share/dsrun/sessions/
```
