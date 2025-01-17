import {DeliveryParams} from '@/delivery/types';
import Express from 'express';
import {getMeRules} from '@/delivery/http/v1/handlers/auth/rules';
import {createRouteHandler} from '@/delivery/http/v1/routeHandler';
import {IHandler} from '@/delivery/http/v1/handlers/types';
import {buildGetFeedbackHandler, GetFeedback} from '@/delivery/http/v1/handlers/feedback/get';
import {buildGetFeedbackAllHandler, GetFeedbackAll} from '@/delivery/http/v1/handlers/feedback/getAll';
import {buildDeleteFeedbackHandler, DeleteFeedbackType} from '@/delivery/http/v1/handlers/feedback/delete';
import {buildUpdateFeedbackHandler, UpdateFeedbackHandlerType} from '@/delivery/http/v1/handlers/feedback/update';
import {buildCreateFeedbackHandler, CreateFeedbackType} from '@/delivery/http/v1/handlers/feedback/create';
import {buildUpvoteFeedbackHandler, UpvoteFeedbackHandlerType} from '@/delivery/http/v1/handlers/feedback/upvote';
import {buildGetCategoriesHandler, GetCategoriesHandlerType} from '@/delivery/http/v1/handlers/feedback/getCategories';
import {buildGetStatusesHandler, GetStatusesHandlerType} from '@/delivery/http/v1/handlers/feedback/getStatuses';

type Params = Pick<DeliveryParams, 'feedback'>;

export type FeedbackMethods = {
  create: CreateFeedbackType;
  update: UpdateFeedbackHandlerType;
  deleteFeedbackHandler: DeleteFeedbackType;
  getAll: GetFeedbackAll;
  get: GetFeedback,
  upvote: UpvoteFeedbackHandlerType,
  getCategories: GetCategoriesHandlerType,
  getStatuses: GetStatusesHandlerType,
}

const buildFeedbackRoutes = (methods: FeedbackMethods) => {
  return (root: Express.Router) => {
    const namespace = Express.Router();

    /**
     * @openapi
     * /feedbacks:
     *   post:
     *     summary: Create a new feedback
     *     tags: [Feedback]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *                 example: "Feedback title"
     *               description:
     *                 type: string
     *                 example: "Description of feedback"
     *               statusName:
     *                 type: string
     *                 example: "myStatus"
     *               categoryName:
     *                 type: string
     *                 example: "myCategory"
     *     responses:
     *       201:
     *         description: Feedback successfully created.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/entities/Feedback'
     */
    namespace.post(
      '/',
      getMeRules,
      createRouteHandler(methods.create)
    );

    /**
     * @openapi
     * /feedbacks:
     *   get:
     *     summary: Retrieve a list of all feedbacks
     *     tags: [Feedback]
     *     responses:
     *       200:
     *         description: Successfully retrieved the feedback list.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/entities/Feedback'
     */
    namespace.get(
      '/',
      createRouteHandler(methods.getAll)
    );

    /**
     * @openapi
     * /feedbacks/categories:
     *   get:
     *     summary: Retrieve all feedback categories
     *     tags: [Feedback]
     *     responses:
     *       200:
     *         description: Successfully retrieved categories.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/entities/Category'
     */
    namespace.get(
      '/categories',
      createRouteHandler(methods.getCategories)
    );

    /**
     * @openapi
     * /feedbacks/statuses:
     *   get:
     *     summary: Retrieve all feedback statuses
     *     tags: [Feedback]
     *     responses:
     *       200:
     *         description: Successfully retrieved statuses.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#components/entities/Status'
     */
    namespace.get(
      '/statuses',
      createRouteHandler(methods.getStatuses)
    );

    /**
     * @openapi
     * /feedbacks/{id}:
     *   get:
     *     summary: Get feedback by ID
     *     tags: [Feedback]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *           example: "123"
     *     responses:
     *       200:
     *         description: Successfully retrieved feedback.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/entities/Feedback'
     */
    namespace.get(
      '/:id',
      createRouteHandler(methods.get)
    );

    /**
     * @openapi
     * /feedbacks/{id}:
     *   put:
     *     summary: Update feedback by ID
     *     tags: [Feedback]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *           example: "123"
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *                 example: "Feedback title"
     *               description:
     *                 type: string
     *                 example: "Description of feedback"
     *               statusName:
     *                 type: string
     *                 example: "myStatus"
     *               categoryName:
     *                 type: string
     *                 example: "myCategory"
     *     responses:
     *       200:
     *         description: Feedback updated successfully.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/entities/Feedback'
     */
    namespace.put(
      '/:id',
      getMeRules,
      createRouteHandler(methods.update)
    );

    /**
     * @openapi
     * /feedbacks/{id}/upvote:
     *   put:
     *     summary: Upvote a feedback
     *     tags: [Feedback]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *           example: "123"
     *     responses:
     *       200:
     *         description: Feedback upvoted successfully.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/entities/Upvote'
     */
    namespace.put(
      '/:id/upvote',
      getMeRules,
      createRouteHandler(methods.upvote)
    );

    /**
     * @openapi
     * /feedbacks/{id}:
     *   delete:
     *     summary: Delete feedback by ID
     *     tags: [Feedback]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *           example: "123"
     *     responses:
     *       200:
     *         description: Feedback deleted successfully.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/entities/Feedback'
     */
    namespace.delete(
      '/:id',
      getMeRules,
      createRouteHandler(methods.deleteFeedbackHandler)
    );

    root.use('/feedbacks', namespace);
  }
}

export const buildFeedbackHandler = (params: Params): IHandler => {
  const get = buildGetFeedbackHandler(params);
  const deleteFeedbackHandler = buildDeleteFeedbackHandler(params);
  const getAll = buildGetFeedbackAllHandler(params);
  const create = buildCreateFeedbackHandler(params);
  const update = buildUpdateFeedbackHandler(params);
  const upvote = buildUpvoteFeedbackHandler(params);
  const getCategories = buildGetCategoriesHandler(params);
  const getStatuses = buildGetStatusesHandler(params);

  return {
    registerRoutes: buildFeedbackRoutes(
      {
        get,
        getAll,
        deleteFeedbackHandler,
        create,
        update,
        upvote,
        getCategories,
        getStatuses
      }
    )
  }
}
