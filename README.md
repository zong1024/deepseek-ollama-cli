# DeepSeek Ollama-style CLI

一个 Linux 下可直接运行的 DeepSeek 官方 API 命令行聊天工具，交互方式接近 `ollama run`：进入后用 `>>>` 输入问题，支持流式输出、连续上下文、`/?` 帮助、`/clear` 清空上下文、`/bye` 退出。

## 特性

- 默认调用官方 OpenAI 兼容接口：`https://api.deepseek.com/chat/completions`
- 默认模型：`deepseek-v4-flash`
- 支持 `thinking` 开关、`reasoning_effort` 和干净的思考状态显示
- 默认使用适合终端的纯文本回答格式，避免 Markdown 表格和大段 LaTeX
- 无第三方 Python 依赖，适合 Linux 服务器直接使用
- 自动读取 `DEEPSEEK_API_KEY`
- 支持保存和加载本地会话

## 安装

推荐使用 npm 全局安装，后续升级也方便：

```sh
npm install -g deepseek-ollama-cli
```

需要系统里有 Python 3。npm 安装会提供 `dsrun` 命令，实际运行时自动调用 `python3`。

升级：

```sh
npm install -g deepseek-ollama-cli@latest
```

如果 npm 包还没有发布，也可以直接从 GitHub 安装：

```sh
npm install -g github:zong1024/deepseek-ollama-cli
```

从 GitHub 方式升级：

```sh
npm install -g github:zong1024/deepseek-ollama-cli#main
```

源码安装方式仍然可用：

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

从文件发送长 prompt：

```sh
dsrun --file prompt.txt
```

也可以用管道或重定向：

```sh
cat prompt.txt | dsrun
dsrun < prompt.txt
```

切换模型：

```sh
dsrun --model deepseek-v4-pro
```

也可以用短别名：

```sh
dsrun --model pro
dsrun --model flash
```

进入交互后也可以切换：

```text
>>> /model pro
```

`pro` 会自动保持 `thinking=enabled`。

切回 Flash：

```text
>>> /model flash
```

关闭 thinking 模式：

```sh
dsrun --thinking disabled
```

Pro 会默认使用 thinking。CLI 默认只显示一行干净的 `thinking...` 状态，不会把长思考过程混在最终答案里。

隐藏思考状态：

```sh
dsrun --thinking-output hidden
```

调试时显示原始 reasoning 内容：

```sh
dsrun --thinking-output raw
```

默认回答格式是 `plain`，适合普通终端显示。切换为 Markdown：

```text
>>> /format markdown
```

切回终端纯文本：

```text
>>> /format plain
```

## 交互命令

```text
/? or /help                 显示帮助
/bye or /exit               退出
/clear or /reset            清空当前上下文
/show                       显示当前设置
/model [name]               显示或设置模型，支持 flash、pro
/format [plain|markdown]    显示或设置回答格式
/paste                      粘贴多行 prompt，用 /send 发送
/set system <text>          设置 system prompt
/set thinking enabled|disabled
/set effort high|max
/think [status|hidden|raw]  显示或设置思考输出方式
/set thinking_output status|hidden|raw
/set show_thinking on|off   兼容旧用法，on 等同 raw
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

更适合整段粘贴题目或代码的是 `/paste`：

```text
>>> /paste
paste mode: end with /send, cancel with /cancel
paste> 请解这道数学题，要求给出关键推导过程，最后给出唯一答案：
paste>
paste> 设数列 {a_n} 满足：
paste> a_0 = 3, a_1 = 17,
paste> a_n = 8a_{n-1} - 15a_{n-2} + 2^n + n^2, n >= 2。
paste>
paste> 求 a_30 除以 100000 的余数。
paste> /send
```

## 环境变量

- `DEEPSEEK_API_KEY`：API key
- `DEEPSEEK_BASE_URL`：默认 `https://api.deepseek.com`
- `DEEPSEEK_MODEL`：默认 `deepseek-v4-flash`，也支持 `flash`、`pro`
- `DEEPSEEK_SYSTEM`：默认 system prompt
- `DEEPSEEK_THINKING`：`enabled` 或 `disabled`
- `DEEPSEEK_REASONING_EFFORT`：`high` 或 `max`
- `DEEPSEEK_THINKING_OUTPUT`：`status`、`hidden` 或 `raw`
- `DEEPSEEK_FORMAT`：`plain` 或 `markdown`

本地会话保存到：

```text
~/.local/share/dsrun/sessions/
```
