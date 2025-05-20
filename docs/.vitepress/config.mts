import { defineConfig } from "vitepress";
import { generateSidebarConfig } from "../../scripts/generateSidebar.js";

// 获取动态生成的侧边栏
const sidebar = generateSidebarConfig();

export default defineConfig({
  base: "/web-review/", // 替换为你的仓库名
  title: "三土前端小站",
  description: "前端知识复习小站",
  themeConfig: {
    nav: [
      { text: "主页", link: "/" },
      { text: "文档", link: "/markdown-examples" },
    ],
    sidebar: sidebar, // 将动态生成的侧边栏赋值给这里
    socialLinks: [
      { icon: "github", link: "https://github.com/a244885878/web-review" },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2015-present Lisantu",
    },
  },
});
