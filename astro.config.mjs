// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// Remark plugin to transform Jekyll syntax to Astro syntax
function transformJekyllPaths() {
  return (tree) => {
    // Create a map to track transformations
    const transformContent = (node) => {
      // Transform inline text nodes that contain Jekyll syntax
      if (node.type === "text" && node.value) {
        node.value = node.value
          .replace(/\{\{site\.baseurl\}\}\/assets\/img\//g, "/assets/img/")
          .replace(/\{\{site\.baseurl\}\}\/assets\/files\//g, "/assets/files/")
          .replace(/\{\{site\.baseurl\}\}/g, "");
      }
      // Transform image URLs
      if (node.type === "image" && node.url) {
        node.url = node.url
          .replace(/\{\{site\.baseurl\}\}\/assets\/img\//g, "/assets/img/")
          .replace(/\{\{site\.baseurl\}\}\/assets\/files\//g, "/assets/files/")
          .replace(/\{\{site\.baseurl\}\}/g, "");
      }
      // Transform link URLs
      if (node.type === "link" && node.url) {
        node.url = node.url
          .replace(/\{\{site\.baseurl\}\}\/assets\/img\//g, "/assets/img/")
          .replace(/\{\{site\.baseurl\}\}\/assets\/files\//g, "/assets/files/")
          .replace(/\{\{site\.baseurl\}\}/g, "");
      }
      // Transform HTML nodes (for raw HTML images and links)
      if (node.type === "html" && node.value) {
        node.value = node.value
          .replace(/\{\{site\.baseurl\}\}\/assets\/img\//g, "/assets/img/")
          .replace(/\{\{site\.baseurl\}\}\/assets\/files\//g, "/assets/files/")
          .replace(/\{\{site\.baseurl\}\}/g, "");
      }
      // Recursively process children
      if (node.children && Array.isArray(node.children)) {
        node.children.forEach(transformContent);
      }
    };
    transformContent(tree);
  };
}

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [transformJekyllPaths],
    syntaxHighlight: false,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
