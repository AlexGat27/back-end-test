import { AdapterParams, UnknownTx } from '@/adapter/types';
import { IFeedbackPost } from '@/domain/entity/feedbackPost';

type Params = Pick<AdapterParams, 'db'>;

export type UpdateFeedback = (
  data: {
    id: number;
    title?: string;
    description?: string;
    categoryName?: string;
    statusName?: string;
    authorId: number;
  },
  tx?: UnknownTx
) => Promise<IFeedbackPost | never>;

export const buildUpdate = ({ db }: Params): UpdateFeedback => {
  return async ({ id, title, description, categoryName, statusName, authorId }, tx) => {
    const client = db.getContextClient(tx);

    // Найти существующий пост
    const existingPost = await client.feedbackPost.findUnique({
      where: { id },
    });

    if (!existingPost) {
      throw new Error(`Feedback post with ID ${id} not found`);
    }
    if (existingPost.authorId !== authorId){
      throw new Error('You can not update this post');
    }

    // Найти связанные сущности, если переданы текстовые значения
    let categoryId = existingPost.categoryId;
    let statusId = existingPost.statusId;

    if (categoryName) {
      const category = await client.category.findUnique({
        where: { name: categoryName },
      });
      if (!category) throw new Error(`Category with name "${categoryName}" not found`);
      categoryId = category.id;
    }

    if (statusName) {
      const status = await client.status.findUnique({
        where: { name: statusName },
      });
      if (!status) throw new Error(`Status with name "${statusName}" not found`);
      statusId = status.id;
    }

    // Обновить запись в базе данных
    const updatedFeedback = await client.feedbackPost.update({
      where: { id },
      data: {
        title: title ?? existingPost.title,
        description: description ?? existingPost.description,
        categoryId,
        statusId,
      },
      include: {
        category: { select: { name: true } },
        status: { select: { name: true } },
        author: { select: { email: true } },
      },
    });

    // Привести результат к интерфейсу IFeedbackPost
    return {
      id: updatedFeedback.id,
      title: updatedFeedback.title,
      description: updatedFeedback.description,
      categoryName: updatedFeedback.category.name,
      statusName: updatedFeedback.status.name,
      authorEmail: updatedFeedback.author.email,
      createdAt: updatedFeedback.createdAt,
      updatedAt: updatedFeedback.updatedAt,
    } as IFeedbackPost;
  };
};
