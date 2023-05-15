cd dist
browserify main.js slideshow.js -o app.js
browserify atelier.js functional/effect.js -o ateliermain.js 
browserify guestbook.js interfaces/fieldvalidator.js classes/alphanumvalidator.js classes/compositevalidator.js classes/textlengthvalidator.js types/formfield.js utils/overlay.js -o guestbookmain.js 
browserify poetry.js articles.js -o poetrymain.js 
browserify blogs.js articles.js -o blogsmain.js 
browserify ateliershop.js -o ateliershopmain.js
