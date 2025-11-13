import React from "react";

const PublicHomePage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="h-[90vh] flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight uppercase">
          Empowering Freelancers & Clients
        </h1>
        <p className="max-w-2xl mt-6 text-lg text-gray-600">
          HireHaven bridges the gap between talent and opportunity — creating a trusted
          environment where skills meet success.
        </p>
        <div className="mt-8 flex gap-4">
          <button className="btn btn-primary rounded-full">Get Started</button>
          <button className="btn btn-outline rounded-full">Learn More</button>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 border-t border-gray-200 px-8 md:px-20">
        <h2 className="text-3xl font-semibold mb-16 uppercase tracking-wide text-center">
          How HireHaven Works
        </h2>

        <div className="grid md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#75A5FF] text-white flex items-center justify-center text-2xl font-bold">
              1
            </div>
            <h3 className="text-xl font-medium">Create Your Profile</h3>
            <p className="text-gray-600 max-w-sm">
              Set up a professional profile showcasing your expertise, portfolio, and
              skills to attract the right clients or freelancers.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#75A5FF] text-white flex items-center justify-center text-2xl font-bold">
              2
            </div>
            <h3 className="text-xl font-medium">Connect & Collaborate</h3>
            <p className="text-gray-600 max-w-sm">
              Explore verified listings, chat in real-time, and collaborate seamlessly
              with professionals or businesses that match your goals.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#75A5FF] text-white flex items-center justify-center text-2xl font-bold">
              3
            </div>
            <h3 className="text-xl font-medium">Work With Trust</h3>
            <p className="text-gray-600 max-w-sm">
              Secure payments, transparent communication, and verified feedback ensure
              every project delivers mutual growth and trust.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 border-t border-gray-200 px-8 md:px-20 bg-white">
        <h2 className="text-3xl font-semibold mb-16 uppercase tracking-wide text-center">
          Featured Categories
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            "Web Development",
            "Graphic Design",
            "Digital Marketing",
            "Content Writing",
            "App Development",
            "Data & Analytics",
            "Video Editing",
            "Consulting",
          ].map((category, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl py-10 hover:shadow-md transition-all cursor-pointer bg-white"
            >
              <h3 className="text-lg font-semibold">{category}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 border-t border-gray-200 bg-gray-50 px-8 md:px-20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-12 uppercase tracking-wide">
            Why Choose HireHaven
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-14 h-14 bg-[#75A5FF]/10 text-[#75A5FF] rounded-full flex items-center justify-center text-2xl font-bold">
                💎
              </div>
              <h3 className="text-lg font-semibold">Quality Talent</h3>
              <p className="text-gray-600">
                Every freelancer and client is verified to ensure only genuine, skilled
                professionals collaborate.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-14 h-14 bg-[#75A5FF]/10 text-[#75A5FF] rounded-full flex items-center justify-center text-2xl font-bold">
                🔒
              </div>
              <h3 className="text-lg font-semibold">Secure Payments</h3>
              <p className="text-gray-600">
                Escrow-backed transactions ensure safety for both freelancers and clients
                — payment only when the work is done.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-14 h-14 bg-[#75A5FF]/10 text-[#75A5FF] rounded-full flex items-center justify-center text-2xl font-bold">
                ⚡
              </div>
              <h3 className="text-lg font-semibold">Fast Collaboration</h3>
              <p className="text-gray-600">
                Smart matching, instant messaging, and real-time updates keep projects
                moving without delay.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 border-t border-gray-200 bg-white px-8 md:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-10 uppercase tracking-wide">
            Our Vision
          </h2>
          <p className="text-lg leading-relaxed text-gray-700">
            At HireHaven, our vision is to redefine the future of work by building a
            platform where trust, talent, and transparency drive every connection.  
            We believe in empowering individuals to turn their skills into opportunities
            — and organizations to discover talent without barriers.
          </p>
          <p className="mt-6 text-gray-600">
            Our journey is guided by simplicity, fairness, and innovation — creating a
            haven where work feels meaningful and collaboration feels effortless.
          </p>
        </div>
      </section>

     
    </div>
  );
};

export default PublicHomePage;
