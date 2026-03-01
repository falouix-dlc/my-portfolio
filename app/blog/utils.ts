import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        tags: data.tags || [],
        readingTime: Math.ceil(content.split(' ').length / 200) + ' min read',
        content,
      };
    });

  return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    tags: data.tags || [],
    readingTime: Math.ceil(content.split(' ').length / 200) + ' min read',
    content,
  };
}