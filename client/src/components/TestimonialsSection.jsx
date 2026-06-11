import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import api from "../api/api";

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await api.get("/testimonials");
        setTestimonials(response.data.testimonials || []);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          Loading testimonials...
        </div>
      </section>
    );
  }

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 3).length < 3
    ? [...testimonials.slice(currentIndex), ...testimonials.slice(0, Math.max(0, 3 - (testimonials.length - currentIndex)))]
    : testimonials.slice(currentIndex, currentIndex + 3);

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 border-t border-gray-100/10">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-brand mb-3 sm:mb-4">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-4 sm:mb-6">
            What our <span className="text-brand">clients say</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
            Real feedback from teams we've worked with across different industries and project types.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
          {visibleTestimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-slate-900/60 to-slate-950/60 border border-gray-700/30 rounded-xl p-6 sm:p-8 flex flex-col space-y-4 hover:border-brand/30 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex items-center gap-1">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed flex-1">
                "{testimonial.comment}"
              </p>

              {/* Author */}
              <div className="pt-4 sm:pt-6 border-t border-gray-700/30 flex items-center gap-3 sm:gap-4">
                {testimonial.avatarUrl ? (
                  <img
                    src={testimonial.avatarUrl}
                    alt={testimonial.authorName}
                    className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-brand to-ink flex items-center justify-center flex-shrink-0 text-white font-semibold">
                    {testimonial.authorName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-sm sm:text-base truncate">
                    {testimonial.authorName}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400 truncate">
                    {testimonial.authorTitle}
                    {testimonial.authorTitle && testimonial.authorCompany && " at "}
                    {testimonial.authorCompany}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        {testimonials.length > 3 && (
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={handlePrev}
              className="p-2 sm:p-2.5 rounded-lg border border-gray-700/30 hover:border-brand/50 text-gray-400 hover:text-brand transition"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 w-2 rounded-full transition ${
                    idx === currentIndex ? "bg-brand w-6" : "bg-gray-700"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2 sm:p-2.5 rounded-lg border border-gray-700/30 hover:border-brand/50 text-gray-400 hover:text-brand transition"
              aria-label="Next testimonials"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
