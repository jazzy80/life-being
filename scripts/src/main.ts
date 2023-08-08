import {setUpSlideShow} from "./slideshow";
import {GalleryImageRepository} from "./api/repositories/GalleryImageRepository";

setUpSlideShow(new GalleryImageRepository()).then(t => t);
