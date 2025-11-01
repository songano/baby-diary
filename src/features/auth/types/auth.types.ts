export interface CheckNicknameRequest {
  nickname: string;
}

export interface CheckNicknameResponse {
  available: boolean;
  message: string;
}
