# 나만의 일기장 (My Diary) — API 명세서

> `spec.md`를 기반으로, 프론트엔드(브라우저)와 백엔드(Supabase) 사이에  
> **어떤 데이터를 주고받는지** 정리한 문서이다.

---

## 데이터 흐름 한눈에 보기

```
브라우저(React)  ──▶  Server Action / 서버 컴포넌트  ──▶  Supabase
                      (Next.js 서버)                    (DB · Auth)
```

- **인증(Auth)** → Supabase Auth SDK 호출
- **일기 CRUD** → Supabase JS 클라이언트로 `diaries` 테이블 쿼리

---

## 1. 인증 (Auth)

### 1-1. 회원가입

| 항목 | 내용 |
|------|------|
| 페이지 | `/signup` |
| 방향 | 프론트 → Supabase Auth |
| 함수 | `supabase.auth.signUp()` |

**보내는 데이터 (Request)**

```json
{
  "email": "user@example.com",
  "password": "myPassword123!"
}
```

**받는 데이터 (Response) — 성공**

```json
{
  "user": {
    "id": "a1b2c3d4-...",
    "email": "user@example.com"
  },
  "session": {
    "access_token": "eyJhbGciOi...",
    "refresh_token": "v1.MQ..."
  }
}
```

**받는 데이터 (Response) — 실패 예시**

```json
{
  "error": {
    "message": "User already registered"
  }
}
```

---

### 1-2. 로그인

| 항목 | 내용 |
|------|------|
| 페이지 | `/login` |
| 방향 | 프론트 → Supabase Auth |
| 함수 | `supabase.auth.signInWithPassword()` |

**보내는 데이터**

```json
{
  "email": "user@example.com",
  "password": "myPassword123!"
}
```

**받는 데이터 — 성공**

```json
{
  "user": {
    "id": "a1b2c3d4-...",
    "email": "user@example.com"
  },
  "session": {
    "access_token": "eyJhbGciOi...",
    "refresh_token": "v1.MQ..."
  }
}
```

> 성공 시 `/diaries`로 리다이렉트한다.

**받는 데이터 — 실패 예시**

```json
{
  "error": {
    "message": "Invalid login credentials"
  }
}
```

---

### 1-3. 로그아웃

| 항목 | 내용 |
|------|------|
| 방향 | 프론트 → Supabase Auth |
| 함수 | `supabase.auth.signOut()` |

**보내는 데이터**: 없음 (현재 세션 기반으로 자동 처리)

**결과**: 세션 제거 후 `/login`으로 리다이렉트

---

## 2. 일기 CRUD

### 공통 타입 — Diary

```typescript
interface Diary {
  id: string;           // uuid
  user_id: string;      // uuid — 작성자
  title: string;        // 제목
  content: string;      // 본문
  diary_date: string;   // "2026-03-27" 형식
  mood: "happy" | "sad" | "angry" | "anxious" | "neutral";
  created_at: string;   // ISO 8601
  updated_at: string;   // ISO 8601
}
```

---

### 2-1. 일기 생성 (CREATE)

| 항목 | 내용 |
|------|------|
| 페이지 | `/diaries/new` |
| 방향 | 프론트 → Supabase DB |
| 쿼리 | `supabase.from("diaries").insert(...)` |

**보내는 데이터**

```json
{
  "title": "봄 나들이",
  "content": "오늘 벚꽃이 활짝 피었다. 공원에서 도시락도 먹었다.",
  "diary_date": "2026-03-27",
  "mood": "happy"
}
```

> `user_id`는 서버에서 로그인 세션(`auth.uid()`)으로 자동 채운다.  
> `id`, `created_at`, `updated_at`은 DB 기본값으로 생성된다.

**받는 데이터 — 성공**

```json
{
  "id": "f7e6d5c4-...",
  "user_id": "a1b2c3d4-...",
  "title": "봄 나들이",
  "content": "오늘 벚꽃이 활짝 피었다. 공원에서 도시락도 먹었다.",
  "diary_date": "2026-03-27",
  "mood": "happy",
  "created_at": "2026-03-27T09:30:00.000Z",
  "updated_at": "2026-03-27T09:30:00.000Z"
}
```

> 성공 시 `/diaries/f7e6d5c4-...` (상세 페이지)로 이동한다.

---

### 2-2. 일기 목록 조회 (READ — List)

| 항목 | 내용 |
|------|------|
| 페이지 | `/diaries` |
| 방향 | Supabase DB → 프론트 |
| 쿼리 | `supabase.from("diaries").select("id, title, diary_date, mood").eq("user_id", uid).order("diary_date", { ascending: false })` |

**보내는 데이터 (쿼리 파라미터)**

| 파라미터 | 필수 | 설명 | 예시 |
|----------|------|------|------|
| `mood` | 아니오 | 기분 필터 | `?mood=happy` |

> 기분 필터가 있으면 `.eq("mood", mood)` 조건을 추가한다.

**받는 데이터 — 성공**

```json
[
  {
    "id": "f7e6d5c4-...",
    "title": "봄 나들이",
    "diary_date": "2026-03-27",
    "mood": "happy"
  },
  {
    "id": "b8a9c0d1-...",
    "title": "비 오는 날",
    "diary_date": "2026-03-25",
    "mood": "sad"
  }
]
```

> 목록에서는 `content`(본문)를 가져오지 않는다 — 필요한 컬럼만 선택해서 가볍게 불러온다.

---

### 2-3. 일기 상세 조회 (READ — Detail)

| 항목 | 내용 |
|------|------|
| 페이지 | `/diaries/[id]` |
| 방향 | Supabase DB → 프론트 |
| 쿼리 | `supabase.from("diaries").select("*").eq("id", id).eq("user_id", uid).single()` |

**받는 데이터 — 성공**

```json
{
  "id": "f7e6d5c4-...",
  "user_id": "a1b2c3d4-...",
  "title": "봄 나들이",
  "content": "오늘 벚꽃이 활짝 피었다. 공원에서 도시락도 먹었다.",
  "diary_date": "2026-03-27",
  "mood": "happy",
  "created_at": "2026-03-27T09:30:00.000Z",
  "updated_at": "2026-03-27T09:30:00.000Z"
}
```

**받는 데이터 — 실패 (본인 일기가 아니거나 없는 경우)**

```json
{
  "data": null,
  "error": null
}
```

> 데이터가 `null`이면 404 페이지를 보여준다.

---

### 2-4. 일기 수정 (UPDATE)

| 항목 | 내용 |
|------|------|
| 페이지 | `/diaries/[id]/edit` |
| 방향 | 프론트 → Supabase DB |
| 쿼리 | `supabase.from("diaries").update(...).eq("id", id).eq("user_id", uid)` |

**보내는 데이터** — 변경할 필드만 보낸다

```json
{
  "title": "봄 나들이 (수정)",
  "content": "오늘 벚꽃이 활짝 피었다. 공원에서 도시락도 먹고, 자전거도 탔다!",
  "diary_date": "2026-03-27",
  "mood": "happy"
}
```

> `updated_at`은 DB 트리거 또는 애플리케이션에서 `new Date().toISOString()`으로 함께 갱신한다.

**받는 데이터 — 성공**

```json
{
  "id": "f7e6d5c4-...",
  "user_id": "a1b2c3d4-...",
  "title": "봄 나들이 (수정)",
  "content": "오늘 벚꽃이 활짝 피었다. 공원에서 도시락도 먹고, 자전거도 탔다!",
  "diary_date": "2026-03-27",
  "mood": "happy",
  "created_at": "2026-03-27T09:30:00.000Z",
  "updated_at": "2026-03-27T10:15:00.000Z"
}
```

---

### 2-5. 일기 삭제 (DELETE)

| 항목 | 내용 |
|------|------|
| 페이지 | `/diaries/[id]` (상세 페이지의 삭제 버튼) |
| 방향 | 프론트 → Supabase DB |
| 쿼리 | `supabase.from("diaries").delete().eq("id", id).eq("user_id", uid)` |

**보내는 데이터**: 없음 (URL의 `id`만 사용)

**결과**: 삭제 성공 시 `/diaries` (목록)로 리다이렉트

---

## 3. 에러 처리 요약

모든 Supabase 호출은 `{ data, error }` 형태로 응답한다.

| 상황 | `data` | `error` | 프론트 처리 |
|------|--------|---------|-------------|
| 성공 | 결과 객체/배열 | `null` | 정상 렌더링 |
| 인증 실패 | `null` | `{ message: "..." }` | 에러 메시지 표시 |
| 데이터 없음 | `null` | `null` | 404 페이지 |
| 서버 오류 | `null` | `{ message: "..." }` | "잠시 후 다시 시도" 안내 |

---

## 4. 기분(mood) 값 참조

| 값 | 라벨 | 용도 |
|------|------|------|
| `happy` | 행복 | 작성·수정 폼, 필터, 목록 아이콘 |
| `sad` | 슬픔 | 〃 |
| `angry` | 화남 | 〃 |
| `anxious` | 불안 | 〃 |
| `neutral` | 보통 | 〃 |

> 프론트에서 이 5개 값을 상수로 관리하면 폼의 선택 UI와 필터를 일관되게 유지할 수 있다.
