import { injectState } from 'freactal';

import { storeWrapper } from '~/src/toakee-core/ducks';

export default storeWrapper(injectState(({ children }) => children));
