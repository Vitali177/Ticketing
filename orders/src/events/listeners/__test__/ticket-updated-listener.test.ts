import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { TicketUpdatedEvent } from '@vitali177_tickets/common';
import { TicketUpdatedListener } from '../ticket-updated-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Ticket } from '../../../models/ticket';

const setup = async () => {
  // creates a listener
  const listener = new TicketUpdatedListener(natsWrapper.client);

  const id = new mongoose.Types.ObjectId().toHexString();

  // create and save a ticket
  const ticket = Ticket.build({
    id,
    title: 'concert',
    price: 20
  });
  await ticket.save();

  // create a fake data object
  const data: TicketUpdatedEvent['data'] = {
    id,
    version: ticket.version + 1,
    title: 'new concert',
    price: 999,
    userId: 'fdgh'
  };

  // create a fake msg object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  // return all the stuff
  return { listener, data, msg, ticket };
};

it('finds , updates and saves a ticket', async () => {
  const { msg, data, ticket, listener } = await setup();
  await listener.onMessage(data, msg);
  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.title).toEqual(data.title);
  expect(updatedTicket!.price).toEqual(data.price);
  expect(updatedTicket!.version).toEqual(data.version);
});

it('acks the message', async () => {
  const { msg, data, listener } = await setup();
  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it('does not call ack ack if the event has a skipped version number', async () => {
  const { msg, data, listener, ticket } = await setup();
  data.version = 10;

  try {
    await listener.onMessage(data, msg);
  } catch (err) {

  }

  expect(msg.ack).not.toHaveBeenCalled();
});
