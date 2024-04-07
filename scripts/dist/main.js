"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const slideshow_1 = require("./slideshow");
const GalleryImageRepository_1 = require("./api/repositories/GalleryImageRepository");
(0, slideshow_1.setUpSlideShow)(new GalleryImageRepository_1.GalleryImageRepository()).then(t => t);
//# sourceMappingURL=main.js.map