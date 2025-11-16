
import { Menu } from "lucide-react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

const NavBar = () => {
    return (
        <header className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4">

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">Car<span className="text-primary">Hub</span></span>
                </div>

                {/* Desktop Nav Links */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <a href="#" className="hover:text-primary transition">Buy Cars</a>
                    <a href="#" className="hover:text-primary transition">Sell Car</a>
                    <a href="#" className="hover:text-primary transition">Reviews</a>
                    <a href="#" className="hover:text-primary transition">About Us</a>
                </nav>

                {/* Search Bar */}
                <div className="hidden lg:flex w-64">
                    <Input placeholder="Search cars..." className="rounded-xl" />
                </div>

                {/* Right side buttons */}
                <div className="flex items-center gap-3">

                    {/* Theme Toggle Button Space */}
                    {/* <ModeToggle />  -----> Tum yaha add kar dena */}

                    <Button variant="ghost" className="hidden md:flex">
                        Login
                    </Button>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden p-2 rounded-md hover:bg-accent">
                        <Menu className="h-6 w-6" />
                    </button>

                </div>
            </div>
        </header>
    )
}

export default NavBar
