# Week 7 project build a database driven full stack React Express app

Putting together the React client code, Node.js server code and Postgres database to build a full-stack React application.

## Submission

## A link to my repository on GitHub: https://github.com/Adlam4002/week-7-project-Build-a-Database-Driven-Full-Stack-React-Express-App/tree/main

## A link to my live page on Render: https://week-7-project-client.onrender.com

# User Stories

🐿️ As a user, I want to be able to create new posts and add them to the page

🐿️ As a user, I want to be able to assign a category to each post

🐿️ As a user, I want to be able to view all posts added on the page and the category they're in

🐿️ As a user, I want to be able to view all posts in a specific category by visiting a dedicated page for that category (Stretch Goal)

🐿️ As a user, I want to be able to add new categories (Stretch Goal)

# Requirements

🎯 Design a database schema with relationships between tables

🎯 Create a new application with a React client and an Express server
(again, remember the client and the server should be separate)

🎯 Seed the database with data. Either run your SQL queries in Supabase SQL Editor OR use a seed.js file. (if you use the Supabase editor, save the scripts you run in a file in your project, in case you need to rerun them, or we need to duplicate the project)

🎯 Create Express endpoints to handle requests so you can POST and GET the data appropriately for your application.

🎯 Create multiple pages using react-router-dom

🎯 Create a home page.

🎯 Create a page to show all the posts and use fetch to call your server to get your data.

🎯 Create a page where users can create new posts using a form.

## Stretch Goals

🏹 Allow users to "Like" posts and increase the likes

🏹 Allow users to DELETE posts

🏹 Allow users to filter posts in a specific category. Use either a query string like /posts?category=education or a dedicated route for the categories at /posts/:categoryName.

# Reflections

The first thing I did was try to come up with an idea for what my app could be. I liked the idea of rating/reviewing anime intros as we had discussed on the course earlier in the week. I decided to change it up a little and make it my own, so I settled on a review forum for anime. After I had my idea, I needed to make a database schema. I knew that I wanted the user to select the anime title from a pre-existing list, select a rating out of 5, and leave their username. I decided that I would store the anime titles on a separate table to act as categories that I could use to filter the posts on the site. The main table contains the username, review, rating out of 5 and fetches the anime title from the other table depending on which title the user selects. I then created the tables and populated them using the SQL editor on Supabase. The code I used is available in the seed.SQL file on my repository.

I then used Vite to create a React client folder. At this point, I made some additional folders in the client folder to better organise the files I wanted to use. I created a components folder and a pages folder. This was to ensure that the components I would use as their pages were separate from the components that may be called on multiple pages. To make sure I was able to smoothly make an SPA that functions as though it has many pages I installed react-router-dom. I then wrapped my <App/> within <BrowserRouter> </BrowserRouter> to enable effective routing. After I had this basic client set up, I moved on to the server.

I created a new folder for the server and then installed the npm packages dotenv, pg, express, and cors. I saved my connection string for my database in a .env file so that it could be used to connect to the database via my server. After I set up the packages, I made some basic endpoints to check it was working using Thunder Client. Initially, I only used GET and POST endpoints, but I later added a DELETE endpoint too. I set up a POST endpoint to use when a user submits their reviews via a form on the site, the correct SQL query is in place for all relevant data to be saved on the database. I created a GET endpoint so that my user reviews page could access the data of all reviews so I could display them on the screen. I also added another post endpoint to allow the users to add new titles to the anime_titles table. This would then influence the rest of the site as more filter buttons and title options would be created for the posts and submission form.

I then created the pages for my app and then set up the client-side routes to them. The first page I created was the home page. I wanted to keep this very simple and understated to not distract the user before they have got to the meat of the site. I then created the form page. This is the page that allows users to submit their reviews to the database. There’s a username input that they type into, a review input into which the user enters the main body of their review, a drop-down list of anime titles for the users to choose from and finally a dropdown input 1-5 for the users to leave a numerical rating. To generate the list of anime names I used fetch to retrieve the list of available anime titles saved on the database. Once I had these values in an array, I used the map method to create a select option for each title retrieved. Later, I added another form that connected directly to the anime_title table and allowed them to add additional titles to the list. I made this only accept unique values so that users would not create duplicates by mistake. I used useState to track the values entered by the users to produce a preview as they type. When the form is submitted, the data is converted to JSON and sent via the POST endpoint to the database. I also created a function to reset the state of the inputs when the form is submitted to provide feedback upon the form being successfully submitted.

I then created the posts page. This component fetches all the review data from the database and then uses the map method to pass those values as props to the filter and review components for as many instances as needed to display all the reviews. Inside the review component, those values are used to create and display each review as an item. I also added a delete button to each review, this button calls a function that sends a DELETE request through the server to delete that review from the database. I used state within this component so that the components would refresh if something was deleted to provide the users with instant feedback. The filter component takes all available anime titles and creates a button to filter which posts are rendered using query strings in the URL. For example, if the user clicks the “Attack on Titan” button only reviews for that anime will be rendered until they click the clear filter button.
I believe I was able to achieve all the required features of this project and also included the stretch goals of filtering via query stings, allowing users to delete posts through the site, and allowing the users to add new categories (anime titles) that can be used to filter posts.

The only major problem I encountered while making this app was an error when deleting posts. The posts were being successfully deleted on the database, but the dev tools console was displaying an error. It turns out that when I was setting up the DELETE endpoint the response, I created was providing the information that had been deleted. I did this so that I could keep track of what information was being affected. When I set up the successful if condition the client was expecting to receive a JSON object containing “success”. As it was not receiving what I told it to expect it was not recognising that the deletion was successfully executed. Once I realised this, I was able to correct the response and the issue was resolved.

### React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
