import NavigationBar from './NavigationBar'
import Footer from './Footer'

function RootLayout({ children }) {
  return (
    <div className='app'>
      <NavigationBar />
      <main className='main'>{children}</main>
      <Footer />
    </div>
  )
}

export default RootLayout
