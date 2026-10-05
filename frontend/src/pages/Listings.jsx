import { useEffect, useState } from "react";
import { getListings } from "../services/listingService";
import ListingCard from "../components/ListingCard";

function Listings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchListings() {
      try {
        const data = await getListings();

        console.log("Listings received:", data);

        setListings(data);
      } catch (err) {
        console.error("Listings error:", err);
        setError("Failed to load listings");
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, []);

  if (loading) {
    return <h2>Loading listings...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>Wanderlust Listings</h1>

      {listings.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        listings.map((listing) => (
          <ListingCard
            key={listing._id}
            listing={listing}
          />
        ))
      )}
    </div>
  );
}

export default Listings;
