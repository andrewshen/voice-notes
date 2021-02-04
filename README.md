# voice-notes

A simple voice-based note-taking webapp, built on the MERN stack.

## Frontend

Authenticated state maintained across different pages with React's `useContext` API. Two higher-order components, `PrivateRoute` and `PublicRoute`, return `react-router` routes based on authentication status. `AuthService` handles authentication endpoints, and note-taking relies on the `SpeechRecognition` interface from the Web Speech API.

## Backend

Node with Express backend. Uses `Passport.js` for issuing JSON web tokens to users, `Mongoose` for querying users and notes, and `bcrypt` for password hashing. Frontend served via Express route.
