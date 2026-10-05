import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getListing } from "../services/listingService";

function ListingDetails() {
  const { id } = useParams();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchListing() {
      try {
        const data = await getListing(id);

        console.log("Listing received:", data);

        setListing(data);
      } catch (err) {
        console.error("Listing error:", err);
        setError("Failed to load listing");
      } finally {
        setLoading(false);
      }
    }

    fetchListing();
  }, [id]);

  if (loading) {
    return <h2>Loading listing...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!listing) {
    return <h2>Listing not found</h2>;
  }

  return (
    <div className="listing-details">

      <Link to="/listings">
        ← Back to Listings
      </Link>

      <h1>{listing.title}</h1>

      {listing.image?.url && (
        <img
          src={listing.image.url}
          alt={listing.title}
          style={{
            width: "500px",
            maxWidth: "100%",
            borderRadius: "10px",
          }}
        />
      )}

      <h3>About this place</h3>

      <p>

        <strong>Country:</strong>{" "}

        {listing.country}

      </p>

      <p>

        <strong>Price:</strong> ₹{listing.price} / night

      </p>

    </div>
  );
}

export default ListingDetails;
