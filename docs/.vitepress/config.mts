import { defineConfig } from "vitepress";
import { generateSidebarConfig } from "../../scripts/generateSidebar.js";

// 获取动态生成的侧边栏
const sidebar = generateSidebarConfig();

export default defineConfig({
  base: "/web-review/", // 替换为你的仓库名
  title: "三土前端小站",
  description: "前端知识复习小站",
  head: [
    // 基本 favicon 配置
    ["link", { rel: "icon", href: "/web-review/vitepress-logo-mini.svg" }],
  ],
  themeConfig: {
    logo: { src: "/vitepress-logo-mini.svg", width: 24, height: 24 },
    docFooter: {
      prev: "上一页", // 将 "Previous" 修改为 "上一页"
      next: "下一页", // 将 "Next" 修改为 "下一页"
    },
    nav: [
      { text: "主页", link: "/" },
      { text: "文档", link: "/markdown-examples" },
    ],
    sidebar: sidebar, // 将动态生成的侧边栏赋值给这里
    socialLinks: [
      { icon: "github", link: "https://github.com/a244885878/web-review" },
    ],
    footer: {
      message: "基于 MIT 许可发布",
      copyright: "版权所有 © 2025 Lisantu",
    },
  },
});
