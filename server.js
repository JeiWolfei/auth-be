require('dotenv').config();
require('./lib/utils/connect')();

const app = require('./lib/app');

app.listen(7890, () => {
  // eslint-disable-next-line no-console
  console.log('port 7890');
});
