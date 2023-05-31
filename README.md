# Movie-Commerce_website
Welcome to the Movie Store project! This is a web application that allows users to browse and shop for movies. It utilizes the TMDB API to fetch movie data and provides a user-friendly interface for searching and discovering movies.

## Features

- Search movies by title
- Filter movies by genre and release year
- Add movies to the shopping cart
- View movie details including title, release date, and price
- Checkout and complete the purchase
- Responsive design for optimal viewing on different devices

## Technologies Used

- React: JavaScript library for building user interfaces
- TMDB API: API for retrieving movie data
- React Router: Routing library for navigation between pages
- Axios: HTTP client for making API requests
- Bootstrap: CSS framework for responsive design
- HTML5: Markup language for structuring the web page
- CSS3: Stylesheet language for styling the web page

### Note to the tester
- we have implemented a load more button at the end of the result page to show more results
- sometimes when fetching images from the api error message displayed the get failed, i tried to prevent it.

---------------------


# Initializing the template

In order to initialize the project make sure to:

1. When you open the project, if intelliJ propose to "Load Maven Project" do it. You can later reload maven with the "M" icon on the right of the screen, or by right clicking on the pom.xml file and selecting "Maven -> Reload project".
2. You see red lines in the code? Go to File -> Project Structure -> Project Settings -> Project -> SDK -> and choose your Java SDK
3. Still see red stuff? Open the same dialog and click on "Fix" if you see some
4. Edit your configuration. Make sure the "Main class" is set to "hac.DemoApplication" and that Java is set

Everything ok?
1. The DB credentials are stored in the application.properties file. You may change them if you want.
2. Run the project, you should not see any errors in IntelliJ console

So far the only route you can check is http://localhost:8080/debug/purchases
that returns a list of all purchases in the DB (empty for now).

## Initializing the React client (movie-app)

Open a terminal in *movie-app* and run `npm install` and then `npm start`. You should see the client running on http://localhost:3000.
You can also open another instance of IntelliJ and open the *movie-app* folder as a project. You can then run the client from there.

- you may need to run `npm i mdb-ui-kit` if error happens with the frontend design

## Using the provided code to store purchases in the DB

We provide you with ready-to-use code to store purchases in the DB, in order to give you a taste of what Spring can do for you.
Look at the DebugController class. It has a method called "addPurchase" that receives a Purchase object and stores it in the DB.
When you develop your own controller, you must declare the repository member exactly as it is declared in the DebugController class.
Then you can use it to store purchases in the DB (repository.save(purchase)).
