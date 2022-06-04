// 주요색 + 긴거
// 진한색 + 긴거
// 진한색 + 짧은거
// 회색 + 짤은거
import './style.css';

export function LongButton({ className, children }) {
  const classes = `long ${className}`;
  return <button className={classes}>{children}</button>;
}

export function ShortButton({ className, children }) {
  const classes = `short ${className}`;

  return <button className={classes}>{children}</button>;
}
