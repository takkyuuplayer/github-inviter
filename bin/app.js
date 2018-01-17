import app from 'entries/backend';

const PORT = process.env.PORT || 5000;
/* eslint-disable no-console */
app.listen(PORT, () => console.log('ready!'));
