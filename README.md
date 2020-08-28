## Assumptions
The features of the site will scriptly be searching for images with a text field, displaying the results below. When an image is tapped the image will be displayed in a responsive modal. 

## Decisions
Based on the number of feature requirements I decided the website should just be a single page site without any client side routing. However, if the number of features were to increase and had multiple user flow client side routing would be included. 

The site will be composed of three main components: a main App component, a top navigation bar component, and a gallery component. The App component will be the parent component for the entire app and pass necessary data along to child components to help separtate the concerns of each component. The top navigation bar will handle all the user's interaction with the text field and calling the spell checker before a search is made. The gallery component will display all image results and handle the state of which image is selected and if the modal should display or not.

## Spell Checker Assumption
All non vowels in the search term is correct.

## Spell Checker Implementation
The Spell Checker will first remove any non-letter characters in the search term and check if that word is in the Unix dictionary. If it is the term will be used in the search. 

If the term is not in the dictionary the Spell Checker will recursively generate all possible terms by substituting each vowel in the term will all vewols. Once all the possible terms are made the Spell Checker will select the first possible term that is in the Unix dictionary and use that as the search term. If no match is made the original term is used instead.

## Spell Checker Potential Runtime Improvements
The current run time of the Spell Checker is O(5^(k)) time where k is the number of vowels in the search term. If all the words in the Unix dictionary is placed in a Trie data structure look ups for a correct term will be O(n) where n is the length of the term.

