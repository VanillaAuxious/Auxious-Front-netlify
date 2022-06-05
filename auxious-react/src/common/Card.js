import React from 'react';

export function Card({ className, children }) {
  const classes = `search ${className}`;

  return <button className={classes}>{children}</button>;
}
