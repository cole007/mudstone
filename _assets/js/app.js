import $ from 'jquery';
import WebFont from 'webfontloader';
import mud from './dependencies/load-behaviour';
import canvasNavigation from './behaviours/canvasNavigation';
import accordion from './behaviours/accordion';
import validation from './behaviours/validation';

WebFont.load({
	typekit: { id: 'vcl8lns' }
});

// assign the data-behaviour functions
mud.Behaviours.canvasNavigation = canvasNavigation;
mud.Behaviours.accordion = accordion;
mud.Behaviours.validation = validation;

window.onload = function(){
    mud.onWindowLoad();
};

$(function() {
	mud.loadBehaviour();
});
