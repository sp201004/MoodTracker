export function Footer() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center overflow-hidden">
              <img
                src="/logo.png"
                alt="MoodTracker Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm text-muted-foreground">MoodTracker - Your Personal Wellness Journey</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Your wellness journey matters • Every mood tells a story • Progress over perfection
          </div>
        </div>
      </div>
    </footer>
  )
}
