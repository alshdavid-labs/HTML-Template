=============  
HTML-Template
=============

This is a basic template that has some basic task runner settings to automatically transpiles SCSS/SASS, uglifies JS and live reloads any changes you make to your files, in your browswer.

--------------------------
Installation Instructions:
--------------------------

In the root directory run the following commands
```
npm install
```

-------------------
Usage Instructions:
-------------------
```
grunt
```

----------------------------
Grunt Installation:
If you do not have grunt globally installed:

```
npm install -g grunt
```
```
npm install -g grunt-cli
```
----------------------------

---------------------
Running Instructions:
---------------------

Do not modify the files in the 'public/' direcotry, they are auto generated and often overwritten.
All of the working files are located in the 'private/' directory.

--------


The index.html is the main html file, modify that to make changes to the website.

The service watches for all changes in the 'private/' directory.
	
    - This includes additional source items like image files you may add.

The 'scripts/' and 'styles/' folders are exclusivly for Javascript and SCSS files, within their respectfully named folder. 

All JS is uglified/minified and all SCSS is transpiled to the 'public/' directory   

Only those folders will have the SCSS and JS minified and transpiled. Folders external to them will be copied "as is" to the 'public/' directory

<link> and <script> imports are 1:1, anything you import on one end will be reflected identically on the other. In other words, the files are not combined. 

Any aditional tasks can be added to this, this just serves as a basic well rounded scaffold for a new project


Note: to have access to the SASS/TS error log, you will need to run two console windows, one running "grunt watch" and the other running "grunt browserSync" 

==========

ToDo > Setup Babble for ES6 JS compilation
