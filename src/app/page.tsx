"use client"

import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic";

const Player = dynamic(() => import("@lottiefiles/react-lottie-player").then(mod => mod.Player), {
  ssr: false,
});
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import {
  MapPin,
  Users,
  Calculator,
  MessageCircle,
  Calendar,
  Vote,
  Plane,
   Star,
  Heart,
  Zap,
  ArrowRight,
  Navigation,
  //Camera,
  //Compass,
} from "lucide-react"
import Link from "next/link"
import WelcomeWrapper from "@/components/welcome-wrapper"
export default function LandingPage() {
 
  return (
    <WelcomeWrapper>
      {/* Main Container */}
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-600 rounded-xl shadow-sm">
              <Navigation className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-semibold text-slate-900 tracking-tight">Travgo</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth">
              <Button variant="ghost" className="text-slate-700 hover:text-slate-900 hover:bg-slate-100">
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all duration-200">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

{/* Hero Section */}
<section className="relative py-24 px-4 min-h-[100vh] flex items-center overflow-hidden bg-gradient-to-b from-slate-100 via-white to-slate-200">

  {/* Radial Background Gradient Layer */}
  <div className="absolute inset-0 z-0 before:content-[''] before:absolute before:inset-0 before:bg-gradient-radial before:from-indigo-300 before:via-white before:to-transparent before:opacity-80"></div>



  {/* Overlay for Text Content */}


  {/* Main Content */}
  <div className="container mx-auto relative z-10">
    <div className="grid lg:grid-cols-2 items-center gap-8">

      {/* Left Column - Text Content */}
      <div className="max-w-[500px]">
        <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
          <Star className="h-4 w-4 text-indigo-600" />
          <span className="text-slate-700 text-sm font-medium">Trusted by 50K+ travelers worldwide</span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-slate-900 mb-6 leading-tight tracking-tight">
          Plan Your Perfect Trip
          <span className="bg-gradient-to-r from-indigo-400 to-sky-300 text-transparent bg-clip-text">
            {" "}Together
          </span>
        </h1>

        <p className="text-xl text-slate-700 mb-10 leading-relaxed">
          Collaborate with friends in real-time to discover destinations, vote on activities, split expenses, and
          create unforgettable travel experiences.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="text-lg px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plane className="mr-2 h-5 w-5" />
              Start Planning
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-4 border-slate-300 text-slate-700 hover:bg-slate-100 transition-all duration-200 bg-white/90 backdrop-blur-sm"
          >
            <Zap className="mr-2 h-5 w-5" />
            Watch Demo
          </Button>
        </div>
      </div>

 {/* Right Column - Lottie Animation */}
      <div className="flex justify-center items-center">
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105">
          <Player
            autoplay
            loop
            speed={0.7}
            src="/Images/girl travel walk cycle.json"
            style={{ height: "420px", width: "420px" }}
          />
        </div>
      </div>
    </div>
  </div>

  {/* Geometric Shapes */}
  <div className="absolute top-16 right-32 w-24 h-24 border-2 border-white/20 rounded-full animate-spin-slow"></div>
  <div className="absolute bottom-32 right-24 w-16 h-16 bg-gradient-to-br from-indigo-400/30 to-sky-400/30 rounded-lg rotate-45 animate-pulse"></div>
  <div className="absolute top-40 right-12 w-2 h-20 bg-white/20 rounded-full"></div>
  <div className="absolute bottom-16 right-36 w-20 h-2 bg-white/20 rounded-full"></div>

{/* Glow Blobs - Soft Blurred Circles */}
<div className="absolute -top-10 -left-10 w-80 h-80 bg-indigo-400 opacity-40 rounded-full blur-[120px] pointer-events-none z-0"></div>
<div className="absolute top-40 right-0 w-96 h-96 bg-sky-300 opacity-50 rounded-full blur-[120px] pointer-events-none z-0"></div>
<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-purple-400 opacity-50 rounded-full blur-[150px] pointer-events-none z-0"></div>


</section>





  {/* Features Grid */}
      <section className="py-24 px-4 bg-slate-900">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-semibold text-white mb-6 tracking-tight">
              Everything You Need for Group Travel
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              From destination discovery to expense splitting, we&apos;ve got every aspect of group travel planning covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group relative overflow-hidden bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-indigo-500/10 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl border border-blue-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative text-center p-8">
                <div className="relative mx-auto mb-6 w-fit">
                  <div className="absolute inset-0 bg-blue-500/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative p-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-3xl shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-white font-bold mb-4 group-hover:text-blue-100 transition-colors duration-300">
                  Real-Time Collaboration
                </CardTitle>
                <CardDescription className="text-slate-300 leading-relaxed text-base group-hover:text-slate-200 transition-colors duration-300">
                  Invite friends, assign roles, and plan together in real-time with live chat and updates.
                </CardDescription>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

                {/* Subtle border glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-transparent to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </CardHeader>
            </Card>

            <Card className="group relative overflow-hidden bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-indigo-500/10 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl border border-blue-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative text-center p-8">
                <div className="relative mx-auto mb-6 w-fit">
                  <div className="absolute inset-0 bg-blue-500/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative p-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-3xl shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110">
                    <Vote className="h-10 w-10 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-white font-bold mb-4 group-hover:text-blue-100 transition-colors duration-300">
                  Group Voting
                </CardTitle>
                <CardDescription className="text-slate-300 leading-relaxed text-base group-hover:text-slate-200 transition-colors duration-300">
                  Vote on destinations, hotels, and activities. Let democracy decide your perfect trip.
                </CardDescription>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

                {/* Subtle border glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-transparent to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </CardHeader>
            </Card>

            <Card className="group relative overflow-hidden bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-indigo-500/10 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl border border-blue-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative text-center p-8">
                <div className="relative mx-auto mb-6 w-fit">
                  <div className="absolute inset-0 bg-blue-500/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative p-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-3xl shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110">
                    <MapPin className="h-10 w-10 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-white font-bold mb-4 group-hover:text-blue-100 transition-colors duration-300">
                  Interactive Maps
                </CardTitle>
                <CardDescription className="text-slate-300 leading-relaxed text-base group-hover:text-slate-200 transition-colors duration-300">
                  Explore destinations with interactive maps, save locations, and plan your route visually.
                </CardDescription>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

                {/* Subtle border glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-transparent to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </CardHeader>
            </Card>

            <Card className="group relative overflow-hidden bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-indigo-500/10 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl border border-blue-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative text-center p-8">
                <div className="relative mx-auto mb-6 w-fit">
                  <div className="absolute inset-0 bg-blue-500/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative p-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-3xl shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110">
                    <Calculator className="h-10 w-10 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-white font-bold mb-4 group-hover:text-blue-100 transition-colors duration-300">
                  Smart Expense Splitting
                </CardTitle>
                <CardDescription className="text-slate-300 leading-relaxed text-base group-hover:text-slate-200 transition-colors duration-300">
                  Track expenses, split costs fairly, and see who owes what with automatic calculations.
                </CardDescription>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

                {/* Subtle border glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-transparent to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </CardHeader>
            </Card>

            <Card className="group relative overflow-hidden bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-indigo-500/10 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl border border-blue-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative text-center p-8">
                <div className="relative mx-auto mb-6 w-fit">
                  <div className="absolute inset-0 bg-blue-500/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative p-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-3xl shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110">
                    <Calendar className="h-10 w-10 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-white font-bold mb-4 group-hover:text-blue-100 transition-colors duration-300">
                  Day-by-Day Itinerary
                </CardTitle>
                <CardDescription className="text-slate-300 leading-relaxed text-base group-hover:text-slate-200 transition-colors duration-300">
                  Create detailed itineraries with drag-and-drop planning and time-blocked activities.
                </CardDescription>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

                {/* Subtle border glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-transparent to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </CardHeader>
            </Card>

            <Card className="group relative overflow-hidden bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-indigo-500/10 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl border border-blue-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative text-center p-8">
                <div className="relative mx-auto mb-6 w-fit">
                  <div className="absolute inset-0 bg-blue-500/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative p-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-3xl shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110">
                    <MessageCircle className="h-10 w-10 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-white font-bold mb-4 group-hover:text-blue-100 transition-colors duration-300">
                  Group Chat
                </CardTitle>
                <CardDescription className="text-slate-300 leading-relaxed text-base group-hover:text-slate-200 transition-colors duration-300">
                  Stay connected with built-in chat, share links, photos, and coordinate in real-time.
                </CardDescription>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

                {/* Subtle border glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-transparent to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>


      {/* Stats Section */}
      <section className="py-24 px-4 bg-slate-900 relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-all border border-white/10">
              <div className="text-5xl font-semibold mb-3 text-white">10K+</div>
              <div className="text-slate-300 text-lg">Trips Planned</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-all border border-white/10">
              <div className="text-5xl font-semibold mb-3 text-white">50K+</div>
              <div className="text-slate-300 text-lg">Happy Travelers</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-all border border-white/10">
              <div className="text-5xl font-semibold mb-3 text-white">200+</div>
              <div className="text-slate-300 text-lg">Countries Covered</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-all border border-white/10">
              <div className="text-5xl font-semibold mb-3 text-white">$2M+</div>
              <div className="text-slate-300 text-lg">Expenses Managed</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-slate-100 rounded-full px-4 py-2 mb-8">
              <Heart className="h-4 w-4 text-indigo-600" />
              <span className="text-slate-700 text-sm font-medium">Join the community</span>
            </div>
            <h2 className="text-5xl font-semibold text-slate-900 mb-6 tracking-tight">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              Join thousands of travelers who trust Travgo for their group trip planning.
            </p>
            <Link href="/dashboard">
              <Button
                size="lg"
                className="text-lg px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plane className="mr-2 h-5 w-5" />
                Create Your First Trip
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-indigo-600 rounded-xl">
                  <Navigation className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-semibold">Travgo</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Making group travel planning simple, collaborative, and enjoyable.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-lg">Product</h3>
              <ul className="space-y-3 text-slate-400">
                <li className="hover:text-white cursor-pointer transition-colors">Features</li>
                <li className="hover:text-white cursor-pointer transition-colors">Pricing</li>
                <li className="hover:text-white cursor-pointer transition-colors">API</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-lg">Company</h3>
              <ul className="space-y-3 text-slate-400">
                <li className="hover:text-white cursor-pointer transition-colors">About</li>
                <li className="hover:text-white cursor-pointer transition-colors">Blog</li>
                <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-lg">Support</h3>
              <ul className="space-y-3 text-slate-400">
                <li className="hover:text-white cursor-pointer transition-colors">Help Center</li>
                <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
                <li className="hover:text-white cursor-pointer transition-colors">Privacy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500">
            <p>&copy; 2025 Travgo. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Basic CSS animations for hero section only */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 5s ease-in-out infinite;
          animation-delay: 1.5s;
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
          animation-delay: 3s;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 1s ease-out both;
}


      `}</style>
    </div>
      </WelcomeWrapper>
  )
}