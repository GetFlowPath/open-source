import React, { ReactElement, ReactNode } from 'react';
import {ChurnZero, Config} from "@open-source/ChurnZero";

export type ChurnZeroContextValue = {
  churnZero: any;
};
export type ChurnZeroContextShape = {
  children: ReactNode;
  config: Config;
};

const ChurnZeroContext = React.createContext<ChurnZeroContextValue | undefined>(undefined);
ChurnZeroContext.displayName = 'ChurnZeroContext';

const ChurnZeroProvider = React.memo( (props: ChurnZeroContextShape): ReactElement => {
  const churnZeroGenerator: any = async () => await ChurnZero.connect(props.config);
  const churnZero = churnZeroGenerator();
  const value: ChurnZeroContextValue = React.useMemo(
    () => ({
      ...churnZero,
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
