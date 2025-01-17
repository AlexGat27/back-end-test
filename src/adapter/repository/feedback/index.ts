import { AdapterParams } from '@/adapter/types';
import { buildDelete, DeleteFeedback } from './delete';
import { buildUpdate, UpdateFeedback } from './update';
import { ListFeedback, buildList } from './list';
import { buildCreate, CreateFeedback} from './create'
import { buildGet, GetFeedback} from './get'
import {buildUpvote, UpvoteFeedback} from '@/adapter/repository/feedback/upvote';
import {buildGetCategories, GetCategories} from '@/adapter/repository/feedback/getCategories';
import {buildGetStatuses, GetStatuses} from '@/adapter/repository/feedback/getStatuses';

type Params = Pick<AdapterParams, 'db'>

export type FeedbackRepository = {
  create: CreateFeedback,
  delete: DeleteFeedback,
  get: GetFeedback,
  list: ListFeedback,
  update: UpdateFeedback,
  upvote: UpvoteFeedback,
  getCategories: GetCategories,
  getStatuses: GetStatuses,
}
export const buildFeedbackRepository = (params: Params): FeedbackRepository=>{
  const create = buildCreate(params)
  const deleteFeedback = buildDelete(params)
  const get = buildGet(params)
  const list = buildList(params)
  const update = buildUpdate(params)
  const upvote = buildUpvote(params)
  const getCategories = buildGetCategories(params)
  const getStatuses = buildGetStatuses(params)

  return {
    create,
    delete: deleteFeedback,
    get,
    list,
    update,
    upvote,
    getCategories,
    getStatuses
  }
}
