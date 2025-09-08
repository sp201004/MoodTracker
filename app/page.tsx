import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/layout/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="MoodTracker Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-primary">MoodTracker</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your personal wellness companion for tracking mood, sleep, and daily reflections. Build healthy habits and
              understand your emotional patterns.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <CardTitle>New to MoodTracker?</CardTitle>
                <CardDescription>Start your wellness journey today with personalized mood tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/signup">Create Account</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>Continue tracking your wellness journey</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/login">Sign In</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold">Track Daily Moods</h3>
              <p className="text-sm text-muted-foreground">
                Log your mood, sleep, stress levels, and daily reflections
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="font-semibold">Visualize Patterns</h3>
              <p className="text-sm text-muted-foreground">
                See trends and correlations in your wellness data over time
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold">Build Better Habits</h3>
              <p className="text-sm text-muted-foreground">
                Use insights to improve your mental and physical wellbeing
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
