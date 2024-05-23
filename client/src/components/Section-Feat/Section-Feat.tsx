export default function SectionFeat({img, title, copy}) {
  return (
    <section className="section section-feature">
      <div className="container">
        <div className="section__header">
          <img className='img' src={img.src} alt={img.alt} />
        </div>
        <div className="section__content">
          <div className="container">
            <div className="section__content-header">
              <h2 className="section__content-title">{title}</h2>
            </div>
            <div className="section__content-cody">
              <p className="section__content-copy">{copy}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}