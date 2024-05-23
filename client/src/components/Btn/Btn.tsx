import { Children } from 'react';
import './btn.scss';

interface BtnProps {
  btnClass?: string;
  btnAriaLabel?: string;
  btnClick?: () => void;
  children: React.ReactNode;
  btnType?: 'reg' | 'mobile' | 'reset';
  btn
}

export default function Btn({ btnClass, btnAriaLabel, btnClick, children, btnType = 'reg' }: BtnProps): JSX.Element {
  let btnClassText = '';
  let dataType = '';

  if (!btnClass) {
    btnClass = '';
  }

  if (btnType === 'reg') {
    btnClassText = `btn ${btnClass}`;
  } else if (btnType === 'mobile') {
    btnClassText = `btn-mobile-toggle ${btnClass}`;
    dataType = 'btn-mobile-toggle';
  }


  return (
    <button className={btnClassText} aria-label={btnAriaLabel} onClick={btnClick} data-js={dataType}>{children}
    </button>
  )

}