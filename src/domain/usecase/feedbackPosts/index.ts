import { UseCaseParams } from '@/domain/usecase/types';
import {buildCreateFeedbackPost, CreateFeedbackPost} from '@/domain/usecase/feedbackPosts/create';
import {buildUpdateFeedbackPost, UpdateFeedbackPost} from '@/domain/usecase/feedbackPosts/update';
import {buildGetAllFeedbackPost, FeedbackAll} from '@/domain/usecase/feedbackPosts/readAll';
import {buildGetByIdFeedbackPost, Feedback} from '@/domain/usecase/feedbackPosts/readById';
import {buildDeleteFeedbackPost, FeedbackDelete} from '@/domain/usecase/feedbackPosts/delete';
import {buildUpvoteFeedbackPost, UpvoteFeedbackPost} from '@/domain/usecase/feedbackPosts/upvote';
import {buildGetAllCategories, CategoryAll} from '@/domain/usecase/feedbackPosts/getCategories';
import {buildGetAllStatuses, StatusAll} from '@/domain/usecase/feedbackPosts/getStatuses';

export type FeedbackUseCase = {
  create: CreateFeedbackPost;
  update: UpdateFeedbackPost;
  readAll: FeedbackAll;
  readById: Feedback;
  deleteFeedback: FeedbackDelete;
  upvote: UpvoteFeedbackPost;
  readCategories: CategoryAll;
  readStatuses: StatusAll;
}

export const buildFeedbackUseCase = (params: UseCaseParams): FeedbackUseCase => {
  const create = buildCreateFeedbackPost(params);
  const update = buildUpdateFeedbackPost(params);
  const deleteFeedback = buildDeleteFeedbackPost(params);
  const readAll = buildGetAllFeedbackPost(params);
  const readById = buildGetByIdFeedbackPost(params);
  const upvote = buildUpvoteFeedbackPost(params);
  const readCategories = buildGetAllCategories(params);
  const readStatuses = buildGetAllStatuses(params);

  return {
    create,
    deleteFeedback,
    readAll,
    update,
    readById,
    upvote,
    readCategories,
    readStatuses,
  }
}
