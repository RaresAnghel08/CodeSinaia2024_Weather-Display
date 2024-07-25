import "../styles/components/TimeData.css";

export function TimeData({time}) {
  return (
    <div className="time-data">
      <h2 className="title">Date & Time</h2>
      <div className="sections">
        <div className="section">
          <h3 className="section-title">Date</h3>
          <p className="date">{time.day}-{time.month}-{time.year}</p>
        </div>
        <div className="section">
          <h3 className="section-title">Time</h3>
          <p className="time">{time.hour}:{time.minute}:{time.second}</p>
        </div>
      </div>
    </div>
  );
}
