# lfa
## Coding challenge for Library for All

View the site: 

http://ec2-54-149-144-195.us-west-2.compute.amazonaws.com/
## What you decided to do and why:
I decided to recreate a main view that is similar to the existing LFA UI, but also give users an option to view the books in a grid view. This similar to the user experience I have on my kindle and it also gives users a choice, something that I felt was important since 1st graders and 12th graders are sure to have different preferences. 

In the grid view, I am using a CSS hover effect that flips the book, just like you would flip the book over in real life to read the summary on the back. Using hover to show the front and back of the book is similar to what scholastic is doing on their website (http://www.scholastic.com/kids/stacks/books/?lnkid=stacks/nav/b_and_a/main), but I think the flip effect makes it look a lot nicer. Obviously, you couldn't have a hover effect on a mobile app, but something similar could be achieved with differentiating single and double clicks. 

I added a popout sidebar that features a search bar as well as 3 different sort options. I thought about adding genre pagination but ultimately felt that the search bar with a drop down to adjust filter-type allowed for a simpler layout.

When dealing with the data, I decided to parse the JSON into an array of JSON objects in the parent React component, which made it easier to sort and filter. 

Although I didn't implement a way to upload a new catalog and thumbnails, all I would need to do to update the catalog is hook the getInitialState method of AllBooks up to a database instead of using the variable bookData.

## What frameworks / library / language did you use to produce this?
I chose to use ReactJS. I knew that React was good at rendering views quickly and I like that there is relatively little magic involved in coding with React. Dividing things into components made it easier for me to make changes and allowed me to reuse common patterns. The jsx syntax allowed me to make these components more readable by basically writing html.

Using React allowed me to make a single page app fairly easily, but one disadvantage was dealing with traditional browser navigation actions. I decided to write some code to handle pressing backspace from the showBook view, but didn't deal with other cases. I looked at various other solutions to add history to React apps, but didn't implement them because of time.

A brief roadmap to easily browse the React code: the parent component that keeps track of state is "AllBooks." AllBooks renders BookList which conditionally renders a list of BookCells or BookGrids. ShowBook is used to show just one book. 

For the css I used basscss which is a low-level css toolkit. I didn't want anything too heavy and I also like the composable style of writing css with bass.

## How would you test this if this was going to be distributed?
https://github.com/facebook/jest
Jest is an easy to use framework that allows for unit testing of react apps. I haven't used it before, but browsing the docs, it seems pretty straightforward.

Additionally since functions like filterList and sortList are written in vanilla js, they could be tested entirely separately in something like Jasmine with a few tweaks and some fake data.

## Anything else you would like to tell me about your project.
Originally when I was working with the jsx transformer, the app required a server to run, so I implemented a very basic express server. Now that I'm precompiling the jsx, I don't actually need the server any more.
