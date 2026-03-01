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

    // Generate slug from full filename (minus .md) to avoid collisions between
    // posts that share the same base name but have different dates.
    // 2019-03-15-hanabi-redesign.md -> 2019-03-15-hanabi-redesign
    const slug = fileName.replace(/\.md$/, "");

    const dateObj = new Date(module.frontmatter.date);
    const rawContent = (rawMdPosts[filePath] as string) || "";
    const excerpt = generateExcerptHtml(rawContent);

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

// Generate an HTML excerpt from raw markdown content.
// For posts that start with bullet list items, renders them as <ul><li> HTML.
// Links within bullets become <span class="excerpt-link"> rather than real <a>
// tags, since the preview card itself is already an anchor element.
// Falls back to plain text for non-list posts.
export function generateExcerptHtml(
  content: string,
  maxItems: number = 3,
  maxLength: number = 150,
): string {
  let body = content.replace(/^---[\s\S]*?---\n/, "");
  body = body.replace(/!\[[^\]]*\]\([^)]+\)/g, "");
  body = body.replace(/<[^>]+>/g, "");
  body = body.replace(/\{\{[^}]+\}\}[^\s]*/g, "");
  body = body.replace(/^#{1,6}\s+.*$/gm, "");

  const bulletLines: string[] = [];
  for (const line of body.split("\n")) {
    const trimmed = line.trim();
    if (/^[-*+]\s/.test(trimmed)) {
      bulletLines.push(trimmed);
    } else if (trimmed === "") {
      continue;
    } else {
      break;
    }
  }

  if (bulletLines.length > 0) {
    const items = bulletLines.slice(0, maxItems).map((line) => {
      let text = line.replace(/^[-*+]\s+/, "");
      text = text.replace(/\*{1,2}([^*]+)\*{1,2}/g, "$1");
      text = text.replace(
        /\[([^\]]+)\]\([^)]+\)/g,
        '<span class="excerpt-link">$1</span>',
      );
      return `<li>${text}</li>`;
    });
    return `<ul class="excerpt-list">${items.join("")}</ul>`;
  }

  return generateExcerpt(content, maxLength);
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
export function formatDate(dateInput: string | Date): string {
  // YAML parsers return bare dates (e.g. "date: 2021-08-01") as UTC Date objects.
  // Astro may also serialize Date objects to ISO strings ("2021-08-01T00:00:00.000Z")
  // when passing them as component props. Either way, we extract the calendar
  // date components directly to avoid timezone-offset shifts.
  let year: number, month0: number, day: number;

  if (dateInput instanceof Date) {
    year = dateInput.getUTCFullYear();
    month0 = dateInput.getUTCMonth(); // 0-indexed
    day = dateInput.getUTCDate();
  } else {
    // substring(0, 10) gives "YYYY-MM-DD" regardless of whether the string is
    // a simple date ("2021-08-01") or an ISO string ("2021-08-01T00:00:00.000Z")
    const parts = String(dateInput).substring(0, 10).split("-").map(Number);
    year = parts[0];
    month0 = parts[1] - 1; // Convert to 0-indexed
    day = parts[2];
  }

  const date = new Date(year, month0, day);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}
