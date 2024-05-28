import { Children } from 'react';
import { Link } from 'react-router-dom'
import './Btn.scss';

interface BtnProps {
  btnClass?: string;
  btnAriaLabel?: string;
  btnURL: string;
  children: React.ReactNode;
  btnDataType?: string;
  btnType?: 'anchor' | 'btn';
  btnClick?: () => void;
  type?: 'submit' | 'reset' | 'button' | undefined;
}

/**
 * 
 * @param btnClass -
 * @param btnAriaLabel
 * @param btnURL
 * @param children
 * @param btnDataType
 * @param btnType - anchor | btn
 * @param btnClick 
 * @param type
 * @returns 
 */
export default function Btn({ 
  btnClass = '',
  btnAriaLabel,
  btnURL,
  btnDataType,
  children, btnType = 'anchor',
  btnClick,
  type = undefined
  }: BtnProps): JSX.Element {



  return (
    <>
      { btnType === 'anchor' ? (
        <Link className={`btn ${btnClass}`} to={btnURL} aria-label={btnAriaLabel} data-js={btnDataType}>{children}</Link>
      ) : btnType === 'btn' ? (
        <button className={btnClass} aria-label={btnAriaLabel} onClick={btnClick} data-js={btnDataType} type={type}>{children}
        </button> ) : null
      }
    </>
  )

}