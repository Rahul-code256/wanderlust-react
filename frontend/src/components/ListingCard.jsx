import { Link } from "react-router-dom";

function ListingCard({ listing }) {
  return (
    <div>
      <img
        src={listing.image?.url}
        alt={listing.title}
        width="300"
      />

      <h2>{listing.title}</h2>

      <p>
        {listing.location}, {listing.country}
      </p>

      <p>₹{listing.price} / night</p>

      <Link to={`/listings/${listing._id}`}>
        View Details
      </Link>
    </div>
  );
}

export default ListingCard;
