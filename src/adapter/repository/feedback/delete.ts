import {AdapterParams, UnknownTx} from '@/adapter/types';
import {IFeedbackPost} from '@/domain/entity/feedbackPost';

type Params = Pick<AdapterParams, 'db'>

export type DeleteFeedback = (data: {authorId: number, id: number}, tx?: UnknownTx)=>Promise<IFeedbackPost | never>

export const buildDelete = ({db}: Params): DeleteFeedback=>{
  return async ({authorId, id}, tx)=>{
    const client = db.getContextClient(tx);

    const existingPost = await client.feedbackPost.findUnique({
      where: { id },
    });

    if (!existingPost) {
      throw new Error(`Feedback post with ID ${id} not found`);
    }
    if (existingPost.authorId !== authorId){
      throw new Error('You can not delete this post');
    }

    return await db.getContextClient(tx).feedbackPost.delete({
      where:{
        id
      },
      include: {
        category: {
          select: { name: true },
        },
        status: {
          select: { name: true },
        },
        author: {
          select: { email: true },
        },
      }
    }) as IFeedbackPost
  }
}
