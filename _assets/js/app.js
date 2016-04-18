import WebFont from 'webfontloader';
import mud from './dependencies/load-behaviour';

import { megaNav } from  './behaviours/megaNav';
import canvasNavigation from './behaviours/canvasNavigation';

import accordion from './behaviours/accordion';
import carousel from './behaviours/carousel';
import slide from './behaviours/slide';
import video from './behaviours/video';
import map from './behaviours/map';



WebFont.load({
	typekit: { id: 'vcl8lns' }
});


// assign the data-behaviour functions
mud.Behaviours.canvasNavigation = canvasNavigation;
mud.Behaviours.megaNav = megaNav;


mud.Behaviours.accordion = accordion;
mud.Behaviours.carousel = carousel;
mud.Behaviours.slide = slide;
mud.Behaviours.video = video;
mud.LoadWindow.map = map;

window.onload = function(){
    mud.onWindowLoad();
};

$(function() {
	mud.loadBehaviour();
});
