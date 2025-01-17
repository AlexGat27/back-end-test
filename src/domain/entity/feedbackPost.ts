import {Category, FeedbackPost, Status} from '@prisma/client';

export interface IFeedbackPost extends FeedbackPost {
    upvotesCount?: number,
    authorEmail?: string,
    categoryName?: string,
    statusName?: string
}

/**
 * @openapi
 * components:
 *   entities:
 *     Feedback:
 *                 properties:
 *                   id:
 *                     type: int
 *                     example: "123"
 *                   title:
 *                     type: string
 *                     example: "Feedback title"
 *                   description:
 *                     type: string
 *                     example: "Description of feedback"
 *                   upvotesCount:
 *                     type: number
 *                     example: 25
 *                   authorEmail:
 *                     type: string
 *                     example: "user@example.com"
 *                   categoryName:
 *                     type: string
 *                     example: "myCategory"
 *                   statusName:
 *                     type: string
 *                     example: "myStatus"
 */

export interface ICategory extends Category {}

/**
 * @openapi
 * components:
 *   entities:
 *     Category:
 *                 properties:
 *                   id:
 *                     type: int
 *                     example: "123"
 *                   name:
 *                     type: string
 *                     example: "myCategory"
 */

export interface IStatus extends Status {}


/**
 * @openapi
 * components:
 *   entities:
 *     Status:
 *                 properties:
 *                   id:
 *                     type: int
 *                     example: "123"
 *                   name:
 *                     type: string
 *                     example: "myStatus"
 */