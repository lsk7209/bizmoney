import { tools } from './items';

export function getRandomToolSlug(): string {
  const publishedTools = tools.filter((tool) => tool.published);
  if (publishedTools.length === 0) {
    return 'tools';
  }
  const randomIndex = Math.floor(Math.random() * publishedTools.length);
  return publishedTools[randomIndex].slug;
}

export function buildBlogPrompt(topic: string, toolSlug: string): string {
  const relatedTool = tools.find(t => t.slug === toolSlug);
  const toolName = relatedTool ? relatedTool.title : '관련 도구';

  return `
당신은 대한민국 최고의 세무/회계 분야 전문 에디터이자 SEO/AEO(Answer Engine Optimization) 전문가입니다.
아래 주제에 대해 프리랜서와 소상공인에게 실질적인 도움이 되는 고품질 블로그 포스트를 작성해주세요.

**주제:** ${topic}
**관련 도구:** ${toolName} (링크: /tools/${toolSlug})

---

### **작성 가이드라인 (필수 준수)**

**1. 콘텐츠 목표 및 타겟**
- **타겟:** 세금 지식이 부족한 프리랜서(개발자, 디자이너, 유튜버 등) 및 1인 소상공인.
- **목표:** 독자의 궁금증을 명쾌하게 해결하고, 'Biz-Wallet'의 도구를 사용하도록 유도하여 체류 시간을 늘리는 것.
- **톤앤매너:** 전문적이지만 이해하기 쉽게(Easy-to-read), 친절하고 공감하는 어조. "해요"체 사용.

**2. SEO & AEO & GEO 최적화 전략**
- **키워드 배치:** 주제와 관련된 롱테일 키워드를 제목, 첫 문단, H2 태그에 자연스럽게 포함하세요.
- **구조화된 답변:** 구글 추천 스니펫(Featured Snippet)과 AI 검색(ChatGPT, Perplexity)이 인용하기 좋게, 질문에 대한 답을 명확한 문장이나 리스트 형태로 작성하세요.
- **풍부한 내용:** 단순 정보 나열이 아닌, 구체적인 예시, 절세 팁, 주의사항을 포함하여 2,500자 이상 작성하세요.

**3. 글의 구조 (Structure)**
글은 반드시 아래 순서와 구조를 따라야 합니다.

**(1) 프론트매터 (Frontmatter)**
\`\`\`yaml
title: "클릭을 부르는 매력적인 제목 (숫자, 혜택 포함)"
description: "검색 결과에 노출될 150자 이내의 매력적인 요약문"
date: "${new Date().toISOString().split('T')[0]}"
tags: ["관련태그1", "관련태그2", "관련태그3", "관련태그4"]
published: true
metaTitle: "SEO용 제목 (60자 이내)"
metaDescription: "SEO용 설명 (160자 이내)"
keywords: ["메인키워드", "서브키워드1", "서브키워드2"]
\`\`\`

**(2) 도입부 (Hook)**
- 독자의 고민(Pain Point)을 건드리는 질문으로 시작하세요.
- 이 글을 읽어야 하는 이유와 얻을 수 있는 이득(Benefit)을 명확히 제시하세요.
- **<Callout type="info">** 컴포넌트를 사용하여 이 글의 핵심 요약을 3줄로 정리하세요.

**(3) 본문 (Body)**
- **H2, H3 태그**를 사용하여 논리적으로 구성하세요.
- 긴 줄글 대신 **글머리 기호(Bullet points)**와 **숫자 리스트**를 적극 활용하세요.
- 중요한 문장이나 키워드는 **굵게(Bold)** 처리하여 가독성을 높이세요.
- 내용 중간에 **<Callout type="warning">** 컴포넌트를 사용하여 주의사항이나 놓치기 쉬운 팁을 강조하세요.
- 비교가 필요한 내용(예: 단순경비율 vs 기준경비율)이 있다면 **<ProsCons>** 또는 **<Table>** 컴포넌트를 반드시 사용하세요.

**(4) 실전 사례 (Case Study)**
- 이론적인 설명에 그치지 말고, "연봉 5천만 원 프리랜서 A씨의 사례"와 같이 구체적인 예시를 들어 설명하세요.

**(5) 솔루션 제시 (Tool Integration)**
- 독자의 문제를 해결할 수 있는 방법으로 **${toolName}** 사용을 제안하세요.
- 자연스럽게 \`/tools/${toolSlug}\` 링크를 포함하여 도구 사용을 유도하세요. (예: "복잡한 계산은 **[${toolName}](/tools/${toolSlug})**로 10초 만에 확인해보세요.")

**(6) 자주 묻는 질문 (FAQ) - AEO 핵심**
- 주제와 관련하여 사람들이 가장 많이 검색하는 질문 3~4가지를 Q&A 형식으로 작성하세요.
- 질문은 H3 태그로, 답변은 명확하고 간결하게 작성하세요.

**(7) 결론 (Conclusion)**
- 전체 내용을 따뜻하게 마무리하고, 독자를 응원하는 메시지를 남기세요.

---

### **사용 가능한 MDX 컴포넌트 예시**

1. **강조 박스:**
<Callout type="info">
  **핵심 요약**
  1. 첫 번째 핵심 내용
  2. 두 번째 핵심 내용
</Callout>

2. **장단점 비교:**
<ProsCons 
  pros={["장점 1", "장점 2"]} 
  cons={["단점 1", "단점 2"]} 
/>

3. **데이터 테이블:**
<Table>
  <thead>
    <tr>
      <th>구분</th>
      <th>내용 1</th>
      <th>내용 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>항목 A</td>
      <td>데이터 A1</td>
      <td>데이터 A2</td>
    </tr>
  </tbody>
</Table>

---

**작성 시작:**
`;
}
