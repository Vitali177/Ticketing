import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it('returns a 404 if the provided id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const response = await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'asfaf',
      price: 20
    })
    .expect(404);

  expect(response.body.length).toEqual(3);
});

it('returns a 401 if the user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const response = await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'asfaf',
      price: 20
    })
    .expect(401);
});

it('returns 401 if the user is does not own the ticket', async () => {
});

it('returns 400 if the user provides an invalid title or price', async () => {
});

it('updates the ticket provided valid inputs', async () => {
});
