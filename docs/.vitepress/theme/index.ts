// .vitepress/theme/index.mts
import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import { inBrowser } from "vitepress";
import * as cursoreffects from "cursor-effects";

export default {
  extends: DefaultTheme,
  enhanceApp({ router }) {
    if (inBrowser) {
      router.onAfterRouteChanged = () => {
        // 鼠标特效
        window.__cursor_effect_instance = cursoreffects.fairyDustCursor();
      };
      // 加载看板娘
      // 在浏览器环境才加载，避免SSR报错
      if (!import.meta.env.SSR) {
        import("oh-my-live2d").then(({ loadOml2d }) => {
          loadOml2d({
            models: [
              {
                path: "https://registry.npmmirror.com/oml2d-models/latest/files/models/Senko_Normals/senko.model3.json",
                scale: 0.15,
              },
              {
                path: "https://registry.npmmirror.com/oml2d-models/latest/files/models/Pio/model.json",
                scale: 0.5,
              },
              {
                path: "https://model.hacxy.cn/shizuku/shizuku.model.json",
                scale: 0.2,
                position: [70, 70],
                stageStyle: {
                  height: 370,
                  width: 400,
                },
              },
              {
                path: "https://model.hacxy.cn/HK416-1-normal/model.json",
                position: [0, 60],
                scale: 0.12,
                // stageStyle: {
                //   height: 450,
                // },
              },
            ],
            dockedPosition: "right",
          });
        });
      }
    }
  },
} as Theme;

declare global {
  interface Window {
    __cursor_effect_instance: any;
  }
}
