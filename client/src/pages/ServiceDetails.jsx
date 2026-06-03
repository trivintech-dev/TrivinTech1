import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api.js";
import SectionHeading from "../components/SectionHeading.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import {
  CheckCircle,
  ArrowRight,
  Zap,
  Shield,
  TrendingUp,
  Clock,
  Users,
  Target,
  Award,
  Lightbulb,
  Code,
  Layers,
  MessageSquare,
  Calendar,
  Star
} from "lucide-react";

const ServiceDetails = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [service, setService] = useState(null);
  const [related, setRelated] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [bookingForm, setBookingForm] = useState({ scheduleDate: "", notes: "" });
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });

  useEffect(() => {
    const fetchDetails = async () => {
      const [{ data: serviceData }, { data: reviewData }] = await Promise.all([
        api.get(`/services/${id}`),
        api.get(`/reviews/services/${id}`)
      ]);
      setService(serviceData.service);
      setRelated(serviceData.related || []);
      setReviews(reviewData.reviews || []);
    };

    fetchDetails();
  }, [id]);

  const handleBooking = async (event) => {
    event.preventDefault();
    await api.post(`/bookings/services/${id}`, bookingForm);
    setBookingForm({ scheduleDate: "", notes: "" });
  };

  const handleReview = async (event) => {
    event.preventDefault();
    await api.post(`/reviews/services/${id}`, reviewForm);
    setReviewForm({ rating: 5, comment: "" });
    const { data } = await api.get(`/reviews/services/${id}`);
    setReviews(data.reviews || []);
  };

  if (!service) {
    return <div className="py-20 text-center text-white">Loading...</div>;
  }

  // Sample features and benefits data - can be extended from API
  const keyFeatures = [
    { icon: Lightbulb, title: "Custom Solutions", desc: "Tailored to your needs" },
    { icon: Shield, title: "Security & Compliance", desc: "Enterprise-grade protection" },
    { icon: TrendingUp, title: "Performance", desc: "Optimized for speed" },
    { icon: Users, title: "24/7 Support", desc: "Dedicated team support" },
    { icon: Code, title: "Clean Code", desc: "Maintainable & scalable" },
    { icon: Award, title: "Industry Standard", desc: "Best practices applied" }
  ];

  const benefits = [
    { icon: CheckCircle, title: "Increased Productivity", desc: "Streamlined workflows and automation" },
    { icon: TrendingUp, title: "Better Performance", desc: "Optimized systems for maximum efficiency" },
    { icon: Shield, title: "Enhanced Security", desc: "Protect your data with advanced measures" },
    { icon: Clock, title: "Faster Time-to-Market", desc: "Quick deployment and integration" },
    { icon: Target, title: "Improved User Experience", desc: "Intuitive and engaging interface" },
    { icon: Zap, title: "Reduced Costs", desc: "Efficient solutions that save money" }
  ];

  const servicesIncluded = [
    "Initial Consultation & Analysis",
    "Planning & Strategy Development",
    "Design & Architecture",
    "Full Development Implementation",
    "Integration & API Development",
    "Testing & Quality Assurance",
    "Deployment & Launch",
    "Training & Documentation",
    "Ongoing Support & Maintenance"
  ];

  const workflowSteps = [
    { step: "1", title: "Discovery", desc: "Understand requirements" },
    { step: "2", title: "Planning", desc: "Create strategy" },
    { step: "3", title: "Design", desc: "Visual mockups" },
    { step: "4", title: "Development", desc: "Build solution" },
    { step: "5", title: "Testing", desc: "Quality assurance" },
    { step: "6", title: "Deployment", desc: "Launch to production" },
    { step: "7", title: "Support", desc: "Ongoing assistance" }
  ];

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-20 md:py-32">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 mb-6">
            <Zap className="h-4 w-4 text-cyan-300" />
            <span className="text-sm font-semibold text-cyan-300 uppercase tracking-wider">
              {service.category || "Premium Service"}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent mb-6">
            {service.title}
          </h1>

          <p className="text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl">
            {service.description}
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-cyan-400" />
              <span className="text-slate-300">Expert Team</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-cyan-400" />
              <span className="text-slate-300">Proven Track Record</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-cyan-400" />
              <span className="text-slate-300">24/7 Support</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-3 font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300">
              Get a Quote
              <ArrowRight className="h-4 w-4" />
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-cyan-400/50 bg-cyan-400/10 px-8 py-3 font-semibold text-cyan-300 hover:bg-cyan-400/20 transition-all duration-300">
              Schedule Consultation
              <Calendar className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-4">Service Overview</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-12" />

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">What We Deliver</h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                {service.description}
              </p>
              <div className="space-y-3">
                {["Custom implementation", "Scalable architecture", "Best practices applied"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-400/10 to-blue-400/10 border border-cyan-400/20 rounded-xl p-8">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Duration</p>
                  <p className="text-2xl font-bold text-white mt-1">{service.duration || "Flexible"}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Investment</p>
                  <p className="text-2xl font-bold text-cyan-400 mt-1">${service.price || 0}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Support</p>
                  <p className="text-2xl font-bold text-white mt-1">24/7 Available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="px-6 py-20 md:py-28 bg-slate-800/50">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-4">Key Features</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-12" />

          <div className="grid md:grid-cols-3 gap-6">
            {keyFeatures.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="group rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 hover:border-cyan-400/50 transition-all duration-300">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-cyan-400/20 to-blue-500/20 flex items-center justify-center mb-4 group-hover:from-cyan-400/30 group-hover:to-blue-500/30 transition-all duration-300">
                    <Icon className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-4">Why Choose This Service</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-12" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <div key={i} className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-6 hover:border-cyan-400/50 transition-all duration-300">
                  <Icon className="h-8 w-8 text-cyan-400 mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-slate-400 text-sm">{benefit.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Included */}
      <section className="px-6 py-20 md:py-28 bg-slate-800/50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-4">What's Included</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-12" />

          <div className="grid md:grid-cols-2 gap-4">
            {servicesIncluded.map((item, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-slate-700/50 bg-slate-900/50 p-4">
                <CheckCircle className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-4">Our Development Process</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-12" />

          <div className="grid md:grid-cols-7 gap-2 md:gap-0">
            {workflowSteps.map((workflow, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="relative flex flex-col items-center mb-4 w-full">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg border-4 border-slate-900 z-10">
                    {workflow.step}
                  </div>
                  {i < workflowSteps.length - 1 && (
                    <div className="hidden md:block absolute left-1/2 top-7 h-1 w-full bg-gradient-to-r from-cyan-500 to-transparent" style={{ marginLeft: "28px" }} />
                  )}
                </div>
                <h3 className="font-bold text-white text-center text-sm md:text-base">{workflow.title}</h3>
                <p className="text-xs md:text-sm text-slate-400 text-center mt-1">{workflow.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking & Review Forms */}
      {token && (
        <section className="px-6 py-20 md:py-28 bg-slate-800/50">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-12">Ready to Get Started?</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Booking Form */}
              <form onSubmit={handleBooking} className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Calendar className="h-6 w-6 text-cyan-400" />
                  <h3 className="text-2xl font-bold">Book Service</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Schedule Date</label>
                    <input
                      type="date"
                      value={bookingForm.scheduleDate}
                      onChange={(event) =>
                        setBookingForm((prev) => ({ ...prev, scheduleDate: event.target.value }))
                      }
                      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Additional Notes</label>
                    <textarea
                      value={bookingForm.notes}
                      onChange={(event) =>
                        setBookingForm((prev) => ({ ...prev, notes: event.target.value }))
                      }
                      placeholder="Tell us about your project requirements..."
                      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                      rows="4"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                  >
                    Book Now
                  </button>
                </div>
              </form>

              {/* Review Form */}
              <form onSubmit={handleReview} className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <MessageSquare className="h-6 w-6 text-cyan-400" />
                  <h3 className="text-2xl font-bold">Leave a Review</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Rating</label>
                    <select
                      value={reviewForm.rating}
                      onChange={(event) =>
                        setReviewForm((prev) => ({ ...prev, rating: Number(event.target.value) }))
                      }
                      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                    >
                      {[5, 4, 3, 2, 1].map((value) => (
                        <option key={value} value={value}>
                          {value === 5 ? "⭐⭐⭐⭐⭐ Excellent" : value === 4 ? "⭐⭐⭐⭐ Very Good" : value === 3 ? "⭐⭐⭐ Good" : value === 2 ? "⭐⭐ Fair" : "⭐ Poor"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Your Review</label>
                    <textarea
                      value={reviewForm.comment}
                      onChange={(event) =>
                        setReviewForm((prev) => ({ ...prev, comment: event.target.value }))
                      }
                      placeholder="Share your experience with this service..."
                      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                      rows="4"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* Client Reviews */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-4xl font-bold">Client Reviews</h2>
            </div>
            {reviews.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.round(avgRating) ? "fill-cyan-400 text-cyan-400" : "text-slate-700"}`}
                    />
                  ))}
                </div>
                <span className="text-xl font-bold text-white">{avgRating}</span>
                <span className="text-slate-400">({reviews.length} reviews)</span>
              </div>
            )}
          </div>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-12" />

          <div className="grid md:grid-cols-2 gap-6">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review._id} className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <span className="font-semibold text-white">{review.user?.name || "Client"}</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "fill-cyan-400 text-cyan-400" : "text-slate-600"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-300">{review.comment}</p>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <p className="text-slate-400">No reviews yet. Be the first to review this service!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Services */}
      {related.length > 0 && (
        <section className="px-6 py-20 md:py-28 bg-slate-800/50">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold mb-4">Related Services</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-12" />

            <div className="grid md:grid-cols-3 gap-6">
              {related.map((item) => (
                <ServiceCard key={item._id} service={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ServiceDetails;
