export interface Article {
  id: string;
  title: string;
  date: string;
  weekNumber: number;
  content: string;
  thumbnail?: string;
  toc: { id: string; title: string }[];
}

export const mockArticles: Article[] = Array.from({ length: 38 }, (_, i) => {
  // 根据要求，周刊从 4 月中旬开始（2026-04-13 为星期一）
  const dateObj = new Date(Date.UTC(2026, 3, 13 + i * 7));
  const dateStr = dateObj.toISOString().split('T')[0];

  // 动态计算该日期在 2026 年是第几周
  const startOfYear = new Date(Date.UTC(2026, 0, 1));
  const diffDays = Math.floor((dateObj.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
  // 2026-01-01 是星期四，UTC 偏移对应的星期数始终为 4
  const weekNumber = Math.ceil((diffDays + 4) / 7);

  return {
    id: `week-${weekNumber}`,
    title: `第 ${weekNumber} 周 - AI 设计周刊`,
    date: dateStr,
    weekNumber: weekNumber,
    thumbnail: `https://picsum.photos/seed/${weekNumber}/400/300`,
    toc: [
      { id: 'industry-news', title: 'AI + AIGC 行业资讯' },
      { id: 'ui-design', title: 'AI 设计 / AI UI 设计专题' },
      { id: 'image-video', title: 'AI 图像和视频' },
      { id: 'ai-skills', title: '热门 AI Skills' },
    ],
    content: `
欢迎来到 AI 设计周刊第 ${weekNumber} 周的内容。本期发行日期：${dateStr}。

## AI + AIGC 行业资讯 {#industry-news}

### OpenAI 发布全新多模态架构模型

本周 OpenAI 正式揭晓了最新的多模态模型架构，大幅提升了图文理解与空间推理能力。新模型不仅在逻辑推演上实现了阶跃，还首次原生支持了 UI 元素的直接解析与代码生成。这意味着设计师以后可以直接将原型图喂给 AI 进行高保真还原验证。

**价值点：** 极大地缩短了设计到开发的交付链路，设计师需要重新思考如何利用原生多模态能力。

[阅读全文](https://openai.com)

## AI 设计 / AI UI 设计专题 {#ui-design}

### Figma AI：组件库智能演进的下半场

Figma 在本周的更新中全面升级了其内置 AI 的组件关联能力。现在，AI 能够深入理解团队的 Design System，不仅能根据提示词生成基础页面，还能严格遵循你们团队的 Token 规范和间距原则。系统甚至会自动识别不符合规范的变体并提出修改建议。

**价值点：** 规范维护的成本将大幅降低，UI 设计师的核心竞争力将从“画图”彻底转向“系统架构与体验验证”。

[阅读全文](https://figma.com)

## AI 图像和视频 {#image-video}

### Midjourney v7 震撼发布：彻底解决文本与一致性问题

经历了数月的内测，Midjourney v7 终于上线。此次更新在光影表现上更加真实，且完美解决了图像中文字生成的乱码问题。最重要的是，新增的连续角色保持（Character Reference）功能现在支持了极高精度的动作转移，以及视频运镜生成。

**价值点：** 视频分镜师和商业插画师可以直接使用 MJ 产出可商业化、具有高度一致性的资产序列。

[阅读全文](https://midjourney.com)

## 热门 AI Skills {#ai-skills}

### 【Figma 批量命名与自动翻译 Skill】

【简述/摘要】这是一个能让设计师在 Figma 中通过简单指令，一键批量重命名成百上千个图层，并支持自动翻译多语言文本节点的神级 Skill。无论是大型 Design System 维护还是海外业务出海，它都能在一秒钟内完成所有枯燥任务。

【→ 价值点：对设计师为什么重要】彻底解放设计师的双手，告别枯燥的图层整理与国际化文本替换工作，把宝贵的时间全部留给真正的设计思考与体验验证。

【链接】[安装与使用指南](https://github.com)
    `
  };
});
