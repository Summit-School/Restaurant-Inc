import "./Attendance.css";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { onSnapshotGetAttendance } from "../../../api/firebase/admin.api.ts";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    onSnapshotGetAttendance((response) => {
      // ✅ Sort in Descending order (high to low)
      const sortedDesc = response.sort(
        (objA, objB) => Number(objB.timestamp) - Number(objA.timestamp)
      );
      setAttendance(sortedDesc);
    });
  }, []);

  return (
    <div>
      <div className="attendance-title">STAFF ATTENDANCE</div>
      {attendance.length > 0
        ? attendance.map((attendance, index) => (
            <div className="card-wrapper" key={index}>
              <div className="staff-name">
                <span className="key">Staff Name:</span>{" "}
                <span className="value">{attendance.staff.name}</span>
              </div>
              <div className="staff-phone">
                <span className="key">Phone Number:</span>{" "}
                <span className="value">{attendance.staff.phone}</span>
              </div>
              <div className="staff-time">
                <span className="key">Login Time:</span>{" "}
                <span className="value">
                  <Moment format="HH:mm - DD:MM:YYYY ">
                    {attendance.timestamp}
                  </Moment>
                </span>
              </div>
            </div>
          ))
        : "No Attendance Found"}
    </div>
  );
};

export default Attendance;
