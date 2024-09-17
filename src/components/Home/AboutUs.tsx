import { Check } from "lucide-react";
import { Button } from "../ui/button";

const AboutUs = () => {
  return (
    <section className="bg-[#292828] px-6 py-10 text-white dark:bg-[#2928285d] md:px-12 lg:px-20 xl:px-40">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-20">
        <div className="flex-shrink-0">
          <img src="/assets/Background/about.png" alt="About Us" className="w-full h-auto" />
        </div>
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-medium tracking-wider">
            The <span className="text-primary">Gym</span> with Safe and{" "}
            <span className="text-primary">Comfort Zone</span>
          </h1>
          <p className="text-base md:text-lg">
            Aenean vel elit scelerisque mauris pellentesque. At varius vel
            pharetra vel turpis. Volutpat odio facilisis mauris sit amet massa
            vitae tortor condimentum.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10 py-6 md:py-10">
            <li className="flex items-center gap-2">
              <Check className="text-primary" /> Maecenas venenatis augue dui
            </li>
            <li className="flex items-center gap-2">
              <Check className="text-primary" /> Maecenas venenatis augue dui
            </li>
            <li className="flex items-center gap-2">
              <Check className="text-primary" /> Maecenas venenatis augue dui
            </li>
            <li className="flex items-center gap-2">
              <Check className="text-primary" /> Maecenas venenatis augue dui
            </li>
          </ul>
          <hr className="h-1 w-full bg-red-500 my-6" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 md:py-10">
            <img src="/assets/logo/bortrio.png" alt="Bortrio" className="w-full h-auto" />
            <img src="/assets/logo/jerix.png" alt="Jerix" className="w-full h-auto" />
            <img src="/assets/logo/rave.png" alt="Rave" className="w-full h-auto" />
            <img src="/assets/logo/urban.png" alt="Urban" className="w-full h-auto" />
          </div>
          <Button size={"xl"} className="mt-6">DISCOVER MORE</Button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
