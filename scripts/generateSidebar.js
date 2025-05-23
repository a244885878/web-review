import fs from "fs";
import path from "path";

/**
 * Generate VitePress sidebar configuration based on docs folders
 * Excludes the .vitepress folder itself and strips numeric prefixes from names
 * @returns {Array<{text: string, collapsed: boolean, items: {text: string, link: string}[]}>}
 */
export function generateSidebarConfig() {
  const docsDir = path.resolve(__dirname, "../docs");

  const filterDirectory = [".vitepress", "public"];

  const dirs = fs
    .readdirSync(docsDir, { withFileTypes: true })
    .filter(
      (dirent) => dirent.isDirectory() && !filterDirectory.includes(dirent.name)
    )
    .map((dirent) => dirent.name)
    // sort directories based on prefix
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const sidebar = dirs.map((folderName) => {
    const displayFolder = folderName.replace(/^\d+_/, "");
    const folderPath = path.join(docsDir, folderName);

    const files = fs
      .readdirSync(folderPath, { withFileTypes: true })
      .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".md"))
      .map((dirent) => {
        const rawName = path.basename(dirent.name, ".md");
        const displayName = rawName.replace(/^\d+_/, "");
        return {
          text: displayName,
          link: `/${folderName}/${rawName}`,
        };
      })
      // sort files based on prefix
      .sort((a, b) =>
        a.text.localeCompare(b.text, undefined, { numeric: true })
      );

    return {
      text: displayFolder,
      collapsed: false,
      items: files,
    };
  });

  return sidebar;
}
