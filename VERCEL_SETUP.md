# Vercel + Turso + GitHub Actions 설정 가이드

이 문서는 Biz-Wallet 프로젝트를 Vercel, Turso, GitHub Actions 환경에 배포하는 상세 가이드입니다.

## 📋 목차

1. [사전 준비](#사전-준비)
2. [Turso 데이터베이스 설정](#turso-데이터베이스-설정)
3. [Vercel 배포](#vercel-배포)
4. [GitHub Actions 설정](#github-actions-설정)
5. [크론 작업 설정](#크론-작업-설정)
6. [환경 변수 체크리스트](#환경-변수-체크리스트)

## 사전 준비

### 1.1 필요한 계정
- ✅ Vercel 계정 (무료 플랜 가능)
- ✅ Turso 계정 (무료 플랜 가능)
- ✅ GitHub 계정
- ✅ Google Gemini API 키 (AI 콘텐츠 생성 시)

### 1.2 프로젝트 준비
- GitHub에 프로젝트가 푸시되어 있어야 합니다
- 저장소는 Public 또는 Private 모두 가능합니다

## Turso 데이터베이스 설정

### 2.1 Turso 계정 생성 및 CLI 설치

```bash
# Turso CLI 설치 (macOS/Linux)
curl -sSfL https://get.tur.so/install.sh | bash

# Windows (PowerShell)
irm https://get.tur.so/install.ps1 | iex
```

### 2.2 데이터베이스 생성

```bash
# Turso 로그인
turso auth login

# 데이터베이스 생성
turso db create biz-wallet-db

# 데이터베이스 URL 및 토큰 확인
turso db show biz-wallet-db
turso db tokens create biz-wallet-db
```

### 2.3 스키마 적용

```bash
# 로컬에서 스키마 적용
turso db shell biz-wallet-db < db/schema.sql

# 또는 직접 SQL 실행
turso db shell biz-wallet-db
```

스키마 내용:
```sql
CREATE TABLE IF NOT EXISTS page_views (
  slug TEXT PRIMARY KEY,
  views INTEGER NOT NULL DEFAULT 0,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_page_views_updated ON page_views(updated_at);
```

### 2.4 환경 변수 확인

다음 정보를 복사해두세요:
- `TURSO_DATABASE_URL`: `libsql://biz-wallet-db-xxxxx.turso.io`
- `TURSO_AUTH_TOKEN`: `eyJ...` (토큰 생성 시 표시됨)

## Vercel 배포

### 3.1 프로젝트 연결

1. [Vercel 대시보드](https://vercel.com/dashboard) 접속
2. "Add New Project" 클릭
3. GitHub 저장소 선택
4. 프로젝트 설정 확인:
   - **Framework Preset**: Next.js (자동 감지)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### 3.2 환경 변수 설정

Vercel 대시보드 > Project Settings > Environment Variables에서 설정:

#### 필수 변수
```
TURSO_DATABASE_URL=libsql://your-db.turso.io
TURSO_AUTH_TOKEN=eyJ...
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

#### 선택적 변수
```
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-...
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=...
NEXT_PUBLIC_NAVER_SITE_VERIFICATION=...
ADMIN_PASSWORD=your-secure-password
```

**참고**: `NEXT_PUBLIC_SITE_URL`은 커스텀 도메인 사용 시에만 필요합니다. Vercel이 자동으로 `VERCEL_URL`을 제공합니다.

### 3.3 배포 실행

1. "Deploy" 버튼 클릭
2. 빌드 로그 확인
3. 배포 완료 대기 (약 2-3분)

### 3.4 크론 작업 설정 (Pro 플랜 이상)

Vercel Pro 플랜 이상을 사용하는 경우:

1. `vercel.json`에 크론 설정이 이미 포함되어 있습니다
2. 자동으로 매일 00:00 UTC에 `/api/cron/daily`가 실행됩니다
3. 별도 설정 불필요

**Hobby 플랜 사용 시**: GitHub Actions 크론 사용 (아래 참조)

## GitHub Actions 설정

### 4.1 시크릿 설정

GitHub 저장소 > Settings > Secrets and variables > Actions:

#### 필수 시크릿
- `GEMINI_API_KEY`: Google Gemini API 키 (AI 콘텐츠 생성용)

#### 선택적 시크릿 (크론 작업 사용 시)
- `SITE_URL`: 배포된 사이트 URL (예: `https://your-domain.vercel.app`)
- `CRON_SECRET`: 크론 작업 보안 키 (랜덤 문자열 생성)

### 4.2 워크플로우 확인

다음 워크플로우가 자동으로 활성화됩니다:

1. **Organic Writer** (`.github/workflows/organic-writer.yml`)
   - 4시간마다 AI 콘텐츠 생성
   - `GEMINI_API_KEY` 필요

2. **Daily Cron Job** (`.github/workflows/daily-cron.yml`)
   - 매일 sitemap ping
   - `SITE_URL`, `CRON_SECRET` 필요

### 4.3 워크플로우 테스트

```bash
# 수동 실행 테스트
# GitHub 저장소 > Actions 탭 > 워크플로우 선택 > "Run workflow"
```

## 크론 작업 설정

### 옵션 1: Vercel Cron (Pro 플랜)

- ✅ 자동 설정됨 (`vercel.json`에 포함)
- ✅ 자동 인증 처리
- ✅ 별도 설정 불필요

### 옵션 2: GitHub Actions (무료, 권장)

1. GitHub 시크릿 설정:
   - `SITE_URL`: 배포된 사이트 URL
   - `CRON_SECRET`: 보안 키

2. `.github/workflows/daily-cron.yml`이 자동으로 실행됩니다

3. 매일 한국 시간 00:00 (UTC 15:00)에 실행됩니다

### 옵션 3: 외부 크론 서비스

[cron-job.org](https://cron-job.org) 또는 유사 서비스 사용:

- URL: `https://your-domain.vercel.app/api/cron/daily`
- Schedule: `0 0 * * *` (매일 00:00 UTC)
- Headers: `Authorization: Bearer YOUR_CRON_SECRET`

## 환경 변수 체크리스트

### Vercel 환경 변수

- [ ] `TURSO_DATABASE_URL`
- [ ] `TURSO_AUTH_TOKEN`
- [ ] `NEXT_PUBLIC_SITE_URL` (커스텀 도메인 사용 시)
- [ ] `NEXT_PUBLIC_ADSENSE_CLIENT_ID` (광고 사용 시)
- [ ] `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (SEO 최적화)
- [ ] `NEXT_PUBLIC_NAVER_SITE_VERIFICATION` (한국 SEO)
- [ ] `ADMIN_PASSWORD` (관리자 페이지 사용 시)

### GitHub Actions 시크릿

- [ ] `GEMINI_API_KEY` (AI 콘텐츠 생성 시)
- [ ] `SITE_URL` (GitHub Actions 크론 사용 시)
- [ ] `CRON_SECRET` (GitHub Actions 크론 사용 시)

## 배포 확인

### 1. 사이트 접속
- 배포된 URL로 접속
- 주요 페이지 확인:
  - `/` (홈)
  - `/calculator` (세금 계산기)
  - `/quiz` (세금 방어력 테스트)
  - `/blog` (블로그)

### 2. 기능 테스트
- [ ] 세금 계산기 작동 확인
- [ ] 퀴즈 작동 확인
- [ ] 조회수 카운터 작동 확인 (Turso 연결 확인)
- [ ] AdSense 광고 표시 확인 (설정한 경우)

### 3. 크론 작업 테스트

```bash
# 수동 테스트 (GitHub Actions 크론 사용 시)
curl -X GET "https://your-domain.vercel.app/api/cron/daily" \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

## 문제 해결

### Turso 연결 오류

1. 환경 변수 확인:
   ```bash
   # Vercel 대시보드에서 확인
   TURSO_DATABASE_URL
   TURSO_AUTH_TOKEN
   ```

2. Turso 대시보드에서 데이터베이스 상태 확인

3. 네트워크 방화벽 설정 확인

### 크론 작업 실패

1. **Vercel Cron 사용 시**:
   - Pro 플랜 확인
   - `vercel.json`의 `crons` 설정 확인

2. **GitHub Actions 사용 시**:
   - 시크릿 설정 확인 (`SITE_URL`, `CRON_SECRET`)
   - Actions 탭에서 로그 확인

3. **외부 서비스 사용 시**:
   - URL 및 헤더 설정 확인
   - `CRON_SECRET` 환경 변수 확인

### 빌드 실패

1. Build Logs에서 에러 메시지 확인
2. 환경 변수 누락 확인
3. 로컬에서 `npm run build` 실행하여 재현

## 추가 리소스

- [Vercel 공식 문서](https://vercel.com/docs)
- [Turso 문서](https://docs.turso.tech)
- [GitHub Actions 문서](https://docs.github.com/en/actions)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)

