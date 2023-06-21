import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";

it('returns an error if the ticket is not exist', async () => {
  const ticketId = new mongoose.Types.ObjectId();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ ticketId }).expect(404);
});

it('returns an error if the ticket is already reserved', async () => {

});

it('reserves a ticket', async () => {

});