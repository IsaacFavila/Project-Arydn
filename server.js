const app = require('./index.js');

app.set('port', 3000);
app.listen(app.get('port'), () => {
  console.log(`listening at http://localhost${app.get('port')}`)
});