import './Hero.scss'
import Btn from '../../components/Btn/Btn';

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
        <div className="hero_content absolute left-0 bottom-[15%] sm:max-w-[250px] sm:bottom-[10%] md:max-w-[205px] lg:max-w-[375px] xl:max-w-[500px] xl:px-4">
          <h1 className="hero_title text-white mb-6">{content.title}</h1>
          <p className="hero__copy">{content.copy}</p>
          <Btn 
            btnClass='btn--primary btn--large'
            btnURL='/register'
            btnAriaLabel='Sign Up'
          >
            Sign Up
          </Btn>
        </div>
      </div>
    </section>
  )

}