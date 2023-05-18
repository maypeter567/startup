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