cd dist
browserify main.js slideshow.js -o app.js
browserify atelier.js functional/effect.js -o ateliermain.js 
browserify guestbook.js interfaces/fieldvalidator.js classes/alphanumvalidator.js classes/compositevalidator.js classes/textlengthvalidator.js types/formfield.js utils/overlay.js -o guestbookmain.js 
browserify ateliershop.js -o ateliershopmain.js
