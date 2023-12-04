import { createContext } from 'react';
import { Cookies } from 'react-cookie';

interface AppContextValue {
  userAgent: string;
  originUrl: string;
  cookies: Cookies;
  isIntranet: boolean;
  isPPMEnabled: boolean;
  correlationId: string;
  regionalDistributor: string | undefined;
  collectionName: string | undefined;
  allowBookADemoConfirmation: boolean;
  geoHeader: string;
  setAllowBookADemoConfirmation(value: boolean): void;
}

const DEFAULT_APP_CONTEXT: AppContextValue = {
  userAgent: '',
  originUrl: '',
  cookies: new Cookies(''),
  isIntranet: false,
  isPPMEnabled: false,
  correlationId: 'test-uuid',
  regionalDistributor: undefined,
  collectionName: undefined,
  allowBookADemoConfirmation: true,
  geoHeader: '',
  setAllowBookADemoConfirmation: () => undefined,
};

const appContext = createContext(DEFAULT_APP_CONTEXT);

export { appContext, DEFAULT_APP_CONTEXT };
export type { AppContextValue };
