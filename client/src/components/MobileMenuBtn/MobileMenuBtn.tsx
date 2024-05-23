import './mobile-menu-btn.scss';

export default function MobileMenuBtn(): JSX.Element {
  return (
    <button className="btn-mobile-toggle w-[40px] h-[40px] rounded border-0 bg-black inline-block absolute top-4 right-4 cursor-pointer z-[500] outline-none md:hidden" data-js="btn-mobile-toggle">
      <div className="btn-bar1 bg-white my-2 mx-0"></div>
      <div className="btn-bar2 bg-white my-2 mx-0"></div>
      <div className="btn-bar3 bg-white my-2 mx-0"></div>
    </button>
  )
}