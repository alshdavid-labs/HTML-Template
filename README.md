=============  
HTML-Template
=============

This is a basic template that has some basic task runner settings to automatically transpiles SCSS/SASS, uglifies JS and live reloads any changes you make to your files, in your browswer.

--------------------------
Installation Instructions:
--------------------------

In the root directory run the following command:
```
npm install
```

-------------------
Usage Instructions:
-------------------

In the root directory run the following command:
```
npm run start
```

You must build before distributing the site.
To do so run:
```
npm run build
```

----------------------------
##Webpack Installation:

You probably don't need to do this, but if it doesn't work, it can't hurt to try install these globally:

```
npm install -g webpack webpack-dev-server
```

------
Notes:
------

This has babel and babel loader included, so you can use `import` and `es6`

The starter js file is in /scripts