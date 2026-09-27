import { app } from './app.js';
import { seedDatabase } from './seed/index.js';

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

await seedDatabase();

app.listen(PORT, HOST, () => {
  console.log(`Kettle & Crate listening on :${PORT}`);
});
