import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080";

function CreateListing() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        location: "",
        country: ""
    });

    const [image, setImage] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    // ==========================================
    // HANDLE TEXT INPUT
    // ==========================================

    function handleChange(event) {

        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });

    }


    // ==========================================
    // HANDLE IMAGE
    // ==========================================

    function handleImageChange(event) {

        setImage(event.target.files[0]);

    }


    // ==========================================
    // SUBMIT
    // ==========================================

    async function handleSubmit(event) {

        event.preventDefault();

        setError("");
        setLoading(true);


        try {

            const data = new FormData();


            // These names match:
            // req.body.listing

            data.append(
                "listing[title]",
                formData.title
            );

            data.append(
                "listing[description]",
                formData.description
            );

            data.append(
                "listing[price]",
                formData.price
            );

            data.append(
                "listing[location]",
                formData.location
            );

            data.append(
                "listing[country]",
                formData.country
            );


            // This matches multer:
            // upload.single("listing[image]")

            if (image) {

                data.append(
                    "listing[image]",
                    image
                );

            }


            const response = await fetch(
                `${API_URL}/listings`,
                {
                    method: "POST",

                    credentials: "include",

                    body: data
                }
            );


            const result = await response.json();


            if (!response.ok) {

                throw new Error(
                    result.message ||
                    result.error ||
                    "Failed to create listing"
                );

            }


            console.log(
                "Listing created:",
                result
            );


            // Go to listing details

            navigate(
                `/listings/${result.listing._id}`
            );


        } catch (error) {

            console.error(
                "Create listing error:",
                error
            );

            setError(error.message);

        } finally {

            setLoading(false);

        }

    }


    return (
        <div className="create-listing-container">

            <div className="create-listing-card">

                <h1>
                    Create a New Listing
                </h1>


                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}


                <form onSubmit={handleSubmit}>


                    {/* TITLE */}

                    <div className="form-group">

                        <label>
                            Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter listing title"
                            required
                        />

                    </div>


                    {/* DESCRIPTION */}

                    <div className="form-group">

                        <label>
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe your property"
                            rows="5"
                            required
                        />

                    </div>


                    {/* PRICE */}

                    <div className="form-group">

                        <label>
                            Price per night
                        </label>

                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Enter price"
                            min="1"
                            required
                        />

                    </div>


                    {/* LOCATION */}

                    <div className="form-group">

                        <label>
                            Location
                        </label>

                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Example: Mumbai"
                            required
                        />

                    </div>


                    {/* COUNTRY */}

                    <div className="form-group">

                        <label>
                            Country
                        </label>

                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            placeholder="Example: India"
                            required
                        />

                    </div>


                    {/* IMAGE */}

                    <div className="form-group">

                        <label>
                            Listing Image
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            required
                        />

                    </div>


                    {/* SUBMIT */}

                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Creating Listing..."
                            : "Create Listing"}

                    </button>

                </form>

            </div>

        </div>
    );
}

export default CreateListing;