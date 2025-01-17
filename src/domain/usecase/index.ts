import { AuthUseCase, buildAuthUseCase } from './auth';
import { buildExampleUseCase, ExampleUseCase } from './example'
import { UseCaseParams } from './types';
import {buildFeedbackUseCase, FeedbackUseCase} from '@/domain/usecase/feedbackPosts';

export type UseCase = {
  auth: AuthUseCase;
  feedback: FeedbackUseCase;
  example: ExampleUseCase;
}

export const buildUseCase = (params: UseCaseParams): UseCase => {
  const auth = buildAuthUseCase(params);
  const example = buildExampleUseCase(params);
  const feedback = buildFeedbackUseCase(params);

  return {
    auth,
    example,
    feedback
  }
}
