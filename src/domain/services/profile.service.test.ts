import 'reflect-metadata';
import { faker } from '@faker-js/faker';
import { ProfileService } from './profile.service';
import { ProfileModel } from '../../infrastructure/schemas/profile.schema';

jest.mock('../../infrastructure/schemas/profile.schema');

describe('ProfileService', () => {
  let profileService: ProfileService;

  beforeEach(() => {
    jest.clearAllMocks();

    profileService = new ProfileService();
  });

  describe('create', () => {
    it('should create a new profile', async () => {
      const request = {
        name: faker.string.alpha(),
        description: faker.string.alpha(),
        mbti: faker.string.alpha(),
        enneagram: faker.string.alpha(),
        variant: faker.string.alpha(),
        tritype: faker.number.int(),
        socionics: faker.string.alpha(),
        sloan: faker.string.alpha(),
        psyche: faker.string.alpha(),
        image: faker.string.alpha(),
      };

      const newProfile = {
        id: faker.string.uuid(),
        ...request,
      };

      (ProfileModel.create as jest.Mock).mockResolvedValueOnce(newProfile);

      const output = await profileService.create(request);

      expect(output).toEqual({
        id: output.id,
        name: output.name,
      });

      expect(ProfileModel.create as jest.Mock).toHaveBeenCalled();
    });
  });
});
