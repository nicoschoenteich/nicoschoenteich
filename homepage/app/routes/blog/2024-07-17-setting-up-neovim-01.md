---
topic: "star"
description: "In this blog post series I want to share my journey on how I created my personal development environment using Neovim."
---

# Creating a personal development environment #1 - Why Neovim?

1. Why Neovim? (this blog post)
1. [Miscellaneous, status line, and color scheme](/blog/2024-10-29-setting-up-neovim-02)
1. [Vim keybindings](/blog/2024-11-14-setting-up-neovim-03)
1. [A custom theme for SAP TechEd 2025](/blog/2025-10-20-setting-up-neovim-04)

In this blog post series I want to share my journey on how I created my personal development environment for developing cloud native SAP applications. The focus here lies in the term "journey", as I am nowhere near a finished state and still learning a lot along the way. This is not a tutorial about [Neovim](https://neovim.io/) ([others can do that better](https://www.youtube.com/@typecraft_dev/playlists)) - this is more of a documentation of my journey with a bit of focus on SAP specific things.

As most developers these days, I was using VS Code for a long time and was not really thinking about my development environment much. VS Code is a fantastic IDE (integrated development environment) and most of the features one could ask for available out of the box, such as syntax highlighting, language servers, an integrated terminal, and a wide range of available extensions. It was not until some of my programming heroes kept talking about [Neovim](https://neovim.io/) over and over again and how great it was, until I became curious. Neovim is a Vim-based text editor (we will talk about the differences), and it was just amazing to see how fast and efficient these people where with it, mostly because of not using the mouse at all and the great customization options. [TJ DeVries](https://github.com/tjdevries) established the term "personal development environment", and I realized I hadn't personalized my previous IDE (VS Code) at all and had almost no clue about the available keyboard shortcuts. After all, the mouse was always right there so I was not forced to learn any keyboard shortcuts. So I realized to become fast and efficient I had to go down the Neovim rabbit hole - and here we are.

At first, I was very underwhelmed with the experience. After all, Neovim keybindings are very unique and unusual (from a modern perspective) and almost every feature has to be configured explicitly. A raw Neovim installation therefore is exactly that - very raw. But the plugin ecosystem for Neovim is fantastic and there are plenty of resources available to learn how to configure Neovim (see the end of this post). So I started doing my homework, hacking away, and configuring my [dotfiles](https://github.com/nicoschoenteich/dotfileshttps://github.com/nicoschoenteich/dotfiles).

![netrw file explorer](/public/img/setting-up-neovim/netrw-file-explorer.png)

As you can see in the screen shot above, Neovim comes with a file explorer out of the box, but it doesn't look like a file explorer you know from other environments where it would show on the left of the screen and always be visible. I knew I wanted to recreate what I was used to and needed a plugin for that. The plugin ecosystem of Neovim is great and it is fairly easy to install them - not VS Code easy, but fairly easy.

You need a packager manager to install plugins/packages (I'll use these terms interchangeably) and a popular choice is [lazy.nvim](https://github.com/folke/lazy.nvim). In my central Neovim configuration directory (`~/.config/nvim/`), I created an `init.lua` file with following code to install lazy.nvim:

```lua
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"

if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
    "git",
    "clone",
    "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    "--branch=stable", -- latest stable release
    lazypath,
  })
end

vim.opt.rtp:prepend(lazypath)

-- this looks for all lua files in the lua/plugins/ directory
require("lazy").setup("plugins")
```

Ok, lazy.nvim is now installed and as you can see in the code, it apparently looks for a `plugins/` directory to find all plugins. But let's take a step back and appreciate the fact that we are to write this code in [Lua](https://lua.org/), which is a powerful, efficient, lightweight, embeddable scripting language. Its syntax is similar to JavaScript and it's very easy to use.

I was now ready to install my first plugin. I created a new file at `~/.config/nvim/lua/plugins/filetree.lua` (the file name itself doesn't really matter) with the following content:

```lua
vim.g.loaded_netrw = 1
vim.g.loaded_netrwPlugin = 1

return {
	{
		"nvim-tree/nvim-tree.lua",
		config = function()
			require("nvim-tree").setup({
				-- call empty function to not apply default and interfere with telescope
				on_attach = function() end,
				git = {
					ignore = false
				}
			})

			local api = require "nvim-tree.api"

			-- reimplement some of the default keybindings only for NvimTree files
			vim.api.nvim_create_autocmd("FileType", {
				pattern = { "NvimTree" },
				callback = function()
					vim.keymap.set("n", "<Enter>", api.node.open.edit, { buffer = true })
					vim.keymap.set("n", "fv", api.node.open.vertical, { buffer = true })
					vim.keymap.set("n", "r", api.fs.rename, { buffer = true })
					vim.keymap.set("n", "d", api.fs.remove, { buffer = true })
					vim.keymap.set("n", "n", api.fs.create, { buffer = true })
				end
			})

			vim.keymap.set("n", "fe", ":NvimTreeFocus<Enter>")
		end
	},
	{
		"nvim-tree/nvim-web-devicons"
	}
}
```

This code disables the default netrw file explorer (lines 1 and 2) and then returns a lua table that lazy.nvim is on the lookout for. The [nvim-tree](https://github.com/nvim-tree/nvim-tree.lua) plugin as well as the corresponding icons ([nvim-web-devicons]) get installed and while being at it, I also set up a few keybindings I want to use with nvim-tree. This is where the personalization and the quest for a "personal development environment" really starts. I decided to map `rename`, `remove`, and `create` to the first letters of the terms I associate them with, so `r -> rename`, `d -> delete` (`remove`), and `n -> new` (`create`).
I also decided to map more global operations that have to do with the file explorer to keybindings that start with the letter `f` (for `file` in my head). I use this same approach for other things like the language server and comments too, but we will get to that. This principle has really helped me learn and memorize the new keybindings fast. So to navigate to the file explorer is use `fe -> file explorer` and to open a file in a new vertical window I use `fv -> file vertical`.

![nvim-tree](/public/img/setting-up-neovim/nvim-tree.png)

This is what my Neovim looked like with nvim-tree file explorer opened. Still pretty rough, but it's a good starting point to continue personalizing it. We will continue with some miscellaneous configuration (for example a nice color scheme) in the next post.

## Resources

- [typecraft](https://www.youtube.com/@typecraft_dev) on YouTube
- [DevOnDuty](https://www.youtube.com/@devonduty) on YouTube
