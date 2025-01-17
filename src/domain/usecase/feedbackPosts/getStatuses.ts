import { UseCaseParams } from '../types';
import {IStatus} from '@/domain/entity/feedbackPost';

type Params = UseCaseParams;

export type StatusAll = () => Promise<Array<IStatus> | null>;

export const buildGetAllStatuses = ({ adapter }: Params): StatusAll => (
  async () => {
    return await adapter.feedbackRepository.getStatuses({});
  }
);