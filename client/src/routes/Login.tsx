import SectionForm from '../components/SectionForm/SectionForm';

export default function Register(): JSX.Element {
  return (
    <main className="main main--login">
      <SectionForm formType='login' />
    </main>
  );
}