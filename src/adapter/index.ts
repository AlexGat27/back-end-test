import { buildExampleGateway, ExampleGateway } from './gateway/example';
import { buildUserRepository, UserRepository } from './repository/user';
import { AdapterParams } from './types';
import {buildFeedbackRepository, FeedbackRepository} from '@/adapter/repository/feedback';

export type Adapter = {
  feedbackRepository: FeedbackRepository;
  userRepository: UserRepository;
  exampleGateway: ExampleGateway;
}

export const buildAdapter = (params: AdapterParams): Adapter => {
  const userRepository = buildUserRepository(params);
  const feedbackRepository = buildFeedbackRepository(params);
  const exampleGateway = buildExampleGateway(params);

  return {
    feedbackRepository,
    userRepository,
    exampleGateway
  }
}
