# Nesti
Nesti is a chrome extension that provides the read time estimate and word count for articles of several major news sources such as the New York Times, The Washington Post, TechCrunch, Time Magazine, etc.

## Description
Nesti uses the Readability library from Mozilla that gives an accurate word count of articles without including text from adds, comments, or other clutter on the page. The extension takes the text returned from Readability and parses it, split's it into individual words, and calculates the estimated reading time of the articles based on the average read time of adults (250 words per minute).

On the webpage, the data is shown in both an overlay in the bottom right hand corner of the page, as well as in the popup (action_page) of the extension if clicked on. Users, through the extension's option menu, have the ability to remove the overlay from the page and only have the data shown in the extensions popup as a preference.



## Screenshots
![Reading time overlay](https://i.imgur.com/07OjqZL.png)
![Extension popup](https://i.imgur.com/cH9BWxm.png)
