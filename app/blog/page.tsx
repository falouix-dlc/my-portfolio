import { getAllPosts } from './utils';
import BlogCard from './components/BlogCard';
import { FileText } from 'lucide-react';

export const metadata = {
  title: 'Blog | Fakhreddine',
  description: 'Thoughts on web development, design, and technology.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="py-24 px-6 bg-[#020617] min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <FileText className="w-6 h-6 text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold text-white">Blog</h1>
          </div>
          <p className="text-slate-400 text-lg">
            Thoughts on web development, design patterns, and modern technologies.
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid gap-6">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-slate-800 rounded-2xl">
            <p className="text-slate-500">No posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}