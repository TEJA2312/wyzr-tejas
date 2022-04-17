wyzr.in Submission by Tejas Shirnalkar

# Overview
App uses the standard  Full-stack Architecture where code is divided into two bases client and API (backend). These two code bases run on two proxy servers that communicate with each other.
# Technical Stack Used
Database: MongoDB,
Backend: Node.js with Express
Frontend: React.js
# URL Structure
**"/"** Home page where the user can login. It also has two buttons for search and viewing users' history
**"/search"** Search page to Find books by their Title
**"/results/:searchTerm"** Results of the Search Operation are displayed here
**"/Users"** To see a list of all users in the system and link to view their search history
**"/History/:Useremail"** To display the search History of the specific User

# How To Run
Download the code. In the API and Client directory run "first run npm install and then npm start". Go to localhost:3000 you will see the complete app
