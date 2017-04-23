import fs from 'fs';
import path from 'path';

import GraphqlAPI from '~/src/toakee-core/apis/graphql';

(async () => {
  const schema = await GraphqlAPI.downloadSchema();
  fs.writeFileSync(
    path.join(__dirname, '../data/schema.json'),
    JSON.stringify(schema),
  );
})();
