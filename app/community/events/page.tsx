import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users, ArrowLeft } from "lucide-react"

export default function EventsPage() {
  const events = [
    {
      title: "The Future of Work: Expert Panel",
      date: "January 15, 2025",
      time: "2:00 PM EST",
      attendees: 2456,
      type: "Webinar",
    },
    {
      title: "AI Workshop: Getting Started",
      date: "January 22, 2025",
      time: "10:00 AM EST",
      attendees: 1203,
      type: "Workshop",
    },
    {
      title: "Community Networking Hour",
      date: "January 29, 2025",
      time: "4:00 PM EST",
      attendees: 834,
      type: "Networking",
    },
    {
      title: "Digital Transformation Masterclass",
      date: "February 5, 2025",
      time: "1:00 PM EST",
      attendees: 1567,
      type: "Masterclass",
    },
    {
      title: "Q&A: Leadership Insights",
      date: "February 12, 2025",
      time: "3:00 PM EST",
      attendees: 892,
      type: "Q&A",
    },
    {
      title: "Annual Community Meetup",
      date: "March 15, 2025",
      time: "All Day",
      attendees: 5000,
      type: "Meetup",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-foreground">
            YourBrand
          </Link>
          <div className="flex gap-8 items-center">
            <Link href="/community" className="text-sm text-foreground hover:text-foreground/80 transition">
              Community
            </Link>
            <Link href="/company" className="text-sm text-foreground hover:text-foreground/80 transition">
              Company
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href="/community">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Link>
        </Button>

        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Upcoming Events</h1>
          <p className="text-lg text-foreground/70 max-w-2xl">
            Join our community for webinars, workshops, and networking events.
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="space-y-4">
          {events.map((event, i) => (
            <div
              key={i}
              className="p-6 rounded-lg border border-border hover:border-foreground/50 hover:shadow-lg transition cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-muted text-foreground">
                      {event.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{event.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-foreground/70">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {event.attendees.toLocaleString()} attending
                    </div>
                  </div>
                </div>
                <Button variant="outline">Register</Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-24 py-12">
        <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-foreground font-semibold">YourBrand © 2025</div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/community" className="text-sm text-foreground/70 hover:text-foreground transition">
              Community
            </Link>
            <Link href="/company" className="text-sm text-foreground/70 hover:text-foreground transition">
              Company
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
