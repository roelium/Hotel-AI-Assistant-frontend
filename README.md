# Hotel - AI Assistant - frontend

The frontend part of a fullstack simple hotel booking management system with AI assistant that can interact with booking data. For educational/experimental purpose to show case the React codes including a chatbot that interacts with the backend utilizing Langchain4J with its AI LLM tooling capabilities.

Medium article for more context: [https://medium.com/@syahrulanw/integrating-an-ai-assistant-with-rag-using-langchain4j-in-a-spring-boot-react-js-17fdc76676b4](https://medium.com/@syahrulanw/integrating-an-ai-assistant-with-rag-using-langchain4j-in-a-spring-boot-react-js-17fdc76676b4)

Online demo: http://roelhotel.s3-website.eu-north-1.amazonaws.com (let me know if it is down)

## Tech Stack

Frontend: React, Javascript, Typescript

Backend: Java, Spring Boot, MySQL, Maven, AWS S3 bucket, JWT token, Langchain4j, Open AI API

## Feature

common: login, register, find available rooms for certain dates

guest: book a room, view bookings, cancel a booking, find a booking, view/edit profile

admin: add/edit room, manage bookings 

The AI asistant currently can find and cancel a booking for a guest 

## Steps to Run the Frontend
1. Clone the project
2. Make sure the backend service is up https://github.com/roelium/RoelHotel-AI-Assistant-backend
3. Change the backend service base url if you are not using the default one ´static BASE_URL = "http://localhost:4040"´ (file: ApiService.js)
4. Install React dependencies `npm install`
5. Run the application `npm start`.
6. Default development url: http://localhost:3000
7. AI assistant is available after a guest logged in

## Important Parts for the AI asistant
1. API call to the chat backend service
````
    static async agentChat(chatId, message) {
        const response = await axios.get(`${this.BASE_URL}/chat?chatid=${chatId}&message=${message}`, {
            headers: this.getHeader()
        })
        return response.data
    }
````
3. Chat feature (file: agent/SupportAgent.tsx)


## References and Inpirations

1. https://docs.langchain4j.dev/tutorials/spring-boot-integration/<br/>
2. https://github.com/marcushellberg<br/>
3. https://github.com/achalise<br/>
4. https://github.com/phegondev<br/>

## Screenshots

![Screenshot 2025-03-17 at 12 55 04](https://github.com/user-attachments/assets/23d565e3-c2a8-45dd-9f48-b32f3dc0d718)

![Screenshot 2025-03-17 at 12 56 32](https://github.com/user-attachments/assets/91dc5eed-db00-48eb-8388-86f1b4b3e33e)

![Screenshot 2025-03-17 at 12 57 07](https://github.com/user-attachments/assets/92240595-b181-43ed-9413-d5f66311f5ff)


