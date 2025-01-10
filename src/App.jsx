import MainComponent from "./pages/MainComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import InfoPage from "./pages/InfoPage";
import PostForm from "./pages/PostForm";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route Component={DefaultLayout}>
          <Route index Component={HomePage} />
          <Route path="/posts" Component={MainComponent} />
          <Route path="/create" Component={PostForm} />
          <Route path="/contact" Component={ContactPage} />
          <Route path="/info" Component={InfoPage} />
        </Route>
      </Routes>
    </BrowserRouter>

    // <>
    //   <HeaderComponent />
    //   <MainComponent />
    //   <FooterComponent />
    // </>
  )
}

export default App;
