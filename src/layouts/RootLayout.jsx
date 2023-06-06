import NavigationBar from "./NavigationBar"
import Footer from "./Footer"

function RootLayout({ session, children }) {
    return (
        <div className="app">
            <NavigationBar session={session} />
            <main className="main">{children}</main>
            <Footer />
        </div>
    )
}

export default RootLayout
