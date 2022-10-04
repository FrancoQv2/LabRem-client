import NavigationBar from "./NavigationBar";
import Footer from "./Footer";

function RootLayout({ children }) {
  return (
    <>
      <NavigationBar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default RootLayout;
