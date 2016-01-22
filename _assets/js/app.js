import WebFont from 'webfontloader';
import $ from 'jquery';
import mud from './dependencies/load-behaviour';
import menu from './modules/menu'

WebFont.load({
	typekit: { id: 'vcl8lns' }
});

mud.Behaviours.menu = menu;

$(function() {
	mud.loadBehaviour();
});