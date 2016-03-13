import $ from 'jquery';
import WebFont from 'webfontloader';
import mud from './dependencies/load-behaviour';
import canvasNavigation from './behaviours/canvasNavigation';
import accordion from './behaviours/accordion';
import validation from './behaviours/validation';
import { megaNav } from  './behaviours/megaNav';

WebFont.load({
	typekit: { id: 'vcl8lns' }
});

// assign the data-behaviour functions
mud.Behaviours.canvasNavigation = canvasNavigation;
mud.Behaviours.accordion = accordion;
mud.Behaviours.validation = validation;
mud.Behaviours.megaNav = megaNav;

window.onload = function(){
    mud.onWindowLoad();
};

$(function() {
	mud.loadBehaviour();
});
