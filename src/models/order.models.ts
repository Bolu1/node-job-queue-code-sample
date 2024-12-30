export enum OrderDeliveryStatus {
  PENDING = "PENDING",
  DELIVERED = "DELIVERED",
  EXPIRED = "EXPIRED",
}

export enum BullQueues {
  ORDER_EXPIRATION_QUEUE = "ORDER_EXPIRATION_QUEUE",
}

export interface Order {
  id: string;
  createdAt: Date;
  details: string;
  OrderDeliveryStatus: OrderDeliveryStatus;
}

// In-memory database
export const orders: Order[] = [];
