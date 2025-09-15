import { useQuery } from "@tanstack/react-query";
import { Laptop, Globe, Database, Smartphone } from "lucide-react";
import type { AboutInfo } from "@shared/schema";

export default function About() {
  const { data: aboutInfo, isLoading } = useQuery<AboutInfo>({
    queryKey: ['/api/about'],
  });

  if (isLoading) {
    return (
      <section id="about" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="w-full max-w-md mx-auto lg:mx-0 h-96 bg-muted rounded-2xl animate-pulse" />
              <div>
                <div className="h-10 bg-muted rounded mb-6 animate-pulse" />
                <div className="space-y-4">
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-4 bg-muted rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const bio = aboutInfo?.bio || "Hi, I'm a passionate web designer and developer with over 5 years of experience creating beautiful, functional websites that help businesses grow. I specialize in modern web technologies including React, Next.js, and Tailwind CSS.\n\nMy approach combines strategic thinking with creative design to deliver websites that not only look amazing but also convert visitors into customers. I work closely with each client to understand their unique needs and goals.\n\nWhen I'm not coding, you'll find me exploring new design trends, contributing to open-source projects, or enjoying a good cup of coffee while brainstorming the next big idea.";
  
  const profileImage = aboutInfo?.profileImageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600";

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src={profileImage}
                alt="Professional headshot" 
                className="rounded-2xl shadow-lg w-full max-w-md mx-auto lg:mx-0"
                data-testid="img-profile"
              />
            </div>
            
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="text-about-title">
                About Me
              </h2>
              <div className="space-y-4 text-muted-foreground">
                {bio.split('\n\n').map((paragraph, index) => (
                  <p key={index} data-testid={`text-bio-${index}`}>
                    {paragraph}
                  </p>
                ))}
              </div>
              
              <div className="mt-8">
                <h3 className="font-semibold text-lg mb-4" data-testid="text-services-title">
                  Services I Offer
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3" data-testid="service-landing-pages">
                    <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                      <Laptop className="text-accent-foreground" size={16} />
                    </div>
                    <span>Landing Pages</span>
                  </div>
                  <div className="flex items-center space-x-3" data-testid="service-full-websites">
                    <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                      <Globe className="text-accent-foreground" size={16} />
                    </div>
                    <span>Full Websites</span>
                  </div>
                  <div className="flex items-center space-x-3" data-testid="service-backend">
                    <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                      <Database className="text-accent-foreground" size={16} />
                    </div>
                    <span>Backend Development</span>
                  </div>
                  <div className="flex items-center space-x-3" data-testid="service-responsive">
                    <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                      <Smartphone className="text-accent-foreground" size={16} />
                    </div>
                    <span>Responsive Design</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
