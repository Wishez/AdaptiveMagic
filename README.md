# What is AdaptiveMagic?

   Adaptive Magic is a magic tool giving you to execude your code **by different screen's widht sizes** in JavaScript code. You can think about like **breakpoints for media queries** in CSS but only in JavaScript.

# Install
  
  It's easy!
  
  `npm i --save adaptivemagic`
  
# Examples


  You can play around on dev-server with completed examples just folow this instructions.
  
  1. Clone the repository　－ `git clone https://github.com/Wishez/AdaptiveMagic.git`.
  
  2. Open a console, go to the "test" folder in the clopied repository － `cd path/to/repo/test`, run `npm i`, and wait. 
  
  3. A last step is to run simple command ー gulp.
  
  The files, you can change and play, is placed in src folder.
 
  That's it!
  
  
# Usage
  
  Import it:
  
  `import AM from 'adaptivemagic';`
  
  or use
  
  `const AM = require('adaptivemagic');` 
  
  The Adaptive Magic has magic **breakpoints by default**:

```javascript
  
  // The page loading  
  window.addEventListener('load', function() {
      const $testBlock = document.getElementById('#testBlock');  
      const changeContent = text => {
          $testBlock.innerHTML = text;
      };
      
      // And code is executing
    
	AM.doBy('lgUp', () => {
		changeContent(
			'Cahnge text by Large and Up screen\'s width.'
		);
	}); // end doBy lgUp
      
	AM.doBy('md', () => {
		changeContent(
			  'Cahnge text by Medium screen.'
		);
	}); // end doBy md
    
  	AM.doBy('sm', () => {
		changeContent(
			'Cahnge text by Small screen.'
		);
  	}); // end doBy sm
      
	AM.doBy('xs', () => {
		changeContent(
			'Cahnge text by Extra-small screen.'
	  	);
  	}); // end doBy xs
      
      	AM.doBy('xxs', () => {
		changeContent(
			'Cahnge text by Extra-extra-small screen.'
		);
	}); // end doBy xxs    
  });
```
  
  But you can custom **yours own breakpoints** and execute your code when browser's window **is resized** just user a plain object instead a default breakpoint name:
  
```javascript 
    const xsToLg = {
    	name: 'xsToLg',
	min: 779,
	max: 1200
    };
```
    
    1. The name is needed for not repeating code by same screen's width when the page is resized. It's required.
    
    2. A min value is a min value of a screen's width.
    
    3. A max value is  a screen's width's max value.
    
    You can leave **one of** min or max. It means, code will execute　－ while a screen's width isn't max, or a screen's width isn't min, but one of them is necessery, otherwise, you won't get the magic effect. Keep in mind!
    
    
```javascript
  
    window.addEventListener('load', function() { 
      const xsToAlmostMd = {
      	  name: 'xsToAlmostMd',
          min: 799,
          max: 850
      };
      
      window.addEventListener('resize', function() {
  	  
          AM.doBy(
	    xsToAlmostMd,
            () => {
              // Func from last example.
              changeContent(
                'It shows content when the screen\'s widht is between 790px and 850px.'
              );
            }
        ); // end doBy
      }); // end resize event
    }); // end load event
```
  
  And last thing is to execute code ever by a set breakpoint when a screen's width will be changed. 
  Use function  **AM.changeLimitationMode**.
  
```javascript
  window.addEventListener('load', function() { 
      window.addEventListener('resize', function() {
  
          AM.doBy('sm', () => {
	      changeContent(
		      'Cahnge text by Small screen.'
	      );
    
	      console.log('It limits the execution when the screen\'s width same.');
	      AM.changeLimitationMode(true);
      	  }); // end doBy sm
          
          AM.doBy('xs', () => {
	      changeContent(
		      'Cahnge text by Extra-small screen.'
	      );
          
	      console.log('The Code by xs screen\'s width will be calling very often.');
	      AM.changeLimitationMode(false);
      	}); // end doBy xs 
      }) // end resize event
      
  }); // end load event
```
  
  # About author
  
    He is, absorbing knowledge of web-development, developer.
    
    It's his first documentation. Did you get what he wrote about? 
    And if not, just write him ー shiningfinger@list.ru
  
  # License
  
    AdaptiveMagic has MIT license. Don't worry about, just use it!
