import './hero.scss'

interface HeroProps {
  heroAriaLabel: string;
  content: {
    title: string;
    copy: string;
  }
}

export default function Hero({heroAriaLabel, content}: HeroProps): JSX.Element {

  return(
    <section className="hero" aria-label={`${heroAriaLabel}`}>
      <div className="hero__container container h-full relative mx-auto">
        <div className="hero_content absolute left-0 bottom-[15%] sm:max-w-[250px] bottom-[10%] md:max-w-[205px] lg:max-w-[375px] xl:max-w-[500px]">
          <h1 className="hero_title text-white mb-6">{content.title}</h1>
          <p className="hero__copy">{content.copy}</p>
          {/* //btn */}
        </div>
      </div>
    </section>
  )

}