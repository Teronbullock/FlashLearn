import { Link } from 'react-router-dom';

export default function BtnClose(): JSX.Element {
  return (
    <Link className='btn-close text-black text-2xl absolute top-4 right-6 cursor-pointer z-[100]' to='/' aria-label='Close Button'>X</Link>
  )
}