import { NextPage } from 'next';

import Layout from '../components/Layout';
import { PageTitleWrapper } from '../styles/Wrapper';

const About: NextPage = () => {
  return (
    <Layout pageTitle="About" withLargeBottomSpace>
      <h1>About</h1>
      <p>
        My name is Olivia. I&apos;m a front-end developer in Paris with 3+ years
        of experience working mostly on B2B products with a tech stack going
        from Jinja templates to single page apps built with React and
        Typescript.
      </p>

      <h2>My tech stack</h2>
      <ul>
        <li>
          React and other libraries in its ecosystem (e.g. Redux and Redux
          Toolkit)
        </li>
        <li>Typescript</li>
        <li>Jest, React Testing Library and Cypress for testing</li>
        <li>
          CSS, SASS and CSS-in-JS solutions like Emotion and Styled Components
        </li>
        <li>xstate and @xstate/react</li>
      </ul>

      <h2>Learning, always</h2>
      <p>
        I&apos;m a self taught developer. What I love about being a developer is
        that we can learn something new every day (even a tiny detail). In 2016,
        I wrote my first few lines of HTML, and it was the start of an
        incredible journey.
      </p>
      <p>Things I currently love learning about:</p>
      <ul>
        <li>
          Web accessibility (semantic HTML, adopting an accessibility first
          approach, understanding the WCAG)
        </li>
        <li>Type systems (exploring this topic with Typescript and Rust)</li>
      </ul>
    </Layout>
  );
};

export default About;
