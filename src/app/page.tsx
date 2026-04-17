"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { mockArticles } from "@/data/mockData";

export default function Home() {
  // 取消模拟，使用真实的当前时间
  const today = new Date();
  const availableArticles = mockArticles
    .filter((article) => new Date(article.date) <= today)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const monthNamesEn = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const monthNamesZh = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
  
  // 提取实际有文章的月份作为 Tab 导航
  // 使用 reversed() 保证从最早有文章的月份排序到最新的月份（比如从 四月 排到 十二月）
  const availableMonths = Array.from(new Set(availableArticles.map(a => {
    const m = parseInt(a.date.split("-")[1], 10) - 1;
    return monthNamesEn[m];
  }))).reverse();

  // 默认选中最新的那个月
  const [activeMonth, setActiveMonth] = useState(availableMonths[availableMonths.length - 1] || "APR");

  // 当前选中月份下的文章列表
  const activeArticles = useMemo(() => {
    return availableArticles.filter(a => {
      const m = parseInt(a.date.split("-")[1], 10) - 1;
      return monthNamesEn[m] === activeMonth;
    });
  }, [availableArticles, activeMonth]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6 md:px-12 pt-16 max-w-[1200px] mx-auto relative">
      
      {/* Decorative background watermark */}
      <div className="fixed right-0 top-32 opacity-[0.03] pointer-events-none select-none overflow-hidden z-0">
        <div className="w-[800px] h-[800px] rounded-full border-[1px] border-black absolute -right-[400px] -top-[200px]"></div>
        <div className="w-[760px] h-[760px] rounded-full border-[1px] border-black absolute -right-[380px] -top-[180px] border-dashed"></div>
      </div>

      <header className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-12 mb-16 border-b border-zinc-400 pb-12 relative z-10">
        {/* Left Side: Description Text */}
        <div className="max-w-2xl">
          <p className="text-base text-zinc-800 tracking-tight font-normal leading-loose">
            追踪 AI 驱动下的设计边界拓展与工作流重塑。为专业创作者提供应对智能时代的每周前沿参考。
          </p>
        </div>

        {/* Right Side: Tech Text */}
        <div className="flex flex-col items-start lg:items-end text-xs font-mono tracking-widest text-zinc-700 gap-4">
          <div className="text-left lg:text-right uppercase leading-loose">
            <p>PUBLICATION: AI DESIGN WEEKLY</p>
            <p>FREQUENCY: WEEKLY ISSUE</p>
            <p>EDITION: VOL. 2026</p>
          </div>
        </div>
      </header>

      {/* Full width Horizontal Month Switcher directly above the list */}
      <div className="flex flex-wrap gap-x-8 gap-y-4 mb-12 relative z-10 pb-2">
        {availableMonths.map((month) => {
          const zhName = monthNamesZh[monthNamesEn.indexOf(month)];
          return (
            <button
              key={month}
              onClick={() => setActiveMonth(month)}
              className={`text-sm font-medium tracking-widest transition-all ${
                activeMonth === month 
                  ? "text-zinc-900 font-bold border-b-[2px] border-zinc-900 pb-[2px]" 
                  : "text-zinc-400 hover:text-zinc-700"
              }`}
            >
              {zhName}
            </button>
          );
        })}
      </div>

      <main className="pb-32 relative z-10">
        <div className="flex flex-col animate-in fade-in duration-500" key={activeMonth}>
          {activeArticles.map((article) => (
            <Link 
              key={article.id} 
              href={`/article/${article.id}`}
              className="group block py-10 border-b border-zinc-400 relative"
            >
              <div className="flex justify-between items-start gap-8">
                <div className="max-w-3xl">
                  <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-zinc-900 mb-4 group-hover:text-[var(--color-primary)] transition-colors leading-tight">
                    {article.title}
                  </h2>
                  <p className="text-base text-zinc-600 font-light leading-relaxed mb-6">
                    一览本周最新的 AI 设计趋势、重磅更新与硬核教程。从工具迭代到创意工作流的重塑。
                  </p>
                  <div className="text-xs font-mono tracking-widest uppercase text-zinc-500">
                    FIG {String(article.weekNumber).padStart(2, '0')} &nbsp;/&nbsp; {article.date}
                  </div>
                </div>
                
                {/* Arrow */}
                <div className="pt-2 shrink-0">
                  <span className="text-2xl text-zinc-800 group-hover:translate-x-3 transition-transform inline-block duration-300">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}

          {activeArticles.length === 0 && (
            <div className="py-20 text-center text-zinc-500 font-mono text-sm tracking-widest uppercase">
              暂无已发布的周刊
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
