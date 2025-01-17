import {Upvote} from '@prisma/client';

export interface IUpvote extends Upvote {
  feedback?: string,
  userEmail?: string
}

/**
 * @openapi
 * components:
 *   entities:
 *     Upvote:
 *                 properties:
 *                   id:
 *                     type: int
 *                     example: "123"
 *                   feedback:
 *                     type: string
 *                     example: "titleOfFeedback"
 *                   userEmail:
 *                     type: string
 *                     example: "example@email.com"
 *
 */