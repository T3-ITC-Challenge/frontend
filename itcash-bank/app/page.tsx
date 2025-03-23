import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CreditCard, Shield } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Shield className="h-6 w-6" />
            <span>ITCash Bank</span>
          </Link>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4">
              Log In
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4">
              Contact
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Banking Made Simple</h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Experience the future of banking with ITCash. Secure, fast, and always at your fingertips.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/login">
                    <Button size="lg">
                      Log In
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/card-request">
                    <Button size="lg" variant="outline">
                      Request a Bank Card
                      <CreditCard className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  alt="Banking App"
                  className="rounded-lg object-cover"
                  height="400"
                  src="/placeholder.svg?height=400&width=600"
                  width="600"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Choose ITCash Bank?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We offer a range of services designed to make your banking experience seamless and secure.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 shadow-sm">
                <Shield className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Secure Banking</h3>
                <p className="text-center text-muted-foreground">
                  State-of-the-art security measures to protect your financial data.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 shadow-sm">
                <CreditCard className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Magnetic Bank Cards</h3>
                <p className="text-center text-muted-foreground">
                  Convenient payment solutions with our magnetic bank cards.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 shadow-sm">
                <ArrowRight className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Easy Transfers</h3>
                <p className="text-center text-muted-foreground">
                  Send money to friends and family with just a few clicks.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-muted">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8 md:py-12">
          <div className="flex flex-col gap-2 md:gap-4 lg:gap-6">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <Shield className="h-6 w-6" />
              <span>ITCash Bank</span>
            </Link>
            <p className="text-sm text-muted-foreground">© 2025 ITCash Bank. All rights reserved.</p>
          </div>
          <div className="ml-auto flex flex-col gap-2 md:gap-4 lg:gap-6">
            <nav className="flex gap-4 sm:gap-6">
              <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
                About
              </Link>
              <Link href="/terms" className="text-sm font-medium hover:underline underline-offset-4">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm font-medium hover:underline underline-offset-4">
                Privacy
              </Link>
              <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}

