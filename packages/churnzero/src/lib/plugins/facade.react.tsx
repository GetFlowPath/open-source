import { ReactElement, ReactNode } from 'react';
import * as React from 'react';

export type ChurnZeroContextValue = {
  churnZero: any;
};
export type ChurnZeroContextShape = {
  children: ReactNode;
};

const ChurnZeroContext = React.createContext<ChurnZeroContextValue | undefined>(undefined);
ChurnZeroContext.displayName = 'ChurnZeroContext';

const ChurnZeroProvider = React.memo((props: ChurnZeroContextShape): ReactElement => {
  // TODO
  const churnZero: any = {};

  const value: ChurnZeroContextValue = React.useMemo(
    () => ({
      churnZero,
    }),
    [churnZero]
  );

  return <ChurnZeroContext.Provider value={value} {...props} />;
});

function useChurnZeroContext(): ChurnZeroContextValue {
  const context = React.useContext(ChurnZeroContext);
  if (context === undefined) {
    throw new Error(`useChurnZeroContext must be used within a ChurnZeroProvider`);
  }
  return context;
}

export { ChurnZeroProvider, useChurnZeroContext };
