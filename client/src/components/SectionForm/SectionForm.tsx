interface SectionFormProps {
  
}


export default function SectionForm({  }:SectionFormProps): JSX.Element {
  let userRegistered = false;
  let sectionClass = '';

  if (userRegistered) {
    sectionClass = 'form-container--registered';
  }

  return (
    <section className={`container form-container ${sectionClass}`}></section>
  );
}