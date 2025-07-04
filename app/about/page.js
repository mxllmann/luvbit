import Header from "../_components/Header";
import Footer from "../_components/Footer";
import Link from 'next/link';
import AboutCard from "../_components/AboutCard";

export default function About() {
const topics = [
  {
    title: 'About Luvbit',
    color: 'text-pink-400',
    image: '/default4.png',
    content: (
      <>
        <p className="text-base text-zinc-400 italic">
          Some messages don’t seek a response. They just need to exist in silence.
        </p>
      </>
    )
  },
  {
    title: 'What is Luvbit?',
    color: 'text-purple-400',
    image: '/default3.png',
    content: (
      <>
        <p>
          Luvbit is a personal project created to allow people to share thoughts freely, outside traditional communication flows.
        </p>
        <p className="mt-2">
          Here, each message exists in a space where anonymity, time, and the absence of noise define the context.
        </p>
      </>
    )
  },
  {
    title: 'Privacy & Structure',
    color: 'text-green-400',
    image: '/default2.png',
    content: (
      <>
        <p>
          All submitted content (text, author, and image) is encrypted using the{' '}
          <a
            href="https://www.kiteworks.com/risk-compliance-glossary/aes-256-encryption/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-300 font-bold hover:underline"
          >
            AES-256-CBC algorithm
          </a>{' '}
          before being stored.
        </p>
        <p className="mt-2">
          We do not use cookies. There is no analytics, tracking logs, or identification of who creates or accesses the whispers. Reading is free. Origin is irrelevant.
        </p>
      </>
    )
  },
  {
    title: 'Infrastructure',
    color: 'text-blue-400',
    image: '/default1.png',
    content: (
      <>
        <p>Luvbit is built with:</p>
        <ul className="list-disc list-inside pl-4 text-sm text-zinc-400 mt-2">
          <li>Next.js 15+ (Frontend)</li>
          <li>Express.js (API Backend)</li>
          <li>MongoDB (Database)</li>
          <li>Motion and Tailwind CSS (Style and Transitions)</li>
        </ul>
      </>
    )
  },
];
 
         return (
            <>
            <Header/>
    <main className="min-h-screen bg-black text-zinc-300 px-6 py-12 mt-25">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
        {topics.map((t, i) => (
          <AboutCard key={i} title={t.title} color={t.color} image={t.image}>
            {t.content}
          </AboutCard>
        ))}
      </div>
      <div className="text-center text-sm mt-16 border-t border-zinc-700 pt-6">
        <p>
          Criado por{' '}
          <Link
            href="https://github.com/mxllmann/luvbit"
            target="_blank"
            className="text-pink-400 hover:text-purple-400 transition"
          >
            Arthur Mallmann
          </Link>
        </p>
      </div>
    </main>
    <Footer/>
    </>
     
    );
}