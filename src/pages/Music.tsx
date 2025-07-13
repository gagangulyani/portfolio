import { Music as MusicIcon, ExternalLink, Play, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Music = () => {
  const spotifyProfile = "https://open.spotify.com/artist/4hzuNZayWSnGCAxgHpEwDU";
  
  const releases = [
    {
      title: "Latest Single",
      description: "My newest track featuring experimental sounds",
      year: "2024",
      type: "Single"
    },
    {
      title: "Melodic Journeys",
      description: "An EP exploring different musical landscapes",
      year: "2023", 
      type: "EP"
    },
    {
      title: "Digital Dreams",
      description: "First studio album with electronic influences",
      year: "2022",
      type: "Album"
    }
  ];

  const achievements = [
    "10K+ monthly listeners on Spotify",
    "Featured on indie playlists",
    "Collaborated with local artists",
    "Live performances across venues"
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-8 neon-glow">
            <MusicIcon className="w-10 h-10 text-primary" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Musical <span className="neon-text">Journey</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Exploring soundscapes through digital composition and experimental music production. 
            From ambient textures to rhythmic patterns, each track tells a unique story.
          </p>
          
          <Button
            size="lg"
            className="bg-gradient-neon hover:shadow-neon transition-all duration-300"
            asChild
          >
            <a href={spotifyProfile} target="_blank" rel="noopener noreferrer">
              <Play className="w-5 h-5 mr-2" />
              Listen on Spotify
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="nature-border text-center">
              <CardContent className="pt-6">
                <Users className="w-8 h-8 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary mb-2">10K+</div>
                <p className="text-muted-foreground">Monthly Listeners</p>
              </CardContent>
            </Card>
            
            <Card className="nature-border text-center">
              <CardContent className="pt-6">
                <Calendar className="w-8 h-8 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary mb-2">3+</div>
                <p className="text-muted-foreground">Years Creating</p>
              </CardContent>
            </Card>
            
            <Card className="nature-border text-center">
              <CardContent className="pt-6">
                <MusicIcon className="w-8 h-8 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary mb-2">25+</div>
                <p className="text-muted-foreground">Tracks Released</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Releases Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Recent <span className="neon-text">Releases</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {releases.map((release, index) => (
              <Card key={index} className="nature-border card-hover">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="border-primary/50 text-primary">
                      {release.type}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{release.year}</span>
                  </div>
                  <CardTitle className="text-xl">{release.title}</CardTitle>
                  <CardDescription>{release.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href={spotifyProfile} target="_blank" rel="noopener noreferrer">
                      <Play className="w-4 h-4 mr-2" />
                      Listen Now
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Musical <span className="neon-text">Achievements</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="nature-border">
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-4 animate-pulse-glow" />
                    <p className="text-lg">{achievement}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="nature-border bg-gradient-hero">
            <CardContent className="pt-8 pb-8">
              <h3 className="text-3xl font-bold mb-4">
                Let's Create Something <span className="neon-text">Beautiful</span>
              </h3>
              <p className="text-lg text-muted-foreground mb-8">
                Interested in collaboration or want to discuss music production? 
                Let's connect and explore new sonic territories together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-neon hover:shadow-neon" asChild>
                  <a href={spotifyProfile} target="_blank" rel="noopener noreferrer">
                    Follow on Spotify
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/#contact">
                    Get in Touch
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Music;