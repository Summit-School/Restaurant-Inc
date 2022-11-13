import "./DashboardCards.css";

const DashboardCards = ({ icon, title, value, bgColor, cardColor }) => {
  return (
    <div className="card dbcard" style={{ backgroundColor: bgColor }}>
      <div className="card-title-header">{title}</div>
      <div className="card-icon">{icon}</div>
      <div className="card-value" style={{ color: cardColor }}>
        {value}
      </div>
    </div>
  );
};

export default DashboardCards;
