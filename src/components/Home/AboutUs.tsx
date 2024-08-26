import { Check } from "lucide-react";
import { Button } from "../ui/button";

const AboutUs = () => {
  return (
    <section className="bg-[#292828] px-40 py-10 text-white dark:bg-[#2928285d]">
      <div className="flex gap-20">
        <div>
          <img src={"/assets/background/about.png"} alt="" />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-medium tracking-wider">
            The <span className="text-primary">Gym</span> with Safe and{" "}
            <span className="text-primary">Comfort Zone</span>
          </h1>
          <p>
            Aenean vel elit scelerisque mauris pellentesque. At varius vel
            pharetra vel turpis. Volutpat odio facilisis mauris sit amet massa
            vitae tortor condimentum.
          </p>
          <ul className="grid grid-cols-2 gap-10 py-10">
            <li className="flex items-center gap-1">
              <Check /> Maecenas venenatis augue dui
            </li>
            <li className="flex items-center gap-1">
              <Check /> Maecenas venenatis augue dui
            </li>
            <li className="flex items-center gap-1">
              <Check /> Maecenas venenatis augue dui
            </li>
            <li className="flex items-center gap-1">
              <Check /> Maecenas venenatis augue dui
            </li>
          </ul>
          <hr className="h-1 w-full bg-red-500" />
          <h3></h3>
          <div className="grid grid-cols-2 gap-10 py-10">
            <img src="/assets/logo/bortrio.png" alt="" />
            <img src="/assets/logo/jerix.png" alt="" />
            <img src="/assets/logo/rave.png" alt="" />
            <img src="/assets/logo/urban.png" alt="" />
          </div>
          <Button size={"xl"}>DISCOVER MORE</Button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
