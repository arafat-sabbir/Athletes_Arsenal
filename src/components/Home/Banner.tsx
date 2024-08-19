import { Button } from "../ui/button";

const Banner = () => {
  return (
    <section className="bg-[url('/assets/background/banner.jpg')] bg-no-repeat  bg-cover bg-center h-[350px] md:h-[500px] lg:h-[840px] m">
      <section className="2xl:px-44 lg:px-32 px-3 w-full h-full mx-auto flex justify-center items-center">
        <div className="space-y-2">
          <h3 className="text-primary text-xl">Exclusive Discount</h3>
          <h1 className="lg:text-7xl text-4xl text-white tracking-wider">
            SELECT <br /> WORKOUT, <br />
            STAY <br /> COMMITTED
          </h1>
          <Button size={"xl"}>Explore Now</Button>
        </div>
        <div className="flex-1"> </div>
      </section>
    </section>
  );
};

export default Banner;
