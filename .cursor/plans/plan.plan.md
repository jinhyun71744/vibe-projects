---
name: My Diary Dev Plan
overview: spec.md·api-spec.md 기반으로 0단계(초기 셋업) → 1단계(Mock 목업) → 2단계(Supabase 실제 구현) 순으로 나만의 일기장을 구현한다. 1단계가 완전히 끝나기 전에는 2단계로 넘어가지 않는다.
todos:
  - id: phase-0
    content: "0단계: frontend/에 Next.js 프로젝트 생성, 폴더 스캐폴딩, 타입·Mock 파일, 개발 서버 확인"
    status: completed
  - id: phase-1-a
    content: "1단계 섹션 A: 루트·Auth·Main 레이아웃 + 랜딩 페이지"
    status: completed
  - id: phase-1-b
    content: "1단계 섹션 B: 로그인·회원가입 목업 화면"
    status: completed
  - id: phase-1-c
    content: "1단계 섹션 C: 일기 목록 + 기분 필터(mockData)"
    status: completed
  - id: phase-1-d
    content: "1단계 섹션 D: 일기 작성 폼 + 유효성 검사"
    status: completed
  - id: phase-1-e
    content: "1단계 섹션 E: 일기 상세 보기 + 404"
    status: completed
  - id: phase-1-f
    content: "1단계 섹션 F: 일기 수정 + 유효성 검사"
    status: completed
  - id: phase-1-g
    content: "1단계 섹션 G: 전체 플로우 점검"
    status: completed
  - id: phase-2-a
    content: "2단계 섹션 A: Supabase DB 셋업(MCP, vibe-tutorial, diaries 테이블·트리거)"
    status: completed
  - id: phase-2-b
    content: "2단계 섹션 B: Supabase 클라이언트 설정(브라우저·서버 유틸, 환경 변수)"
    status: completed
  - id: phase-2-c
    content: "2단계 섹션 C: 인증 구현(회원가입·로그인·로그아웃·미들웨어)"
    status: pending
  - id: phase-2-d
    content: "2단계 섹션 D: 일기 CRUD를 Supabase로 전환, mockData 삭제"
    status: pending
  - id: phase-2-e
    content: "2단계 섹션 E: 에러·로딩 UI + 전체 플로우 검증"
    status: pending
isProject: false
---

# 나만의 일기장 (My Diary) — 개발 계획서

> **참조 문서**: `spec.md` · `api-spec.md`
>
> **핵심 규칙**: 1단계(목업)가 **완전히** 끝나기 전에는 절대 2단계로 넘어가지 않는다.  
> 각 섹션을 완료할 때마다 **반드시 멈추고** 사용자에게 다음 진행 여부를 확인한다.

---

## 0단계 — 프로젝트 초기 셋업

> 목표: `frontend/` 폴더에 실행 가능한 Next.js 프로젝트 생성

- **0-1.** `frontend/` 폴더에 Next.js 프로젝트 생성 (`create-next-app`)
  - App Router, TypeScript, Tailwind CSS, ESLint 활성화
  - `src/` 디렉터리 사용 여부는 기본값(사용 안 함) 유지 → `app/` 이 루트에 위치
- **0-2.** 불필요한 보일러플레이트 정리
  - `app/page.tsx` 기본 내용 제거 → "My Diary" 제목만 표시
  - `app/globals.css` 에서 Tailwind 지시자(`@tailwind base/components/utilities`) 확인
- **0-3.** 폴더 구조 스캐폴딩 (빈 파일 생성)
  - `app/(auth)/login/page.tsx`
  - `app/(auth)/signup/page.tsx`
  - `app/(auth)/layout.tsx`
  - `app/(main)/diaries/page.tsx`
  - `app/(main)/diaries/new/page.tsx`
  - `app/(main)/diaries/[id]/page.tsx`
  - `app/(main)/diaries/[id]/edit/page.tsx`
  - `app/(main)/layout.tsx`
- **0-4.** 공통 타입 파일 생성
  - `types/diary.ts` → `Diary` 인터페이스, `Mood` 타입 정의
- **0-5.** Mock 데이터 파일 생성
  - `lib/mockData.ts` → `Diary[]` 샘플 3~5건 (다양한 mood 포함)
- **0-6.** 개발 서버 실행 확인
  - `npm run dev` → 브라우저에서 `localhost:3000` 접속 가능한지 확인

> **✅ 0단계 완료 → 사용자 확인 후 1단계 시작**

---

## 1단계 — 목업 (Mock Data 기반 UI)

> 목표: Supabase 연동 없이 `mockData.ts`의 하드코딩 데이터만 사용하여  
> **모든 화면을 클릭해서 전체 플로우를 확인**할 수 있는 수준으로 구현

### 섹션 A — 공통 레이아웃 & 랜딩

- **1-A-1.** 루트 레이아웃 (`app/layout.tsx`)
  - HTML `<html lang="ko">`, 기본 폰트, Tailwind 글로벌 스타일 적용
- **1-A-2.** Auth 그룹 레이아웃 (`app/(auth)/layout.tsx`)
  - 중앙 정렬 카드 형태의 래퍼 (로그인·회원가입 공용)
- **1-A-3.** Main 그룹 레이아웃 (`app/(main)/layout.tsx`)
  - 상단 네비게이션 바: 앱 이름("나만의 일기장"), 로그아웃 버튼
  - 로그아웃 버튼 클릭 → `/login`으로 이동 (목업이므로 단순 라우팅)
- **1-A-4.** 랜딩 페이지 (`app/page.tsx`)
  - 접속 시 `/diaries`로 리다이렉트 (목업에서는 무조건 리다이렉트)

> **✅ 섹션 A 완료 → 멈추고 사용자 확인**

### 섹션 B — 인증 화면 (로그인 · 회원가입)

- **1-B-1.** 로그인 페이지 (`app/(auth)/login/page.tsx`)
  - 이메일 입력 필드
  - 비밀번호 입력 필드
  - "로그인" 버튼 → 클릭 시 `/diaries`로 이동
  - "회원가입" 링크 → `/signup`으로 이동
- **1-B-2.** 회원가입 페이지 (`app/(auth)/signup/page.tsx`)
  - 이메일 입력 필드
  - 비밀번호 입력 필드
  - 비밀번호 확인 입력 필드
  - "회원가입" 버튼 → 클릭 시 `/login`으로 이동
  - "로그인" 링크 → `/login`으로 이동

> **✅ 섹션 B 완료 → 멈추고 사용자 확인**

### 섹션 C — 일기 목록 & 기분 필터

- **1-C-1.** 일기 목록 페이지 (`app/(main)/diaries/page.tsx`)
  - `mockData.ts`에서 데이터 import
  - `diary_date` 기준 내림차순 정렬하여 표시
  - 각 항목: 제목, 날짜, 기분 아이콘(이모지 또는 라벨)
  - 항목 클릭 → `/diaries/[id]`로 이동
  - "새 일기 쓰기" 버튼 → `/diaries/new`로 이동
- **1-C-2.** 기분 필터 UI
  - 5가지 기분 필터 버튼 (happy·sad·angry·anxious·neutral) + "전체" 버튼
  - 필터 선택 시 해당 mood의 일기만 표시 (클라이언트 필터링)
  - 선택된 필터에 시각적 활성 상태 표시

> **✅ 섹션 C 완료 → 멈추고 사용자 확인**

### 섹션 D — 일기 작성 폼

- **1-D-1.** 일기 작성 페이지 (`app/(main)/diaries/new/page.tsx`)
  - 제목 입력 필드 (필수)
  - 본문 텍스트 영역 (필수)
  - 날짜 선택 (기본값: 오늘)
  - 기분 선택 UI — 5가지 옵션 중 택 1 (필수)
  - "저장" 버튼 → 클릭 시 mockData의 첫 번째 항목 상세(`/diaries/[id]`)로 이동
  - "취소" 버튼 → `/diaries`로 이동
- **1-D-2.** 폼 유효성 검사
  - 제목·본문·기분이 비어 있으면 저장 불가
  - 빈 필드에 에러 메시지 표시

> **✅ 섹션 D 완료 → 멈추고 사용자 확인**

### 섹션 E — 일기 상세 보기

- **1-E-1.** 일기 상세 페이지 (`app/(main)/diaries/[id]/page.tsx`)
  - URL의 `id` 파라미터로 `mockData.ts`에서 해당 일기 찾기
  - 제목, 본문, 날짜, 기분 표시
  - "수정" 버튼 → `/diaries/[id]/edit`으로 이동
  - "삭제" 버튼 → 확인 다이얼로그 표시 후 `/diaries`로 이동
  - 목록으로 돌아가기 링크
- **1-E-2.** 404 처리
  - `mockData.ts`에 없는 id로 접근 시 "일기를 찾을 수 없습니다" 메시지 표시

> **✅ 섹션 E 완료 → 멈추고 사용자 확인**

### 섹션 F — 일기 수정

- **1-F-1.** 일기 수정 페이지 (`app/(main)/diaries/[id]/edit/page.tsx`)
  - URL의 `id`로 `mockData.ts`에서 기존 데이터 로드
  - 제목·본문·날짜·기분 필드에 기존 값 채워 놓기
  - "저장" 버튼 → 클릭 시 `/diaries/[id]` 상세로 이동
  - "취소" 버튼 → `/diaries/[id]` 상세로 이동
- **1-F-2.** 폼 유효성 검사
  - 작성 폼과 동일한 유효성 검사 적용

> **✅ 섹션 F 완료 → 멈추고 사용자 확인**

### 1단계 최종 점검

- **1-G-1.** 전체 플로우 확인
  - 랜딩 → 로그인 → 목록 → 새 일기 → 상세 → 수정 → 삭제 → 목록 흐름이 끊김 없이 동작
  - 로그아웃 → 로그인 화면 복귀
  - 기분 필터 동작 확인

> **✅ 1단계 전체 완료 → 사용자 최종 확인 후에만 2단계 진행**

---

## ⛔ 게이트: 1단계 완료 확인

> **1단계의 모든 섹션(A~G)이 완료되고 사용자가 승인하기 전까지 2단계를 시작하지 않는다.**

---

## 2단계 — 실제 구현 (Supabase 연동)

> 목표: `mockData.ts`를 제거하고 Supabase API 호출로 교체  
> Supabase 작업은 **Supabase MCP**를 사용한다.  
> Supabase 프로젝트 이름: **vibe-tutorial**

### 섹션 A — Supabase 프로젝트 & DB 셋업

- **2-A-1.** Supabase MCP를 통해 프로젝트(`vibe-tutorial`) 연결 확인
- **2-A-2.** `diaries` 테이블 생성 (Supabase MCP → SQL 실행)
  - `id` uuid PK (gen_random_uuid)
  - `user_id` uuid NOT NULL, FK → auth.users.id ON DELETE CASCADE
  - `title` text NOT NULL
  - `content` text NOT NULL
  - `diary_date` date NOT NULL
  - `mood` text NOT NULL, CHECK (mood IN ('happy','sad','angry','anxious','neutral'))
  - `created_at` timestamptz default now()
  - `updated_at` timestamptz default now()
- **2-A-3.** `updated_at` 자동 갱신 트리거 생성
- **2-A-4.** 테이블 생성 결과 확인 (Supabase MCP로 조회)

> **✅ 섹션 A 완료 → 멈추고 사용자 확인**

### 섹션 B — Supabase 클라이언트 설정

- **2-B-1.** `@supabase/supabase-js` 패키지 설치
- **2-B-2.** 환경 변수 파일 구성
  - `frontend/.env.local` → `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` 플레이스홀더 안내
- **2-B-3.** Supabase 브라우저 클라이언트 유틸 생성
  - `lib/supabase/client.ts` → `createBrowserClient()` (클라이언트 컴포넌트용)
- **2-B-4.** Supabase 서버 클라이언트 유틸 생성
  - `lib/supabase/server.ts` → `createServerClient()` (서버 컴포넌트·Server Action용)
- **2-B-5.** Supabase 타입 생성 (선택)
  - DB 스키마 기반 TypeScript 타입 (`types/supabase.ts`) 또는 기존 `Diary` 타입 유지

> **✅ 섹션 B 완료 → 멈추고 사용자 확인**

### 섹션 C — 인증 구현

- **2-C-1.** 회원가입 기능 연동
  - `/signup` → `supabase.auth.signUp({ email, password })` 호출
  - 성공 시 `/login`으로 이동, 실패 시 에러 메시지 표시
- **2-C-2.** 로그인 기능 연동
  - `/login` → `supabase.auth.signInWithPassword({ email, password })` 호출
  - 성공 시 `/diaries`로 리다이렉트, 실패 시 에러 메시지 표시
- **2-C-3.** 로그아웃 기능 연동
  - 네비게이션 바 로그아웃 버튼 → `supabase.auth.signOut()` 호출
  - 세션 제거 후 `/login`으로 이동
- **2-C-4.** 미들웨어로 인증 보호
  - `middleware.ts` → 비로그인 상태에서 `(main)` 그룹 접근 시 `/login` 리다이렉트
  - 로그인 상태에서 `(auth)` 그룹 접근 시 `/diaries` 리다이렉트
- **2-C-5.** 랜딩 페이지 분기
  - `app/page.tsx` → 로그인 여부에 따라 `/diaries` 또는 `/login`으로 리다이렉트

> **✅ 섹션 C 완료 → 멈추고 사용자 확인**

### 섹션 D — 일기 CRUD 구현

- **2-D-1.** 일기 생성 (CREATE)
  - `/diaries/new` 폼 제출 → `supabase.from("diaries").insert(...)` 호출
  - `user_id`는 서버에서 `auth.uid()`로 자동 세팅
  - 성공 시 `/diaries/[id]`로 이동
- **2-D-2.** 일기 목록 조회 (READ — List)
  - `/diaries` → `supabase.from("diaries").select("id, title, diary_date, mood").eq("user_id", uid).order("diary_date", { ascending: false })`
  - `mockData.ts` import 제거
- **2-D-3.** 기분 필터 연동
  - 쿼리 파라미터 `?mood=happy` 등으로 서버 사이드 필터링
  - `.eq("mood", mood)` 조건 추가
- **2-D-4.** 일기 상세 조회 (READ — Detail)
  - `/diaries/[id]` → `supabase.from("diaries").select("*").eq("id", id).eq("user_id", uid).single()`
  - 데이터가 null이면 notFound() 호출
- **2-D-5.** 일기 수정 (UPDATE)
  - `/diaries/[id]/edit` 폼 제출 → `supabase.from("diaries").update(...).eq("id", id).eq("user_id", uid)`
  - 성공 시 `/diaries/[id]`로 이동
- **2-D-6.** 일기 삭제 (DELETE)
  - 상세 페이지 삭제 버튼 → `supabase.from("diaries").delete().eq("id", id).eq("user_id", uid)`
  - 성공 시 `/diaries`로 이동
- **2-D-7.** `mockData.ts` 파일 삭제
  - 모든 페이지에서 mock import가 없는지 최종 확인 후 삭제

> **✅ 섹션 D 완료 → 멈추고 사용자 확인**

### 섹션 E — 에러 처리 & 마무리

- **2-E-1.** 에러 UI 구현
  - `app/error.tsx` — 전역 에러 바운더리
  - `app/not-found.tsx` — 404 페이지
- **2-E-2.** 로딩 UI 구현
  - `app/(main)/diaries/loading.tsx` — 목록 로딩 스켈레톤 또는 스피너
  - `app/(main)/diaries/[id]/loading.tsx` — 상세 로딩
- **2-E-3.** 전체 플로우 검증
  - 회원가입 → 로그인 → 일기 작성 → 목록 확인 → 상세 → 수정 → 삭제 → 로그아웃
  - 기분 필터 동작 확인
  - 비로그인 접근 차단 확인

> **✅ 섹션 E 완료 → 2단계 전체 완료**
