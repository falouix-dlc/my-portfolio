import Link from 'next/link';
import { Calendar, Clock, Tag, ArrowUpRight } from 'lucide-react';
import type { BlogPost } from '../types';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group relative">
      <Link 
        href={`/blog/${post.slug}`}
        className="block p-6 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-blue-500/50 hover:bg-slate-900/80 transition-all duration-300"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Content */}
          <div className="flex-1">
            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readingTime}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
              {post.title}
            </h2>
            
            {/* Excerpt */}
            <p className="text-slate-400 line-clamp-2 mb-4">
              {post.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 text-slate-300 text-xs rounded-full group-hover:bg-slate-700 transition-colors"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Arrow Icon */}
          <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 group-hover:bg-blue-500 group-hover:text-white text-slate-400 transition-all duration-300">
            <ArrowUpRight className="w-5 h-5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </Link>
    </article>
  );
}