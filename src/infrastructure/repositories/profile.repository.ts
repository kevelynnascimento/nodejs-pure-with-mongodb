import { injectable } from 'inversify';
import { ProfileEntity } from '../../domain/entities/profile.entity';
import { ProfileModel } from '../schemas/profile.schema';
import { IProfileGettingAllRequest } from '../../domain/dtos/profile/requests/profile-getting-all.request';

@injectable()
export class ProfileRepository {
  public async create(profile: ProfileEntity): Promise<ProfileEntity> {
    const newProfile = await ProfileModel.create(profile);
    return newProfile;
  }

  public async getAll(
    request: IProfileGettingAllRequest,
  ): Promise<ProfileEntity[]> {
    const { page, limit } = request;

    const pageParam = +page ?? 0;
    const limitParam = +limit ?? 10;

    const profiles = await ProfileModel.find()
      .skip(pageParam * limitParam)
      .limit(limitParam);

    return profiles;
  }

  public async getById(id: string): Promise<ProfileEntity> {
    const profile = await ProfileModel.findOne({ id: id });
    return profile;
  }
}
