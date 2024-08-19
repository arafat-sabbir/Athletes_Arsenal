import AboutUs from "./components/Home/AboutUs";
import Banner from "./components/Home/Banner";
import NewArrival from "./components/Home/NewArrival";
import OurTrainer from "./components/Home/OurTrainer";
import OurTraining from "./components/Home/OurTraining";
import Navbar from "./components/Navbar/Navbar";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <Navbar />
      <Banner />
      <OurTraining />
      <NewArrival />
      <AboutUs />
      <OurTrainer />
      <ScrollToTop />
    </>
  );
}

export default App;
