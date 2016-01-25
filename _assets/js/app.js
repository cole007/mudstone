import WebFont from 'webfontloader';
import $ from 'jquery';
import mud from './dependencies/load-behaviour';
import menu from './modules/menu';
import accordion from './modules/accordion';
import viewport from './helpers/viewport.js';

WebFont.load({
	typekit: { id: 'vcl8lns' }
});

var test = new viewport();


mud.Behaviours.menu = menu;
mud.Behaviours.accordion = accordion;

$(function() {
	mud.loadBehaviour();
});