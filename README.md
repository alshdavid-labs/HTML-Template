# HTML-Template

Got a bit sick of the complex HTML templates out there, so this one is focused on simplicity.

This leverages some simple (and essential) tasks, including CSS and HTML precompilers.

![Imgur](http://i.imgur.com/NWDGVOO.png)

## Installation Instructions

In the root directory run the following command:
```
npm install
```

```
yarn
```

## Usage Instructions

In the root directory run the following command:

```
npm start
```

This will watch changes to the `/src/` folder and push them into a `/dist/` folder.

The `/dist/` folder is safe to distribute/publish.

To build use:

```
npm run build
```

The task running includes:

> SCSS  
> CSS Auto-prefixing  
> Buildtime HTML include

The HTML includer uses the following syntax:

```
&&include "path/to/html"
```


----------------------------

## Grunt Installation:

If you do not have grunt globally installed:

```
npm install -g grunt
```

