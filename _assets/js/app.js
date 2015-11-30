import {Model, LogView} from './modules/collection';

var jack = new Model({
  name: 'jack'
});

var view = new LogView({
  model: jack,
  template: 'Hello, <%= name %>'
});

view.render();