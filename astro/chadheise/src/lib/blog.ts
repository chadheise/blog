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
    permalink: string;
  };
}

export interface RawBlogPost {
  frontmatter: {
    title: string;
    date: string;
    permalink: string;
  };
  rawContent: string;
}

// Parse and sort blog posts by date descending (newest first)
export async function parseAndSortBlogPosts(): Promise<BlogPost[]> {
  // Import compiled markdown modules
  const mdPosts = await import.meta.glob(
    "/src/content/blog/*.md",
    { eager: true }
  );

  // Import raw markdown content for excerpts
  const rawMdPosts = await import.meta.glob(
    "/src/content/blog/*.md",
    { as: "raw", eager: true }
  );

  const blogPosts: BlogPost[] = [];

  for (const [filePath, _module] of Object.entries(mdPosts)) {
    const module = _module as any;
    const fileName = filePath.split("/").pop() || "";

    // Generate slug by removing date prefix and .md extension
    // 2019-03-15-hanabi-redesign.md -> hanabi-redesign
    const slug = fileName
      .replace(/^\d{4}-\d{2}-\d{2}-/, "") // Remove date prefix
      .replace(/\.md$/, ""); // Remove .md extension

    // Parse date from frontmatter
    const dateObj = new Date(module.frontmatter.date);

    // Get raw content for excerpt
    const rawContent = (rawMdPosts[filePath] as string) || "";
    const excerpt = generateExcerpt(rawContent);

    blogPosts.push({
      title: module.frontmatter.title,
      date: dateObj,
      slug,
      url: `/blog/${slug}`,
      excerpt,
      frontmatter: module.frontmatter,
    });
  }

  // Sort by date descending (newest first)
  blogPosts.sort((a, b) => b.date.getTime() - a.date.getTime());

  return blogPosts;
}

// Transform Jekyll image paths to Astro paths
export function transformImagePaths(content: string): string {
  // Replace Jekyll baseurl syntax for images and files
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

  // Remove markdown heading syntax (# Heading -> Heading)
  excerpt = excerpt.replace(/^#{1,6}\s+/gm, "");

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
    // Find the last space before maxLength to avoid cutting words
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
