# Useless Client-Side Website Rendering

There are 4 required components of this project. The J-Make javascript, JQuery, the body.json file, and strict directory structure. If it seems overly-simplistic, it is, and on purpose. I want this to make each element completely segregated on the server, pulling content from directory containers. I want this capability because I feel like development time on all projects takes so long because changes have to be rolled out at such a large scale that it take far too long to even get started.

This approach makes customizing and maintaining anything on the website a small project. It also allows for drop-in style plugins and is in the direction we all know it's going. Websites will eventually be web apps. Also, why do I need a plugin with site-wide capabilities to effect one widget? Why does the entire website have to work within the same strict framework?

# j-make.js

Include a link to the j-make.js in your index. This script will use the JSON array as a map to build the elements and append them to the &gt;body&lt;.
The script will append id attributes to the elements based on tag name and element position index, such as header_0, main_1, and footer_2. J-Make also sets the class attribute for each generated element to "j-make".

# JQuery

Yeah, so it's called J-Make. You already knew.

# body.json

Use this simple array format to structure your html. Like most developers, you probably have some basics you like to have in the head of your document, so you build that out then JSON array the body elements and move on to the next part of your dev. An array will be appended to the element named by the previous sibling in the array, so all nested arrays need to be preceded by a string value for an element.

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

# Directory Structure

The logic is prety simple. Remember how the elements J-Make generates has an id based on the tag name and index? You just need to mirror that in your directories. I even start you off with a folder named body to make it easy. An example follows down-page. J-Make reads the index file in the directory that corisponds with the name and position of the element, so you can use index.html, index.php, or whatever server side language you prefer. Mix and match, html for some and php for easier elements. Index file results will be prepended to the element with nested elements appended after the content.

|theme

|.body.json

|.body

|..header_0

|...index.html

|..main_1

|...index.html

|...article_0

|....index.html

|...aside_1

|....index.html

|....section_0

|.....index.html

|....section_1

|.....index.html

|..footer_2

|...index.html
