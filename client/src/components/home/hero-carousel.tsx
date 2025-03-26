import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Slide {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  buttonVariant: "primary" | "secondary" | "accent";
  imageSrc: string;
}

const slides: Slide[] = [
  {
    title: "Unity, Peace and Development",
    subtitle: "Building a prosperous future for Kuwadzana West Constituency",
    buttonText: "Learn More",
    buttonLink: "/about",
    buttonVariant: "primary",
    imageSrc: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    title: "Be Part of the 5 Million",
    subtitle: "Join our community initiatives and make a difference today",
    buttonText: "Join Now",
    buttonLink: "/community",
    buttonVariant: "secondary",
    imageSrc: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    title: "Building Infrastructure",
    subtitle: "Transforming our constituency with modern infrastructure projects",
    buttonText: "View Projects",
    buttonLink: "/projects",
    buttonVariant: "accent",
    imageSrc: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  // Auto-advance carousel
  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 5000);
    
    return () => {
      clearTimeout(timer);
    };
  }, [currentSlide]);
  
  const getButtonClasses = (variant: string) => {
    switch (variant) {
      case "primary":
        return "bg-primary hover:bg-primary/90 text-white";
      case "secondary":
        return "bg-secondary hover:bg-secondary/90 text-dark";
      case "accent":
        return "bg-accent hover:bg-accent/90 text-white";
      default:
        return "bg-primary hover:bg-primary/90 text-white";
    }
  };
  
  return (
    <section className="relative bg-gray-800 h-[500px] overflow-hidden">
      {/* Carousel Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 flex items-center px-6 md:px-16">
            <div className="max-w-3xl text-white">
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
                {slide.title}
              </h2>
              <p className="text-lg mb-6">{slide.subtitle}</p>
              <Button
                className={getButtonClasses(slide.buttonVariant)}
                asChild
              >
                <a href={slide.buttonLink}>{slide.buttonText}</a>
              </Button>
            </div>
          </div>
          <img
            src={slide.imageSrc}
            alt={slide.title}
            className="object-cover w-full h-full"
          />
        </div>
      ))}
      
      {/* Carousel Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none z-10"
        aria-label="Previous slide"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none z-10"
        aria-label="Next slide"
      >
        <ArrowRight className="h-5 w-5" />
      </button>
      
      {/* Carousel Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-white bg-opacity-100" : "bg-white bg-opacity-50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
}
