import "../styles/components/styles.css";

export function FeaturedData({city = "Bucuresti"}) {
  return (
    <div className="featured-data">
      <h1 className="city">{city}</h1>
    </div>
  );
}