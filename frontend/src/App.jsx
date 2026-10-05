import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Listings from "./pages/Listings";
import ListingDetails from "./pages/ListingDetails";
import CreateListing from "./pages/CreateListing";

import Login from "./pages/Login";
import Signup from "./pages/Signup";


function Home() {
    return (
        <div className="home">

            <section className="hero">

                <h1>
                    Welcome to Wanderlust
                </h1>

                <p>
                    Discover beautiful places and
                    find your perfect stay.
                </p>

                <Link
                    to="/listings"
                    className="explore-button"
                >
                    Explore Listings
                </Link>

            </section>

        </div>
    );
}


function App() {

    return (
        <BrowserRouter>

            {/* Navigation Bar */}
            <Navbar />

            {/* Main Application */}
            <main>

                <Routes>

                    {/* Home */}
                    <Route
                        path="/"
                        element={<Home />}
                    />

                    {/* All Listings */}
                    <Route
                        path="/listings"
                        element={<Listings />}
                    />

                    {/* Create Listing */}
                    <Route
                        path="/listings/new"
                        element={<CreateListing />}
                    />

                    {/* Listing Details */}
                    <Route
                        path="/listings/:id"
                        element={<ListingDetails />}
                    />

                    {/* Login */}
                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    {/* Signup */}
                    <Route
                        path="/signup"
                        element={<Signup />}
                    />

                </Routes>

            </main>

        </BrowserRouter>
    );
}

export default App;