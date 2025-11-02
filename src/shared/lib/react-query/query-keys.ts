/**
 * Query Keys Factory
 *
 * 규칙:
 * 1. 계층적 구조로 관리 (all > lists > list, all > details > detail)
 * 2. 필터가 있는 경우 객체로 전달
 * 3. ID가 있는 경우 문자열로 전달
 */
export const queryKeys = {
  // Auth
  auth: {
    all: ['auth'] as const,
    user: () => [...queryKeys.auth.all, 'user'] as const,
    session: () => [...queryKeys.auth.all, 'session'] as const,
  },

  // Users
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.users.lists(), filters] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
  },

  // Posts
  posts: {
    all: ['posts'] as const,
    lists: () => [...queryKeys.posts.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.posts.lists(), filters] as const,
    details: () => [...queryKeys.posts.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.posts.details(), id] as const,
    infinite: (filters: Record<string, any>) => [...queryKeys.posts.all, 'infinite', filters] as const,
  },

  // Comments
  comments: {
    all: ['comments'] as const,
    lists: () => [...queryKeys.comments.all, 'list'] as const,
    byPost: (postId: string) => [...queryKeys.comments.lists(), 'post', postId] as const,
    detail: (id: string) => [...queryKeys.comments.all, 'detail', id] as const,
  },
} as const;

/**
 * Query Key 사용 예시:
 *
 * // 모든 posts 무효화
 * queryClient.invalidateQueries({ queryKey: queryKeys.posts.all });
 *
 * // 특정 필터의 posts 무효화
 * queryClient.invalidateQueries({ queryKey: queryKeys.posts.lists() });
 *
 * // 특정 post 무효화
 * queryClient.invalidateQueries({ queryKey: queryKeys.posts.detail('123') });
 */
