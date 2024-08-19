import Container from "@/layout/Container/Container";
import TrainingCard from "../TrainingCard";

const OurTraining = () => {
  const items = [
    { title: "Rope Workout", image: "/assets/background/1.png" },
    { title: "Rope Workout", image: "/assets/background/2.png" },
    { title: "Rope Workout", image: "/assets/background/3.png" },
    { title: "Rope Workout", image: "/assets/background/4.png" },
    { title: "Rope Workout", image: "/assets/background/5.png" },
    { title: "Rope Workout", image: "/assets/background/6.png" },
  ];
  return (
    <Container>
      <h1 className="text-primary text-center font-medium text-2xl">
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
