import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DarkVeil from "@/components/DarkVeil";
import GlareHover from "@/components/GlareHover";
import VideoPlayer from "@/components/ui/video-player";
import Features from "@/components/ui/features";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background Shader */}
      <div className="fixed inset-0 z-0">
        <DarkVeil hueShift={161} />
        <div className="absolute inset-0 bg-primary/80" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/20 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src="/logo.svg"
                alt="Bona"
                width={120}
                height={40}
                className="h-6 w-auto"
              />
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="lg">Features</Button>
              <Button variant="ghost" size="lg">Pricing</Button>
              <Button variant="ghost" size="lg">About</Button>
              <Button size="lg" className="text-white">Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10">
        <div className="relative container mx-auto px-4 my-[10rem]">
          <div className="max-w-2xl text-center mx-auto">
            <div className="relative mx-auto mb-3 w-12 h-12">
              <div className="absolute inset-0 rounded-full bg-white blur-lg scale-[1.5] animate-fade-up" style={{animationDelay: "0.05s", opacity: "0.3 !important"}}/>
              <Image
                src="/logo-animated.gif"
                alt="Bona"
                width={48}
                height={48}
                className="relative w-full h-full animate-fade-up"
                style={{animationDelay: "0.05s"}}
                unoptimized
              />
            </div>
            <h1 className="text-[4rem] md:text-[5rem] font-medium tracking-tight mb-0 text-foreground [font-family:var(--font-ibm-plex-sans)] animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Leave it to Bona
            </h1>
            <p className="text-xl text-foreground/90 mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              Bona is your AI hiring assistant that streamlines recruitment, screens candidates,
              and helps you find the perfect customer service agents—all in one intelligent platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <Button size="lg" className="text-base text-foreground px-8">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Player Section */}
      <section className="relative my-[5rem] z-10 flex animate-fade-up" style={{ animationDelay: "0.4s" }}>
        <div className="relative container mx-auto flex-1">
          <VideoPlayer
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            poster="/thumbnail.png"
            className="absolute inset-0"
          />
        </div>
      </section>

      <Features />

      <section className="relative z-10 py-20 animate-fade-up" style={{ animationDelay: "0.8s" }}>
        <div className="container mx-auto px-4">
          <GlareHover
            width="100%"
            height="auto"
            background="rgba(0,152,105,0.3)"
            borderRadius="12px"
            borderColor="rgba(0,152,105,0.4)"
            glareColor="#ffffff"
            glareOpacity={0.15}
            className="max-w-4xl mx-auto border-t border-primary/30 py-16 backdrop-blur-sm"
          >
            <div className="text-center px-8">
              <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-foreground">
                Ready to Transform Your Hiring Process?
              </h2>
              <p className="text-lg text-foreground mb-8 opacity-80">
                Join companies that are hiring smarter with Bona
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-base px-8">
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline" className="text-base px-8">
                  Schedule Demo
                </Button>
              </div>
            </div>
          </GlareHover>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-12 bg-muted/30 animate-fade-up" style={{ animationDelay: "0.9s" }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="mb-4">
                <Image
                  src="/logo.svg"
                  alt="Bona"
                  width={120}
                  height={40}
                  className="h-6 w-auto"
                />
              </div>
              <p className="text-foreground/80">
                AI-powered hiring assistant for customer service teams.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Product</h3>
              <ul className="space-y-2 text-foreground/80">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Company</h3>
              <ul className="space-y-2 text-foreground/80">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Support</h3>
              <ul className="space-y-2 text-foreground/80">
                <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <Separator className="mb-8" />
          <div className="text-center text-foreground/80">
            <p>© 2026 Bona. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
