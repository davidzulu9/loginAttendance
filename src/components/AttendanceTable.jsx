export default function AttendanceTable({ onBack }) {
  return (
    <div>
      <h2>Attendance Records</h2>
      <button onClick={onBack}>Back to Dashboard</button>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2025-06-03</td>
            <td>08:00</td>
            <td>Woodlands Office</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
