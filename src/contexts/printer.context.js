import React from 'react';

export const printer = { status: null, setStatus: () => {}, info: null, setInfo: () => {} }
export const PrinterContext = React.createContext(printer);