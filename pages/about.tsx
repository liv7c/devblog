import {NextPage} from 'next';

import Layout from '../components/Layout';
import {PageTitleWrapper} from '../styles/Wrapper';

const About: NextPage = () => {
  return (
    <Layout pageTitle="About">
      <PageTitleWrapper>
        <h1>About</h1>
      </PageTitleWrapper>
    </Layout>
  );
};

export default About;
