import WebFont from 'webfontloader';
import $ from 'jquery';
import mud from './dependencies/load-behaviour';
import menu from './modules/menu';
import accordion from './modules/accordion';
// import Viewport from './helpers/viewport.js';

WebFont.load({
	typekit: { id: 'vcl8lns' }
});



mud.Behaviours.menu = menu;
mud.Behaviours.accordion = accordion;

$(function() {
	mud.loadBehaviour();
});