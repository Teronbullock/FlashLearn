import SectionForm from '../components/SectionForm/SectionForm';

export default function Register(): JSX.Element {
  return (
    <main className="main main--register">
      <SectionForm formType='register' />
    </main>
  );
}