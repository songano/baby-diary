import { authRepository, AuthRepository } from './auth.repository';
import { CheckNicknameDto, CheckNicknameResponseDto, checkNicknameSchema } from './dto/check-nickname.dto';

export class AuthService {
  constructor(private readonly repository: AuthRepository) {}

  async checkNicknameAvailable(dto: CheckNicknameDto): Promise<CheckNicknameResponseDto> {
    const validated = checkNicknameSchema.parse(dto);
    const normalizedNickname = validated.nickname.toLowerCase();

    const exists = await this.repository.existsByNickname(normalizedNickname);

    return {
      available: !exists,
      nickname: normalizedNickname,
    };
  }
}

export const authService = new AuthService(authRepository);
