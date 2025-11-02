import { UseQueryOptions } from '@tanstack/react-query';

/**
 * 자주 사용하는 query options 프리셋
 */
export const queryOptions = {
  // 실시간 데이터 (대시보드, 알림 등)
  realtime: {
    staleTime: 0,
    gcTime: 1000 * 60, // 1분
    refetchInterval: 5000, // 5초마다 refetch
    refetchOnWindowFocus: true,
  },

  // 정적 데이터 (사용자 프로필, 설정 등)
  static: {
    staleTime: 1000 * 60 * 60, // 1시간
    gcTime: 1000 * 60 * 60 * 24, // 24시간
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  },

  // 일반 데이터
  normal: {
    staleTime: 1000 * 60, // 1분
    gcTime: 1000 * 60 * 5, // 5분
  },

  // 무한 스크롤
  infinite: {
    staleTime: 1000 * 30, // 30초
    gcTime: 1000 * 60 * 5, // 5분
    refetchOnWindowFocus: false,
  },
} satisfies Record<string, Partial<UseQueryOptions>>;
