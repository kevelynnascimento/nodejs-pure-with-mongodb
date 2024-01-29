import { v4 as uuidv4 } from 'uuid';
import { ProfileEntity } from '../entities/profile.entity';
import { inject, injectable } from 'inversify';
import { IProfileGettingAllRequest } from '../dtos/profile/requests/profile-getting-all.request';
import { IProfileCreationRequest } from '../dtos/profile/requests/profile-creation.request';
import { IProfileCreationResponse } from '../dtos/profile/responses/profile-creation.response';
import { IProfileGettingAllResponse } from '../dtos/profile/responses/profile-getting-all.response';
import { IProfileGettingByIdResponse } from '../dtos/profile/responses/profile-getting-by-id.response';
import { ProfileRepository } from '../../infrastructure/repositories/profile.repository';

@injectable()
export class ProfileService {
  constructor(
    @inject(ProfileRepository)
    private readonly profileRepository: ProfileRepository,
  ) {}

  public async create(
    request: IProfileCreationRequest,
  ): Promise<IProfileCreationResponse> {
    const {
      name,
      description,
      mbti,
      enneagram,
      variant,
      tritype,
      socionics,
      sloan,
      psyche,
      image,
    } = request;

    const profile = {
      id: uuidv4(),
      name,
      description,
      mbti,
      enneagram,
      variant,
      tritype,
      socionics,
      sloan,
      psyche,
      image,
    } as ProfileEntity;

    const newProfile = await this.profileRepository.create(profile);

    const response = {
      id: newProfile.id,
      name: newProfile.name,
    };

    return response;
  }

  public async getAll(
    request: IProfileGettingAllRequest,
  ): Promise<IProfileGettingAllResponse[]> {
    const profiles = await this.profileRepository.getAll(request);

    const response = profiles.map(
      ({
        id,
        name,
        description,
        mbti,
        enneagram,
        variant,
        tritype,
        socionics,
        sloan,
        psyche,
        image,
      }) => ({
        id,
        name,
        description,
        mbti,
        enneagram,
        variant,
        tritype,
        socionics,
        sloan,
        psyche,
        image,
      }),
    );

    return response;
  }

  public async getById(id: string): Promise<IProfileGettingByIdResponse> {
    const profile = await this.profileRepository.getById(id);

    if (!profile) return null;

    const { name } = profile;

    const response = {
      id,
      name,
    };

    return response;
  }
}
