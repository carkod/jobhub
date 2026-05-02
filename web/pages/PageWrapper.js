import React from "react";
import { useRouter } from "next/router";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Layout from "../src/pages/Layout";

const PageWrapper = ({ children }) => {
  const router = useRouter();
  const timeout = { enter: 300, exit: 200 };
  const currentKey = router.asPath || "/";

  return (
    <Layout>
      <TransitionGroup component="main">
        <CSSTransition
          key={currentKey}
          timeout={timeout}
          classNames="slide"
          appear
        >
          <div>{children}</div>
        </CSSTransition>
      </TransitionGroup>
    </Layout>
  );
};

export default PageWrapper;
