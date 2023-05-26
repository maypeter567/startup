# intro

I had a lot of fun learning about and playing with git, I can see it being incredibly useful in the future. And I can't wait to see this save
my skin when I'm working on the project.

I need to remember the formatting for the git commands, they are

git add "file name"
git pull
git commit -m "text here"
git push
git status


May 10th
I have been playing around with HTML, it is important to remember the formating that the code inputs needs to be so that the browser understands what you want properly.

(for my notes) <a href="link.here"> example text </a>

element	meaning
html	The page container
head	Header information
title	Title of the page
meta	Metadata for the page such as character set or viewport settings
script	JavaScript reference. Either a external reference, or inline
include	External content reference
body	The entire content body of the page
header	Header of the main content
footer	Footer of the main content
nav	Navigational inputs
main	Main content of the page
section	A section of the main content
aside	Aside content from the main content
div	A block division of content
span	An inline span of content
h<1-9>	Text heading. From h1, the highest level, down to h9, the lowest level
p	A paragraph of text
b	Bring attention
table	Table
tr	Table row
th	Table header
td	Table data
ol,ul	Ordered or unordered list
li	List item
a	Anchor the text to a hyperlink
img	Graphical image reference
dialog	Interactive component such as a confirmation
form	A collection of user input
input	User input field
audio	Audio content
video	Video content
svg	Scalable vector graphic content
iframe	Inline frame of another HTML page

# May 10

I was messing around with simon, I learned about how scripts can be used in computers to accomplish tasks without having to run it through an editor, straight from the command line. super cool.

after working through a significant portion of the html for my startup, I realized how intuitive the designing of the base foundation of the website.
this makes me worried about what might happen if I tried to actually make it look pretty and have the sleek nature I'd hope to find in an actual game.

# May 11

we are learning CSS, I'm amazed at how "simple" the language is. Yet it's complexity is insane.

use <meta name="viewport" /> so that a website doesn't try to adapt a page for you.

@media (orientation: portrait) {
    div {
        transform: rotate(270deg);
    }
}

float is used to force some objects on the side you dictate instead of automatically loading it on the left.

this next method is used to help automatically resize and move objects in websites so they render automatically.
## This is grid

.container {
    display: grid;
    grid-template-columns:
        repeat(auto-fill, minmax(300px, 1fr));
    grid-auto-rows: 300px;
    grid-gap: 1em;
}

flex

## This is flex

body {
    display: flex;
    flex-direction: column;
    margin: 0;
    height: 100vh;
}

# May 15

I was experimenting with the simon css elements before pushing the css code onto simon on my browser. I realized that bootstrap mainly looks like html, but the classes that you decide to associate with every element and peice of the objects and format you create is how you directly influence the appearance of the document. It makes much more sense to me now.

# May 15-17

I managed to teach myself better techniques for the flex style method.
Big notes: pay attention to what overrides the formatting in the documents, if a link to another css file is being imported at the top of the document, it will be used as the default instead of any edit attmepts made inside the rest of the files.
if you aren't sure what can be used as an argument for a line of code, delete the ":" and replace it to see recommended inputs.
if all else fails, look it up or review old code you wrote.

## May 18

in JS, "extends" in class Beach extends location tells the Beach class to inherit location.

classes don't need to have 'function' written in front of a function declaration because it already assumes you are making a function in the class.

you can use the #document command in any websites debugger to see its HTML, then we can make sqripts and code that can do anything we want with the page.

there are many ways to register events and changes to code for the javascript to run off.

'this' on a global function is undefined. otherwise it would be the window.

## may 23

### start example code

new Promise(() => {})

promises have two important things, their state tells you if they are pending or something.
promises also have a result. the result can determine if it fails or does its job. The result is the value returned.

pending means it is currently running asynchronously
fulfilled - completed succesfully
rejected - failed to complete.

function callback(resolve, reject) {
    resulve('done')
}

const p = new Promise(callback);

p.then((result) => console.log(result));

the callback function immediately returns, so the promise will usually be a resolved when it comes back. it will either be pending or resolved when it returns.

the const p object creation runs the promise, the p.then() is what will be evaluated when the promise finishes. until then the code runs the rest of the code on the stack.

### start of example code

let p = new Promise((resolve, reject) => {
 if (Math.random() < 0.5) {
   resolve('Success!');
 } else {
   reject('Failure!');
 }
});

function s(success) {
    console.log(success);
}

function f(fail) {
    console.error(fail);
}

p.then(f, s <!-- this is an example of two ways to do this p.then function, one invlolves defined functions, one is using pointer functions. -->
 <!-- (success) => console.log(success),
 (failure) => console.error(failure) -->
);

### example code

this function will randomly generate a number, and then decide from that number if it fails or succeeds.

const coinToss = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.1) {
      resolve(Math.random() > 0.5 ? 'heads' : 'tails');
    } else {
      reject('fell off table');
    }
  }, 3000);
});

<!-- This code above shows how the stack handles these interactions -->

coinToss
  .then((result) => console.log(`Toss result: ${result}`))
  .catch((err) => console.error(`Error: ${err}`))
  .finally(() => console.log('Toss completed'));

<!-- this code shows the results. -->

### notes

async and await is another syntax for promises.

async makes a promise if you don't provide one, and the return or log or interaction with it needs to have await in it so the code knows to look for the result of await.

you can only use await in async or a top level module function.

when using a function that uses await, it needs to be declared as a async

## May 24

I have just learned that I can have multiple then statements inside of a promise. I was very surprised to learn this.

and if you have something that is dependant on a conditional result in an await try block, it cannot be in the finally section or it will always be completed.

## May 25

we need to make sure we don't make the user think, it needs to be simple.

when building websites, there are consistent elements across all websites that are good to follow for consistency.

the site should have pleasant colours and easy to understand material. what's important should take up the majority of the room.

as you are building a website, you should map it out to see what users need to do and jump through in order to get what they want.

fonts need to be consistent to avoid clashing fonts and for the convenience of the user.

text should have consistent font sizes.

what space has power

use symbols and icons in a way that people expect them to be used.

I'm falling asleep, but typing helps me stay awake.

## May 26

notes for the midterm that I wanted to record quickly.

Internet Engineering Task Force (IETF) is responsible for physical communication of the internet.
Internet Corporation for Assigned Names and Numbers (ICANN) oversees both the Internet Protocol (IP) address space, and the Domain Name System (DNS)

Tim Berners-Lee made the first website and created the first connections. started 1980 till 1990

Håkon Wium Lie made css in 1996

Brendan Eich made java script in 1995

In 2009 Ryan Dahl created Node.js as the first successful application for deploying JavaScript outside of a browser.

application, https. transport, TCP. internet, IP. link, fiber/hardware.

https port is 443

