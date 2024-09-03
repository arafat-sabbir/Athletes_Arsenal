import Container from "@/layout/Container/Container";
import TrainingCard from "../TrainingCard";

const OurTraining = () => {
  const items = [
    { title: "Rope Workout", image: "/assets/Background/1.png" },
    { title: "Rope Workout", image: "/assets/Background/2.png" },
    { title: "Rope Workout", image: "/assets/Background/3.png" },
    { title: "Rope Workout", image: "/assets/Background/4.png" },
    { title: "Rope Workout", image: "/assets/Background/5.png" },
    { title: "Rope Workout", image: "/assets/Background/6.png" },
  ];
  return (
    <Container className="py-20">
      <h1 className="text-primary text-center font-medium text-2xl pb-10">
        TRAININGS <span className="text-title-dark">WE</span> OFFER
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-hidden">
        {items.map((item, index) => (
          <TrainingCard key={index} data={item} />
        ))}
      </div>
    </Container>
  );
};

export default OurTraining;
