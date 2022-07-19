import config from './common/config';
import connectToDB from './common/myDB';
import app from './app';

connectToDB(() =>
  app.listen(config.PORT||3000, () => console.log(`App is running on http://localhost:${config.PORT}`)),
);
