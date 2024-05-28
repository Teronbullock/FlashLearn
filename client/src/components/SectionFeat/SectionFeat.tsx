import './SectionFeat.scss';

interface sectionFeatProps {
  img: {
    src: string;
    alt: string;
  };
  title: string;
  copy: string;
  classObj?: {
    section?: string;
    container?: string;
  };
}

export default function SectionFeat({
  img,
  title,
  copy,
  classObj = { section: '', container: ''}
} : sectionFeatProps): JSX.Element {
  return (
    <section className={`section section-feature ${classObj.section}`}>
      <div className={`container ${classObj.container}`}>
        <div className='section__header md:w-[50%]'>
          <img className='img' src={img.src} alt={img.alt} />
        </div>
        <div className='section__content p-4 md:w-[50%]'>
          <div className='container'>
            <div className='section__content-header'>
              <h2 className='section__content-title my-3'>{title}</h2>
            </div>
            <div className='section__content-body pb-5'>
              <p className='section__content-copy'>{copy}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}