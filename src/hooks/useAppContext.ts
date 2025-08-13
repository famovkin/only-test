import { useContext } from 'react';

import { AppContext, AppContextType } from '../App';

const useAppContext = (): AppContextType => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
};

export default useAppContext;
