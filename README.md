# RecallRacer

A SYNCSHACK submission by Abyan Majid, Ankit Poojary, Pierce Le, An Nhan Nguyen

## Motivation 💡

We believe that:

1. Competition incentivizes students to study harder! Friendly competition, in particular, can be rather fun!
2. Active recall is the most effective way to learn - most of us know this, and yet chances are, we don't really learn in an active manner. Active learning is less intuitive, and it can be exhausting to the extent of being discouraging.

Therefore, we wanted to build something that addresses the two points above. **RecallRacer** is an app that parses a PDF and uses an LLM to generate a set of learning materials optimized for active recall. And, in spirit of competition, we allowed users to learn the same set of materials by racing against one another (who can get more points? who can reach the finish line quicker?)

## What it does 🤷‍♂

The user flow goes like this:

1. You upload a PDF (say, a lecture or part of a textbook)
2. The server makes a call to OpenAI API's GPT4o model, using LangChain to template the prompt to enforce a strict restriction for the structure of the output. The structure is something like
3. The client

## How we built it 🤔

We used the following technologies to build the app:

- **LangChain and OpenAI:** We used GPT4o as our model and we used LangChain's prompt templates and parsers to enforce a strict rule on how the LLM's output should be
- **React:** The frontend is built in React with Mantine UI.
- **Flask:** The backend is built in Flask with Flask-Pymongo MongoDB ORM
- **MongoDB:** A NoSQL database (to optimize development speed)
- **Firebase:** Our choice of authentication provider.

## Challenges we ran into 😥
- We had intended to include WebSockets to display real-time updates about the players' progression in the study race e.g., you're to be notified of who's ahead of you. However, we were not able to get this feature up due to time constraints.
- We spent a lot of time debugging errors revolving node modules/dependencies. This was tough; the error messages were often cryptic.

## Accomplishments that we're proud of 🤩

The fact that we made an AI-powered full stack application with a working database, backend server, api integrations, and a neat looking user inteface in under 24 hours! 😄 

## What we learned 🏁

We learned a lot. From React, UI component libraries, to LangChain, and LLM APIs.

## What's next for RecallRacer ❓🏎️
- Currently, RecallRacer only accepts PDF files. As part of future plans to take RecallRacer to the next level, we plan to accept more file types, including _.mp4_ video files, where RecallRacer will be able to scan videos (perhaps of lectures) and make modules out of it too!
