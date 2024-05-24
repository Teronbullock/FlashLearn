import { Children } from 'react';
import { Link } from 'react-router-dom'
import './btn.scss';

interface BtnProps {
  btnClass?: string;
  btnAriaLabel?: string;
  btnURL: string;
  children: React.ReactNode;
  btnDataType?: string;
  btnType?: 'anchor' | 'btn';
  btnClick?: () => void;
}

export default function Btn({ 
  btnClass = '',
  btnAriaLabel,
  btnURL,
  btnDataType,
  children, btnType = 'anchor',
  btnClick
  }: BtnProps): JSX.Element {



  return (
    <>
      { btnType === 'anchor' ? (
        <Link className={`btn ${btnClass}`} to={btnURL} aria-label={btnAriaLabel} data-js={btnDataType}>{children}</Link>
      ) : btnType === 'btn' ? (
        <button className={btnClass} aria-label={btnAriaLabel} onClick={btnClick} data-js={btnDataType}>{children}
        </button> ) : null
      }
    </>
  )

}