# Creating a personal development environment #3 - Vim keybindings

1. [#1 - Why Neovim?](https://community.sap.com/t5/technology-blogs-by-sap/creating-a-personal-development-environment-1-why-neovim/ba-p/13733533)
1. [#2 - Miscellaneous, status line, and color scheme](https://community.sap.com/t5/technology-blogs-by-sap/creating-a-personal-development-environment-2-miscellaneous-status-line-and/ba-p/13922474) 
1. #3 - Vim keybindings (this blog post)

*Building on top of the previous two blog posts, this blog post will focus learning Vim keybindings, which is very central for using any Vim-based editor, let alone be productive with it.+

Before we get started with the keybindings though, let's do a quick recap of what my Neovim configuration, located at `~/.config/nvim/`, looked like a this point:

```text
- lua/
  - plugins/
    - filetree.lua
    - theme.lua
  - misc.lua
  - statusline.lua
- init.lua
- lazy-lock.json
```

What I did so far:

- configured [lazy.nvim](https://github.com/folke/lazy.nvim) as a plugin manager
- added [nvim-tree](https://github.com/nvim-tree/nvim-tree.lua) as a file explorer
- customized the status line
- added a nice color scheme
- other miscellaneous settings

Now while doing all of this, we implicitly already talked about keybindings. After all, Neovim is a keyboard-first editor. You shouldn't really be using the mouse at all (although you can if you want to), which is why you have to use keybindings. However, we only really talked about custom keybindings - the ones that relate to a plugin and where you define the shortcut and the associated operation. But the most important keybindings are the ones that are built into Neovim itself, and since Neovim is a fork of Vim (did I already mention that? 🤔), we can simply refer to them as Vim keybindings (also when googling 😉). These are the ones you will use the most for moving around, switching modes, editing text, and so on. Vim keybindings can seem quite odd at first (from a modern perspective), but they are incredibly powerful and well though-out.

*Regarding all my custom keybindings I mentioned that I like to group my keybindings by the category they fall into (in my understanding) and prefix them with the corresponding letter. For example, all keybinding related to the file system start with the letter `f`, like `fe` for opening the file explorer. Another example are all bindings related to the language server start with the letter `l`, like `ld` for "go to definition". This system helps me remembering them all. It somewhat different to what other people mostly do, which is prefixing all keybindings with a defined leader key, for example space.*

## Vim keybindings

I will not even try to [list](https://vim.rtorr.com/) or [explain the structure](https://world.hey.com/dhh/wonderful-vi-a1d034d3) of all Vim keybindings in this blog post - others can do that better. I will also not extensively talk about [modes](https://www.warp.dev/terminus/vim-modes), I only really use normal, insert, and visual mode. But I can give you an insight into the keybindings I use on a daily basis and how I personally make sense of them. Hopefully this helps you prioritize which keybindings to learn first and how to remember them. The keybindings listed here work in normal and visual mode, but not in insert mode, where your keystrokes will obviously be interpreted as text input.

For navigating in a file, I use the following keybindings:

- `G`: Go to the end of the file
- `gg`: Go to the beginning of the file
- `$`: Go to the end of the line
- `0`: Go to the beginning of the line
- `e`: Move to the end of the current word
- `b`: Move to the beginning of the current word

And I do have to confess I am one of the few Vim users who actually uses the arrow keys to move around (I know, I know), instead of `h`, `j`, `k`, and `l`. I have to reasons for that: First of all, I just couldn't get used to them. Second of all, I often find myself wanting to navigate around in insert mode, and the arrow keys are just more convenient in that situation than switching modes.

For editing text, I use the following keybindings:

- `i`: Enter insert mode
- `a`: Enter insert mode after the current cursor position (one character further right than with `i`)
- `A`: Enter insert mode at the end of the line
- `u`: Undo the last change
- `Ctrl-r`: Redo the last change
- `dw`: Delete the current word
- `dd`: Delete the current line
- `D`: Delete from the current cursor position to the end of the line

For selecting text and copy-pasta magic, I use the following keybindings:

- `v`: Enter visual mode
- `V`: Enter visual line mode (visually select whole line)
- `y`: Yank (copy) the selected text (in visual mode)
- `d`: Delete the selected text (in visual mode)
- `c`: Change the selected text (in visual mode, delete and enter insert mode)
- `p`: Paste the yanked text after the cursor

With this set of keybindings (that barely scratches the surface of what's possible) you can actually accomplish a lot of things, especially when combining them. For example, for navigating to the end of the file and going into insert mode at the end of the last line, you can simply use `GA`. There are probably more efficient ways to get certain things done, but this "minimalistic" set of keybindings works well for me and most importantly, I can remember them. This is just the start and there is a lot more to learn, but that takes time and practice. I will try and add more keybindings to my repertoire as I go along. It's a fun journey.

And that's it for this blog post. Let's talk about the language server and how you can tailor it to your liking next time - arguably the most important and coolest part of a modern development environment.
