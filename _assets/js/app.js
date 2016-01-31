import WebFont from 'webfontloader';
import $ from 'jquery';
import mud from './dependencies/load-behaviour';
import canvasNavigation from './modules/canvasNavigation';
import accordion from './modules/accordion';
import validation from './modules/validation';

WebFont.load({
	typekit: { id: 'vcl8lns' }
});



mud.Behaviours.canvasNavigation = canvasNavigation;
mud.Behaviours.accordion = accordion;
mud.Behaviours.validation = validation;

$(function() {
	mud.loadBehaviour();
});