import NavigationBar from "./NavigationBar";
import Footer from "./Footer";

function RootLayout({ session, children }) {
  return (
    <>
      <NavigationBar session={session}/>
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default RootLayout;
