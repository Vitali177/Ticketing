import mongoose, { mongo } from 'mongoose';
import express, { Request, Response } from 'express';
import { NotFoundError, requireAuth, validateRequest } from '@vitali177_tickets/common';
import { body } from 'express-validator';
import { Ticket } from '../src/models/ticket';
import { Order } from '../src/models/order';

const router = express.Router();

router.post('/api/orders', requireAuth, [
  body('ticketId').not().isEmpty().custom((input: string) => mongoose.Types.ObjectId.isValid(input)).withMessage('Ticket id must be provided')
],
  validateRequest,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new NotFoundError();
    }

    return res.send({});
  }
);

export { router as newOrderRouter };
