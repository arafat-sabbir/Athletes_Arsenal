import Container from "@/layout/Container/Container";

const OurTrainer = () => {
  return (
    <Container className="py-20">
      <h1 className="text-3xl tracking-widest font-medium font-zen text-center">
        ADVANCED <span className="text-primary font-zen">FITNESS</span> <br />
        TRAINERS <span className="text-primary font-zen">AVAILABLE</span>{" "}
      </h1>
      <div className="grid grid-cols-1 pt-16 gap-10 lg:grid-cols-2 md:grid-cols-1 xl:grid-cols-4">
        <div className="flex flex-col">
          <img src="/assets/trainer/1.png"alt="" />
          <h1 className="pt-20 pl-10 text-2xl font-zen">AKKAS ALI</h1>
        </div>
        <div className="pt-20">
          <h1 className="pb-20 pl-10 text-2xl font-zen">JAKKHAS ALI</h1>
          <img src="/assets/trainer/2.png" alt="" />
        </div>
        <div>
          <img src="/assets/trainer/3.png" alt="" />
          <h1 className="pt-20 pl-10 text-2xl font-zen">TOMTOM</h1>
        </div>
        <div className="pt-20">
          <h1 className="pb-20 pl-10 text-2xl font-zen">ZENON</h1>
          <img src="/assets/trainer/4.png" alt="" />
        </div>
      </div>
    </Container>
  );
};

export default OurTrainer;
