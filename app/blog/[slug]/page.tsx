import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '../utils';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from '../components/MDXComponents';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Link2, Twitter } from 'lucide-react';
import ShareButtons from '../components/ShareButtons';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };
  
  return {
    title: `${post.title} | Fakhreddine`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  // Construct the full URL for sharing
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://falouix.com';
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  return (
    <article className="py-24 px-6 bg-[#020617] min-h-screen">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to blog
        </Link>

        <header className="mb-8">
          <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readingTime}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {post.title}
          </h1>
          
          <p className="text-xl text-slate-400">{post.excerpt}</p>
          
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-500/10 text-blue-400 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Share Buttons */}
        <ShareButtons 
          url={postUrl} 
          title={post.title} 
          excerpt={post.excerpt} 
        />

        {/* Content */}
        <div className="prose prose-invert prose-blue max-w-none">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>

        {/* Bottom Share Section */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <p className="text-slate-400 mb-4">Enjoyed this post? Share it with others:</p>
          <ShareButtons 
            url={postUrl} 
            title={post.title} 
            excerpt={post.excerpt} 
          />
        </div>
      </div>
    </article>
  );
}