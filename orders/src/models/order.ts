import mongoose from "mongoose";
import { OrderStatus } from "@vitali177_tickets/common";

interface OrderAttrs {
  userId: string;
  status: string;
  expiresAt: OrderStatus;
  ticket: TicketDoc;
}

interface OrderDoc extends mongoose.Document {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketDoc;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  status: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.Created, required: true },
  expiresAt: { type: mongoose.Schema.Types.Date, required: true },
  ticket: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    }
  }
});

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
}

const Order = mongoose.model<OrderDoc, OrderModel>('User', orderSchema);

export { Order };
