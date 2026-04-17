import { mockArticles } from "@/data/mockData";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export async function generateStaticParams() {
  return mockArticles.map((article) => ({
    id: article.id,
  }));
}

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = mockArticles.find((a) => a.id === id);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col md:flex-row max-w-[1200px] mx-auto">
      {/* Sidebar TOC */}
      <aside className="w-full md:w-64 lg:w-80 border-b md:border-b-0 md:border-r border-black p-8 md:p-12 shrink-0 md:sticky md:top-0 md:h-screen md:overflow-y-auto bg-[var(--background)]">
        <div className="mb-12">
          <Link href="/" className="font-mono text-xs uppercase tracking-widest hover:text-[var(--color-primary)] transition-colors">
            ← 返回首页
          </Link>
        </div>
        <h2 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-black pb-2">本期目录</h2>
        <nav className="flex flex-col gap-4">
          {article.toc.map((item) => (
            <a 
              key={item.id} 
              href={`#${item.id}`}
              className="text-zinc-600 hover:text-[var(--color-primary)] hover:translate-x-1 transition-all text-sm font-medium"
            >
              {item.title}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-16 lg:p-24 max-w-4xl">
        <header className="mb-16 border-b border-black pb-8">
          <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-zinc-500 mb-6">
            <span>第 {String(article.weekNumber).padStart(2, '0')} 周</span>
            <span>•</span>
            <span>{article.date}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-medium tracking-tight leading-snug mb-8 text-zinc-900">
            {article.title}
          </h1>
          {/* Note: This is where we will hook up automated AI news fetching later. */}
          <p className="text-xs font-mono text-[var(--color-primary)] uppercase tracking-widest mt-4">
            [定时抓取内容占位符]
          </p>
        </header>

        <article className="prose prose-zinc max-w-none prose-headings:font-medium prose-headings:text-zinc-900 prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-zinc-200 prose-h2:pb-3 prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-4 prose-p:text-zinc-600 prose-p:leading-relaxed prose-a:text-[var(--color-primary)] prose-a:no-underline hover:prose-a:underline prose-strong:font-medium prose-strong:text-zinc-900">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </article>
      </main>
    </div>
  );
}
