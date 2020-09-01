# A Useles Client Side Way To Render Websites

*There are 4 required components of this project. The J-Make javascript, JQuery, the body.json file, and strict directory structure.*

J-Make uses a JSON array to generate the DOM from the body down, then populates elements by making calls to corosponding directoris. By generating elements and pupulating them from directory calls allows for drop-in style plugins per-element, decentralizes the server-side aspects of a website, and allows for varied scripting languages without sitewide integration.

## JQuery

I bet you already guessed that J-Make requires JQuery to run :) The JQuery being used as of 08/29/2020 is [jquery-3.5.1](https://code.jquery.com/jquery-3.5.1.min.js).

## j-make.js

Include a link to the [j-make.js](https://github.com/richardkentgates/j-make/blob/master/j-make.js) in your index. This script will use the JSON array as a map to build the elements and append them to the &lt;body&gt;.
The script will append dataset attributes "data-key" and "data-path" to the elements where the value for data-path is the directory path to be returned and loaded into that element. J-Make also sets the class attribute for each generated element to "j-make". The script then calls to a corosponding directory and populates the element with the response.

## body.json

Use this simple array format to structure your html in [body.json](https://github.com/richardkentgates/j-make/blob/master/body.json). Like most developers, you probably have some basics you like to have in the head of your document, so you build out your index file however you like as long as you include your script tag for JQuery, j-make, and leave the document body empty (&lt;body&gt;&lt;/body&gt;). Use the JSON array to structure the elements that will be populated in to the body. Elements generated by nested arrays will be appended to the element named by the previous sibling in the array, so all nested arrays need to be preceded by a string value for an element.

<pre>
[
 "header",
 "main",
 [
  "article",
  "aside",
  [
   "section",
   "section"
  ]
 ],
 "footer"
]
</pre>

## Directory Structure

J-Make reads the index file in the directory that corresponds with the name and position of the element, so you can use index.html, index.php, or whatever server-side language you prefer. Mix and match, html for some, and php for other elements. Index file results will be prepended to the element with nested elements appended after the content.

<pre>
index.html
body.json
j-make.js
jquery.js
style.css
body
|header_0
||index.html
|main_1
||index.html
||article_0
|||index.html
||aside_1
|||index.html
|||section_0
||||index.html
|||section_1
||||index.html
|footer_2
||index.html
</pre>
