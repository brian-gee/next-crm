import React from "react";
import { KeyedMutator } from "swr";

interface DataContextType {
  mutate: KeyedMutator<any>;
}

const defaultMutate: KeyedMutator<any> = async () => {};

const DataContext = React.createContext<DataContextType>({
  mutate: defaultMutate,
});

export default DataContext;
