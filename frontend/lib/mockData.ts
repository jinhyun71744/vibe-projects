import type { Diary } from "@/types/diary";

const MOCK_USER_ID = "00000000-0000-0000-0000-000000000001";

export const mockDiaries: Diary[] = [
  {
    id: "a1111111-1111-4111-8111-111111111111",
    user_id: MOCK_USER_ID,
    title: "새 학기 첫날",
    content: "오늘은 설레는 마음으로 학교에 갔다. 새 친구들을 만날 생각에 잠이 잘 안 왔다.",
    diary_date: "2025-03-20",
    mood: "happy",
    created_at: "2025-03-20T10:00:00.000Z",
    updated_at: "2025-03-20T10:00:00.000Z",
  },
  {
    id: "b2222222-2222-4222-8222-222222222222",
    user_id: MOCK_USER_ID,
    title: "비 오는 날",
    content: "하루 종일 비가 내려서 밖에 나가지 못했다. 창밖 풍경만 바라봤다.",
    diary_date: "2025-03-18",
    mood: "sad",
    created_at: "2025-03-18T14:30:00.000Z",
    updated_at: "2025-03-18T14:30:00.000Z",
  },
  {
    id: "c3333333-3333-4333-8333-333333333333",
    user_id: MOCK_USER_ID,
    title: "지하철에서",
    content: "출근길에 누가 발을 밟았다. 일부러 그런 것 같아서 화가 났다.",
    diary_date: "2025-03-15",
    mood: "angry",
    created_at: "2025-03-15T08:15:00.000Z",
    updated_at: "2025-03-15T08:15:00.000Z",
  },
  {
    id: "d4444444-4444-4444-8444-444444444444",
    user_id: MOCK_USER_ID,
    title: "면접 전날",
    content: "내일이 중요한 면접이라 잠이 오지 않는다. 준비는 했는데 자꾸 걱정된다.",
    diary_date: "2025-03-12",
    mood: "anxious",
    created_at: "2025-03-12T23:00:00.000Z",
    updated_at: "2025-03-12T23:00:00.000Z",
  },
  {
    id: "e5555555-5555-4555-8555-555555555555",
    user_id: MOCK_USER_ID,
    title: "평범한 하루",
    content: "특별한 일은 없었다. 루틴대로 하루를 보냈다.",
    diary_date: "2025-03-10",
    mood: "neutral",
    created_at: "2025-03-10T21:00:00.000Z",
    updated_at: "2025-03-10T21:00:00.000Z",
  },
];
