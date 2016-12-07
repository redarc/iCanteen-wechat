/**
 * Main application routes
 */

'use strict';

var errShortcuts = require('./components/errors').shortcuts;

import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/orders', require('./api/order'));
  app.use('/api/operation_records', require('./api/operation_record'));
  app.use('/api/serve_plan', require('./api/serve_plan'));
  app.use('/api/meals', require('./api/meal'));
  app.use('/api/dishes', require('./api/dish'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/services', require('./api/service'));

  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errShortcuts[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
