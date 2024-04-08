import Container from "../container/Container";
import Header from "../header/Header";

function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main>
        <Container>{children}</Container>
      </main>
    </>
  );
}

export default MainLayout;
