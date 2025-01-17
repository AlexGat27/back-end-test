import { AdapterParams, UnknownTx } from '@/adapter/types';
import { IFeedbackPost } from '@/domain/entity/feedbackPost';

type Params = Pick<AdapterParams, 'db'>;

export type CreateFeedback = (
    data: {
      title: string;
      description: string;
      categoryName: string;
      statusName: string;
      authorId: number;
    },
    tx?: UnknownTx
) => Promise<IFeedbackPost | never>;

export const buildCreate = ({ db }: Params): CreateFeedback => {
  return async ({ title, description, categoryName, statusName, authorId }, tx) => {
    const client = db.getContextClient(tx);

    // Найти связанные сущности по текстовым значениям
    let category = await client.category.findUnique({
      where: { name: categoryName },
    });
    let status = await client.status.findUnique({
      where: { name: statusName },
    });

    if (!category) {
      category = await client.category.create({
        data: {
          name: categoryName,
        }
      })
    }
    if (!status) {
      status = await client.status.create({
        data: {
          name: statusName,
        }
      })
    }

    // Создать запись с найденными ID
    const feedback = await client.feedbackPost.create({
      data: {
        title,
        description,
        categoryId: category.id,
        statusId: status.id,
        authorId: authorId,
      },
      include: {
        category: { select: { name: true } },
        status: { select: { name: true } },
        author: { select: { email: true } },
      },
    });

    // Привести результат к IFeedbackPost
    return {
      id: feedback.id,
      title: feedback.title,
      description: feedback.description,
      categoryName: feedback.category.name,
      statusName: feedback.status.name,
      authorEmail: feedback.author.email,
      createdAt: feedback.createdAt,
      updatedAt: feedback.updatedAt,
    } as IFeedbackPost;
  };
};
