import {Prisma} from '@prisma/client';
import {IStatus} from '@/domain/entity/feedbackPost';
import {AdapterParams} from '@/adapter/types';

type Params = Pick<AdapterParams, 'db'>

export type GetStatuses = (params:Prisma.StatusFindManyArgs)=>Promise<Array<IStatus> | null | never>
export const buildGetStatuses = ({db}: Params): GetStatuses =>{
  return async (getParams )=> {
    return db.client.status.findMany(getParams);
  }
}