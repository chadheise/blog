// Types for blog posts
export interface BlogPost {
  title: string;
  date: Date;
  slug: string;
  url: string;
  excerpt: string;
  frontmatter: {
    title: string;
    date: string;
    permalink?: string;
    image?: string;
    tags?: string[];
  };
}

// Shared processing logic for parsed markdown modules
function processPostModules(
  mdPosts: Record<string, any>,
  rawMdPosts: Record<string, any>,
  urlPrefix: string,
): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const [filePath, _module] of Object.entries(mdPosts)) {
    const module = _module as any;
    const fileName = filePath.split("/").pop() || "";

    // Generate slug by removing date prefix and .md extension
    // 2019-03-15-hanabi-redesign.md -> hanabi-redesign
    const slug = fileName
      .replace(/^\d{4}-\d{2}-\d{2}-/, "")
      .replace(/\.md$/, "");

    const dateObj = new Date(module.frontmatter.date);
    const rawContent = (rawMdPosts[filePath] as string) || "";
    const excerpt = generateExcerpt(rawContent);

    // Normalize tags: frontmatter may be a comma-separated string or an array
    const rawTags = module.frontmatter.tags;
    let tags: string[] | undefined;
    if (typeof rawTags === "string") {
      tags = rawTags
        .split(",")
        .map((t: string) => t.trim())
        .filter(Boolean);
    } else if (Array.isArray(rawTags)) {
      tags = rawTags;
    }

    posts.push({
      title: module.frontmatter.title,
      date: dateObj,
      slug,
      url: `/${urlPrefix}/${slug}`,
      excerpt,
      frontmatter: {
        ...module.frontmatter,
        tags,
      },
    });
  }

  posts.sort((a, b) => b.date.getTime() - a.date.getTime());
  return posts;
}

// Parse and sort blog posts by date descending (newest first)
export async function parseAndSortBlogPosts(): Promise<BlogPost[]> {
  const mdPosts = await import.meta.glob("/src/content/blog/*.md", {
    eager: true,
  });
  const rawMdPosts = await import.meta.glob("/src/content/blog/*.md", {
    as: "raw",
    eager: true,
  });
  return processPostModules(mdPosts, rawMdPosts, "blog");
}

// Parse and sort project posts by date descending (newest first)
export async function parseAndSortProjectPosts(): Promise<BlogPost[]> {
  const mdPosts = await import.meta.glob("/src/content/projects/*.md", {
    eager: true,
  });
  const rawMdPosts = await import.meta.glob("/src/content/projects/*.md", {
    as: "raw",
    eager: true,
  });
  return processPostModules(mdPosts, rawMdPosts, "projects");
}

// Transform Jekyll image paths to Astro paths
export function transformImagePaths(content: string): string {
  let transformed = content.replace(
    /\{\{site\.baseurl\}\}\/assets\/img\//g,
    "/assets/img/",
  );
  transformed = transformed.replace(
    /\{\{site\.baseurl\}\}\/assets\/files\//g,
    "/assets/files/",
  );
  return transformed;
}

// Generate excerpt from raw markdown content
export function generateExcerpt(
  content: string,
  maxLength: number = 150,
): string {
  // Remove frontmatter if present (lines between --- ---)
  let excerpt = content.replace(/^---[\s\S]*?---\n/, "");

  // Remove markdown image syntax ![alt](url)
  excerpt = excerpt.replace(/!\[[^\]]*\]\([^)]+\)/g, "");

  // Remove HTML tags
  excerpt = excerpt.replace(/<[^>]+>/g, "");

  // Remove Jekyll template syntax
  excerpt = excerpt.replace(/\{\{[^}]+\}\}[^\s]*/g, "");

  // Remove markdown heading lines entirely (# Heading -> removed)
  excerpt = excerpt.replace(/^#{1,6}\s+.*$/gm, "");

  // Remove markdown list markers (* item, - item, 1. item)
  excerpt = excerpt.replace(/^[\s]*[-*+]\s+/gm, "");
  excerpt = excerpt.replace(/^[\s]*\d+\.\s+/gm, "");

  // Remove markdown bold/italic syntax (**text** -> text, *text* -> text)
  excerpt = excerpt.replace(/\*{1,2}([^*]+)\*{1,2}/g, "$1");

  // Remove markdown links syntax [text](url) -> text
  excerpt = excerpt.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

  // Remove extra whitespace and newlines
  excerpt = excerpt.replace(/\s+/g, " ").trim();

  // Truncate to max length
  if (excerpt.length > maxLength) {
    const truncated = excerpt.substring(0, maxLength);
    const lastSpaceIndex = truncated.lastIndexOf(" ");
    return truncated.substring(0, lastSpaceIndex) + "...";
  }

  return excerpt;
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}
