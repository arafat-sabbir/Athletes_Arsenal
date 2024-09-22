import { useEffect } from "react";
import { motion } from "framer-motion"; // Assume you have testimonial and team member data here
import Container from "@/layout/Container/Container";
import { teamMembers, testimonials } from "@/data/aboutData/AboutData";

const AboutUs = () => {
  useEffect(() => {
    document.title = "About Us - Gym Equipment Store"; // Set the page title
  }, []);

  return (
    <Container className="px-4 py-12 max-w-6xl mx-auto">
      {/* Company Overview Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
          Welcome to Athlete's Arsenal
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          At Athlete's Arsenal, we provide high-quality gym equipment to help you achieve your fitness goals. Founded in 2010, our mission is to empower individuals with top-notch equipment and excellent customer service.
        </p>
      </motion.section>

      {/* Team Introduction Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-500">
          Meet Our Team
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              whileHover={{ scale: 1.05 }}
              className="p-6 border border-gray-200 rounded-lg shadow-lg bg-white"
            >
              <img
                src={member.photo}
                alt={member.name}
                className="w-32 h-32 mx-auto rounded-full object-cover"
              />
              <h3 className="mt-4 text-xl font-medium text-gray-900">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
              <p className="mt-2 text-gray-500">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Customer Testimonials Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          What Our Customers Say
        </h2>
        <div className="mt-8 space-y-8">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="p-6 border border-gray-200 rounded-lg shadow-lg bg-white"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-gray-800">“{testimonial.message}”</p>
              <p className="mt-4 text-gray-600 font-medium">
                - {testimonial.customerName}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Contact Information Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-12 p-6 border border-gray-200 rounded-lg shadow-lg bg-white"
      >
        <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500">
          Get in Touch
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Have any questions or feedback? Feel free to reach out to us!
        </p>
        <div className="mt-8 space-y-4">
          <p className="text-gray-800">Phone: +123 456 7890</p>
          <p className="text-gray-800">Email: support@Athlete's Arsenal.com</p>
          <p className="text-gray-800">Address: 123 Fitness St, Health City</p>
        </div>
      </motion.section>
    </Container>
  );
};

export default AboutUs;
