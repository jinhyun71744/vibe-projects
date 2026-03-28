/**
 * ILIKE 패턴에 삽입할 사용자 입력 조각 이스케이프(PostgreSQL 기본 이스케이프 문자 `\`).
 */
export function escapeIlikeContainsLiteral(fragment: string): string {
  return fragment.replace(/\\/g, "\\\\").replace(/%/g, "\\%").replace(/_/g, "\\_");
}

/**
 * PostgREST `or` 조건 값에 쓸 때 따옴표·백슬래시 이스케이프.
 * @see https://postgrest.org/en/stable/references/api/tables_views.html
 */
export function quotePostgrestOrFilterValue(value: string): string {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

/** `title` 또는 `content`에 부분 일치(대소문자 무시)하는 `or` 필터 문자열. */
export function diaryTitleContentSearchOrFilter(trimmedQuery: string): string {
  const literal = escapeIlikeContainsLiteral(trimmedQuery);
  const pattern = `%${literal}%`;
  const quoted = quotePostgrestOrFilterValue(pattern);
  return `title.ilike.${quoted},content.ilike.${quoted}`;
}
