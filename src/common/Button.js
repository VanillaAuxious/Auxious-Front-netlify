import './Button.css';

export function LongButton({ className, children }) {
  const classes = `long ${className}`;

  return <button className={classes}>{children}</button>;
}

export function ShortButton({ className, children }) {
  const classes = `short ${className}`;

  return <button className={classes}>{children}</button>;
}

export function SearchButton({ className, children, onClick }) {
  const classes = `search ${className}`;

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
