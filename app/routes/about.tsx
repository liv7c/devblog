function AboutPage() {
  return (
    <div>
      <h1>About</h1>

      <p>
        My name is Olivia. I'm a front-end developer in Paris with 4+ years of
        experience working primarily on B2B products.
      </p>

      <h2>Work</h2>

      <ul>
        <li>
          <strong>From October 2018 to now</strong>, I have been working as a
          front-end developer at Meilleurs Agents, building features for a web
          application used by thousands of real estate agencies.
        </li>
        <li>
          <strong>Past projects</strong> include a website for
          <a href="https://www.pierrecoumansbooks.com/">
            an incredible bookshop{' '}
          </a>
          and
          <a href="https://www.swayandbreathe.com/">
            a blog about indie folk music.
          </a>
        </li>
      </ul>

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
        I'm a self-taught developer. What I love about being a developer is that
        we can learn something new every day (even a tiny detail). In 2016, I
        wrote my first few lines of HTML, and it was the start of an incredible
        journey.
      </p>
      <p id="things-love-learning">Things I currently love learning about:</p>
      <ul aria-describedby="things-love-learning">
        <li>
          Web accessibility (semantic HTML, adopting an accessibility first
          approach, understanding the WCAG)
        </li>
        <li>Type systems (exploring this topic with Typescript)</li>
        <li>State machines</li>
      </ul>
    </div>
  );
}

export default AboutPage;
