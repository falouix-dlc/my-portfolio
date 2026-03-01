import { ReactNode } from 'react';

export const mdxComponents = {
  h1: ({ children }: { children: ReactNode }) => (
    <h1 className="text-3xl font-bold text-white mt-8 mb-4">{children}</h1>
  ),
  h2: ({ children }: { children: ReactNode }) => (
    <h2 className="text-2xl font-bold text-white mt-8 mb-4 border-b border-slate-800 pb-2">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: ReactNode }) => (
    <h3 className="text-xl font-bold text-white mt-6 mb-3">{children}</h3>
  ),
  p: ({ children }: { children: ReactNode }) => (
    <p className="text-slate-300 leading-relaxed mb-4">{children}</p>
  ),
  ul: ({ children }: { children: ReactNode }) => (
    <ul className="list-disc list-inside text-slate-300 mb-4 space-y-1">{children}</ul>
  ),
  ol: ({ children }: { children: ReactNode }) => (
    <ol className="list-decimal list-inside text-slate-300 mb-4 space-y-1">{children}</ol>
  ),
  code: ({ children }: { children: ReactNode }) => (
    <code className="bg-slate-800 text-blue-400 px-2 py-1 rounded text-sm font-mono">
      {children}
    </code>
  ),
  pre: ({ children }: { children: ReactNode }) => (
    <pre className="bg-slate-900 border border-slate-800 rounded-lg p-4 overflow-x-auto mb-4">
      {children}
    </pre>
  ),
  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-slate-400 my-4">
      {children}
    </blockquote>
  ),
  a: ({ href, children }: { href: string; children: ReactNode }) => (
    <a
      href={href}
      className="text-blue-400 hover:text-blue-300 underline underline-offset-4"
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
};