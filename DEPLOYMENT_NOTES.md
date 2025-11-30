# 배포 노트

## 최근 배포 개선사항

### 2025-01-15

#### 수정된 사항
1. ✅ `next.config.js`: `bundlePagesRouterDependencies` 옵션 제거 (Next.js 14에서 인식되지 않음)
2. ✅ `vercel.json`: Cron Job 제거 (Hobby 플랜 제한, GitHub Actions 사용)
3. ✅ `vercel.json`: `memory` 설정 제거 (Active CPU billing에서 무시됨)
4. ✅ `package.json`: 프로젝트 이름을 `bizmoney`로 변경
5. ✅ `README.md`: Biz-Wallet 프로젝트 설명으로 업데이트
6. ✅ `OptimizedImage.tsx`: ESLint 경고 주석 추가

#### 알려진 이슈
1. ⚠️ npm audit 취약점: `glob` 패키지 취약점 (3개)
   - 원인: `eslint-config-next`의 의존성
   - 영향: 개발 환경에만 영향, 프로덕션 빌드에는 영향 없음
   - 해결: Next.js 16 업그레이드 필요 (breaking change)
   - 현재 상태: 모니터링 중

#### 배포 상태
- ✅ 빌드 성공
- ✅ 모든 페이지 정상 생성 (40개)
- ✅ 정적 생성 완료
- ⚠️ ESLint 경고 2개 (OptimizedImage.tsx - 의도적 사용)

#### 다음 단계
1. Next.js 16 업그레이드 검토 (npm audit 취약점 해결)
2. 프로덕션 배포 후 기능 테스트
3. 애드센스 승인 신청

