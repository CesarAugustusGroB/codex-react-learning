const React = require('react');
module.exports = {
  ChakraProvider: ({ children }) => React.createElement(React.Fragment, null, children),
  Box: ({ children, ...props }) => React.createElement('div', props, children),
  Flex: ({ children, ...props }) => React.createElement('div', props, children),
  Grid: ({ children, ...props }) => React.createElement('div', props, children),
  Heading: ({ children, ...props }) => React.createElement('h2', props, children),
  extendTheme: (...args) => ({ ...args }),
};
