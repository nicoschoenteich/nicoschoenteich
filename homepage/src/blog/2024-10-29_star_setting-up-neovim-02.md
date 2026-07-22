---
title: "Creating a personal development environment #2 - Miscellaneous, status line, and color scheme"
---

# Creating a personal development environment #2 - Miscellaneous, status line, and color scheme

1. [#1 - Why Neovim?](https://community.sap.com/t5/technology-blogs-by-sap/creating-a-personal-development-environment-1-why-neovim/ba-p/13733533)
1. #2 - Miscellaneous, status line, and color scheme (this blog post)
1. [#3 - Vim keybindings](https://community.sap.com/t5/technology-blogs-by-sap/creating-a-personal-development-environment-3-vim-keybindings/ba-p/13938067)

Building on top of the previous blog post, I will continue documenting my journey to a "personal development environment" using Neovim. This blog post will cover some miscellaneous configuration, the status line, and a color scheme - the basics to make Neovim look less "raw".

For some miscellaneous things that don't really fit into any other category, or are very global, I created a new file at `~/.config/nvim/lua/misc.lua` with the following content:

```lua
-- use system clipboard
vim.opt.clipboard = "unnamedplus"

vim.opt.syntax = "ON"
vim.opt.termguicolors = true

vim.opt.number = true
vim.opt.numberwidth = 2

vim.wo.wrap = false
vim.wo.linebreak = true

vim.opt.autoindent = true
vim.opt.tabstop = 4
vim.opt.shiftwidth = 4

vim.opt.encoding = "utf-8"
vim.opt.spelllang = "en_us"

vim.g.markdown_folding = 1
vim.opt.foldmethod = "syntax"
vim.opt.foldlevel = 99

vim.g.markdown_fenced_languages = {"javascript", "js=javascript", "json=javascript", "xml"}

-- spell check and line wrap only for markdown files
vim.api.nvim_create_autocmd({"BufEnter", "BufWinEnter"}, {
  pattern = {"*.md"},
  command = ":setlocal spell | setlocal wrap",
})

-- open images in os native image viewer
vim.api.nvim_create_autocmd({"BufWinEnter"}, {
  pattern = {"*.png", "*.jpg", "*.jpeg"},
  command= ":lua os.execute(\"open \" .. vim.api.nvim_buf_get_name(0)) vim.api.nvim_buf_delete(0, {})"
})

-- set transparent background for nvim-tree
vim.api.nvim_create_autocmd({"BufEnter", "BufWinEnter"}, {
  command = ":hi NvimTreeNormal guibg=NONE",
})

-- use "fw" ("file window") in normal mode to switch between windows
vim.keymap.set("n", "fw", "<C-w>w", {})
```

I then required this file in the `~/.config/nvim/init.lua` to make sure Neovim loads it:

```lua
require("misc")
```

The configured options are all pretty self-explanatory, and for those that aren't, I added some comments. In general, these options come down to personal preference, and there is no right or wrong (unless you are using a tab width of 2 🙃).

The great thing about this file is that it is still a lua script, not just a list of on/off toggles. We can use it to set up pretty complex things like automatically running commands when files with a certain extension are opened. For example, I only want to enable spell check and line wrap for markdown files, and since there is a (Neo)vim command for every option (or vice versa?), I can just run that. But we can also run native shell commands, for example to open images in the native image viewer of the operating system ("Preview" on MacOS).

Another notable configuration is at the far bottom of the file. I mapped `fw` to switch between windows in normal mode. This is for when I work with multiple windows (e.g. a file tree on the left, one or more opened files to the right) and the logic here is in line with the principle I mentioned in the previous blog post. I prefix all keybindings with a letter for the category they fall into - at least in my head - and `f` is for all file operations. Therefore, `fw` stands for "file window". As mentioned previously, `fe` is my shortcut for "jump to file explorer", `fv` is for "open file vertically".

The next thing I wanted to customize is the status line. I like things as clean and minimalistic as possible, and the default status line was a little too "noisy" for my liking. As always with Neovim, there are many plugins that can help you customize things. However, I knew I wanted my status line **very** simple, so I looked into writing my own little script for it. I wanted it to only display the name of the currently opened file and its parent directory. Turns out, the following code (in `~/.config/nvim/lua/statusline.lua`) is enough to achieve that:

```lua
local function status_line()
	local rightAlign = "%="
	local parentDir = "%{expand('%:p:h:t')}"
	local currentFile = "%t"
	return rightAlign .. parentDir .. "/" .. currentFile
end

vim.opt.statusline = status_line()

-- only show most recent status line (think of multiple windows)
vim.opt.laststatus = 3
```

Of course, I also had to require this new file in the `~/.config/nvim/init.lua`:

```lua
require("statusline")
```

How cool is that?! I couldn't believe this was enough to achieve that. Anyhow, let's proceed with the color scheme.

To also visually turn my IDE into a PDE ("personal development environment"), I had to of course add a nice color scheme to it. For that, I created a new file `~/.config/nvim/lua/plugins/theme.lua` with the following content:

```lua
return {
	"EdenEast/nightfox.nvim",
	config = function()
		require("nightfox").setup({
			options = {
				transparent = true,
				styles = {
					comments = "italic"
				}
			}
		})
		vim.cmd "colorscheme carbonfox"
	end
}
```

As mentioned previously, the name of the file doesn't really matter here, as lazy.nvim is automatically loading all files inside the `plugins/` directory and expects a lua table as the return value. For the color scheme, I use the carbonfox scheme from [nightfox.vim](https://github.com/EdenEast/nightfox.nvim). Inside the lua table the plugin is loaded and then "activated" with a vim command. This is pretty easy, isn't it? (Not as easy as clicking "install" in a GUI, but hey, we are developers, aren't we?)

This is what my Neovim looked like at this point:

![color-scheme](/img/setting-up-neovim/color-scheme.png)

And that's it for this blog post. Let's talk about the elephant in the room next time: vim keybindings and how to learn/get used to them.
