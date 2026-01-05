Tic-Tac-Toe Multiplayer

We built a multiplayer Tic-Tac-Toe game! We built this project to learn how to handle real-time states and authentication in a React app. It uses Firebase to let two players connect and play against each other live without needing to refresh the page.

Key Features

Here's what the app can do:

User Accounts: You can sign up, log in, and reset your password if needed.

Online Multiplayer: Challenge a friend in real-time. We used Firebase Realtime Database to sync moves instantly.

Lobby System: Generate a room code that your friend can use to join.

Design: A vibrant ui built with Tailwind.

The Game: Handles all the classic rules, detecting wins, tracking the score, and managing turns.

How We Built It (Tech Stack)

Frontend: React with TypeScript.

Styling: Tailwind CSS.

Backend: Firebase and a separate API for login, signup and forgot password.

State Management: React Context API combined with some custom hooks.

Testing: Cypress for component testing.

Run It Locally

If you want to try it out on your own, just follow these steps:

Clone the repo:

git clone [https://github.com/arok201001/tictactoe.git](https://github.com/arok201001/tictactoe.git)
cd tictactoe


Install the dependencies:

npm install


Fire up the app:

npm run dev


Then just head over to http://localhost:5173 in your browser.

Testing

We set up Cypress to make sure the game logic holds up.

Open the interactive runner:

npx cypress open


Choose Component Testing and select GamePage.cy.tsx to watch the tests run.

Or run them in the terminal:

npx cypress run --component


Folder Structure

A quick breakdown of where things live:

src/components -> Reusable UI bits like the squares and buttons.

src/contexts -> Where we handle the global state (like the logged-in user).

src/pages -> The main screens: Login, Lobby, the game etc.

src/routes -> Setup for moving between pages.

src/firebase.ts -> Our Firebase config.

Created By

Firat Oktay

Chiril Bogza
