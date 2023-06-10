import express, { Request, Response } from 'express';
import { validateRequest, NotFoundError, requireAuth, NotAuthorizedError } from '@vitali177_tickets/common';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.put('/api/tickets/:id', requireAuth, async (req: Request, res: Response) => {
  const { id } = req.params;
  const ticket = await Ticket.findById(id);

  if (!ticket) {
    throw new NotFoundError();
  }

  return res.send(ticket);
});

export { router as updateTicketRouter };
