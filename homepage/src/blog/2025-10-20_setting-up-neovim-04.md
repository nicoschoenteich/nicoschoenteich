---
title: "Creating a personal development environment #4 - A custom theme for SAP TechEd 2025"
topic: "star"
date: "2025-10-20"
---

# Creating a personal development environment #4 - A custom theme for SAP TechEd 2025

1. [#1 - Why Neovim?](https://community.sap.com/t5/technology-blogs-by-sap/creating-a-personal-development-environment-1-why-neovim/ba-p/13733533)
1. [#2 - Miscellaneous, status line, and color scheme](https://community.sap.com/t5/technology-blogs-by-sap/creating-a-personal-development-environment-2-miscellaneous-status-line-and/ba-p/13922474)
1. [#3 - Vim keybindings](https://community.sap.com/t5/technology-blog-posts-by-sap/creating-a-personal-development-environment-3-vim-keybindings/ba-p/13938067)
1. #4 - A custom theme for SAP TechEd 2025 (this blog post)

_Building on top of the previous three blog posts, this blog post will focus on creating a custom theme for Neovim, inspired by the [SAP TechEd 2025](https://www.sap.com/events/teched.html) branding._

![saptechedlightfox](/img/setting-up-neovim/saptechedlightfox.png)

I always enjoy playing around with themes in editors and the SAP TechEd branding was the perfect blueprint to work on a real custom theme for Neovim for the first time. I had previously only changed a few colors in existing themes or applied background images via local config files, but never created a full theme that also others could actually use. So let's get started.

At first, I inspected the documentation of my beloved [carbonfox by nightfox.nvim](https://github.com/edeneast/nightfox.nvim/) theme to remind myself of how to extend it. I played with a few colors that I got from the SAP TechEd templates and added them to the plugin configuration of the existing theme (`~/.config/nvim/lua/plugins/theme.lua`), which looked something like this:

```lua
return {
	"EdenEast/nightfox.nvim",
	config = function()
		require("nightfox").setup({
			options = {
				palettes = {
                    carbonfox = {
					    bg0  = "#89D1FF", -- Dark bg (status line and float)
				    	bg1  = "#EBF8FF", -- Default bg
				    	sel0 = "#FF8AF0", -- Popup bg, visual selection bg
                        sel1 = "#FFCC00", -- Popup sel bg, search bg}
                    }
                },
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

I then realized that there had to be more to it than just changing the colors of the existing palette, as a palette contains not as many colors (16) as the theme actually uses and provides (32). I noticed that because the theme also provides config files for many terminals to copy and paste into your terminal settings (for example this [kitty.conf](https://github.com/EdenEast/nightfox.nvim/blob/main/extra/carbonfox/kitty.conf)), so that your terminal and Neovim are fully in sync - and those config files had other colors in them that where not part of the palette, plus the names of the colors in the palette did not match the ones on the config file. So now I had to understand how `bg0` becomes `active_tab_foreground` and so on. There was probably some build step with additional logic happening here. After some digging and reverse-engineering, I came up with a mapping that allowed me to test a certain color in both my terminal and Neovim, as I now knew which color in the palette would later become which color in the terminal config:

```text
comment
    inactive_tab_foreground

bg0
    active_tab_foreground

bg1
    background
    cursor_text_color

bg4
    inactive_border_color

fg1
    cursor none
    selection_foreground
    foreground

sel0
    selection_background
    inactive_tab_background

black
    color0

red
    color1

green
    color2
    url_color

yellow
    color3

blue
    color4
    active_border_color
    active_tab_background

magenta
    color5

cyan
    color6

white
    color7

orange
    color16
    bell_border_color

pink
    color17
```

After a few iterations of tweaking colors and testing them in both Neovim and my terminal, I finally arrived at a color scheme that I liked and that resembled the SAP TechEd branding quite well. To make it easier for others to use it as well, I forked the [nightfox.nvim](https://github.com/edeneast/nightfox.nvim/) repo and added the colors to two new themes: `saptechedlightfox` and `saptecheddarkfox`. You can find the fork [on my GitHub](https://github.com/nicoschoenteich/nightfox.nvim). While digging into the repo, I found that (as already suspected) the terminal config files are generated during a build step and that there is logic in place to transform a few colors to get different shades for them. You can find these files in the `extra/` directory.

The new themes can now be applied to Neovim like this (notice the module now pointing to my fork):

```lua
return {
	"nicoschoenteich/nightfox.nvim",
	config = function()
		require("nightfox").setup({
			options = {
				transparent = true,
				styles = {
					comments = "italic"
				}
			}
		})
		vim.cmd "colorscheme saptechedlightfox"
	end
}
```

If you also want to apply the background image (see screenshots below), you can find in the `extra/` directory of the forked repo and apply them to your terminal of choice. This is what the config looks like for kitty:

```text
...
window_logo_path background-light.png
window_logo_position bottom-right
window_logo_alpha 1
window_logo_scale 100
...
```

I will close this blog post with a few screenshots of the final result:

![saptechedlightfox-more-windows](/img/setting-up-neovim/saptechedlightfox-more-windows.png)
![saptecheddarkfox-more-windows](/img/setting-up-neovim/saptecheddarkfox-more-windows.png)
