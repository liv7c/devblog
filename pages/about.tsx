import { NextPage } from 'next';

import Layout from '../components/Layout';
import { PageTitleWrapper } from '../styles/Wrapper';

const About: NextPage = () => {
  return (
    <Layout pageTitle="About">
      <PageTitleWrapper largeSpace>
        <h1>About</h1>
        <p>
          My name is Olivia. I&apos;m a front-end developer in Paris with 3+
          years of experience working mostly on B2B products with a tech stack
          going from Jinja templates to single page apps built with React and
          Typescript.
        </p>

        <h2>My tech stack</h2>
        <ul>
          <li>
            React and other libraries in its ecosystem (Redux, React Testing
            Library, Emotion)
          </li>
          <li>Typescript</li>
          <li>Jest and Cypress for testing</li>
          <li>CSS, SASS and CSS-in-JS solutions like Emotion</li>
          <li>xstate and @xstate/react</li>
        </ul>

        <h2>Learning, always</h2>
        <p>
          I&apos;m a self taught developer. In 2016, I wrote my first few lines
          of HTML and it was the start of an incredible journey. What I love
          about being a developer is that we can learn something new every
          single day (even a small detail).
        </p>
        <p>Things I currently love learning about:</p>
        <ul>
          <li>
            Web accessibility (semantic HTML, adopting an accessibility first
            approach, decrypting the WCAG)
          </li>
          <li>Type systems (exploring this topic with Typescript and Rust)</li>
        </ul>
      </PageTitleWrapper>
    </Layout>
  );
};

export default About;
