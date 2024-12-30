# **Node.js Job Queue with Redis and Bull**

A Node.js application demonstrating how to handle time-sensitive tasks using **Bull** for job queuing, **Redis** for persistence, and **Express.js** for routing. This example includes an order system where orders expire after a delay.

## **Features**

- **Job Queuing**: Use Bull to schedule and manage delayed jobs.
- **Redis Integration**: Persistent job management with Redis.
- **Order Management**: Add and fetch orders via RESTful APIs.
- **Expiration Handling**: Automatically mark orders as expired after a delay.
- **Scalable Architecture**: Modular and maintainable codebase.


## **Technologies Used**

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for API routing.
- **TypeScript**: Strongly typed language for cleaner and safer development.
- **Bull**: Job queue manager for scheduling and processing jobs.
- **Redis**: In-memory data structure store for persistence.
- **Docker**: Containerization for Redis setup.


## **Installation**

### Prerequisites

- Node.js (v16+)
- Redis (installed or running via Docker)
- Docker (optional, for Redis setup)

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Bolu1/node-job-queue-code-sample.git
   cd node-job-queue-code-sample
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Redis**:

   - **Using Local Installation**:
     ```bash
     redis-server
     ```

   - **Using Docker**:
     ```bash
     docker run --name redis-server -d -p 6379:6379 redis
     ```

4. **Run the Application**:
   - **Development**:
     ```bash
     npm run dev
     ```
   - **Production**:
     ```bash
     npm run build
     npm start
     ```


## **API Endpoints**

### Base URL: `/api/orders`

1. **Create a New Order**
   - **POST** `/`
   - **Body**:
     ```json
     {
       "details": "Order details here"
     }
     ```
   - **Response**:
     ```json
     {
       "success": true,
       "message": "Order created successfully",
       "data": {
         "id": "uuid",
         "details": "Order details here",
         "createdAt": "timestamp",
         "OrderDeliveryStatus": "PENDING"
       }
     }
     ```

2. **Get All Orders**
   - **GET** `/`
   - **Response**:
     ```json
     [
       {
         "id": "uuid",
         "details": "Order details here",
         "createdAt": "timestamp",
         "OrderDeliveryStatus": "PENDING"
       }
     ]
     ```

## **Job Queue and Expiration**

- **Queue**: Orders are added to a Bull queue with a delay.
- **Processing**: After the delay, the order is processed and marked as expired if not completed.
- **Persistence**: Redis ensures job persistence even if the application crashes.


## **Running Redis with Docker**

Use Docker to quickly set up Redis:

1. **Start Redis**:
   ```bash
   docker run --name redis-server -d -p 6379:6379 redis
   ```

2. **Test Connection**:
   ```bash
   redis-cli ping
   ```

## **Folder Structure**

```
src/
├── models/         # Interfaces and data models
├── services/       # Business logic
├── utils/          # Queue and job management
├── routes/         # API routes
├── server.ts       # Express server setup
└── app.ts          # Application entry point
```


## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


## **Contributing**

Contributions are welcome! Feel free to open issues or submit pull requests for improvements.


## **Contact**

- **Author**: [Your Name](https://github.com/Bolu1)
- **Email**: boluadetifa@gmail.com
