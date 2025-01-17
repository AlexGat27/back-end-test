import { UseCaseParams } from '../types';
import {ICategory} from '@/domain/entity/feedbackPost';

type Params = UseCaseParams;

export type CategoryAll = () => Promise<Array<ICategory> | null>;

export const buildGetAllCategories = ({ adapter }: Params): CategoryAll => (
  async () => {
    return await adapter.feedbackRepository.getCategories({});
  }
);