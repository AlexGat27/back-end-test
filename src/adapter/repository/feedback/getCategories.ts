import {AdapterParams} from '@/adapter/types';
import {Prisma} from '@prisma/client'
import {ICategory} from '@/domain/entity/feedbackPost';

type Params = Pick<AdapterParams, 'db'>

export type GetCategories = (params:Prisma.CategoryFindManyArgs)=>Promise<Array<ICategory> | null | never>
export const buildGetCategories = ({db}: Params): GetCategories =>{
  return async (getParams )=> {
    return db.client.category.findMany(getParams);
  }
}
