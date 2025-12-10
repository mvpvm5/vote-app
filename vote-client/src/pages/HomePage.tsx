import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Poll = {
  id: number;
  title: string;
  created_at: string;
  votes: { id: number }[];
};

export default function HomePage() {
  const [polls, setPolls] = useState<Poll[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/polls")
      .then((res) => res.json())
      .then((data) => setPolls(data));
  }, []);

  return (
    <div style={{ padding: "24px", color: "white" }}>
      <h1>All Polls</h1>

      <table border={1} cellPadding={10} style={{ marginTop: "20px", width: "80%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Created at</th>
            <th>Votes count</th>
            <th>Open</th>
          </tr>
        </thead>

        <tbody>
          {polls.map((poll) => (
            <tr key={poll.id}>
              <td>{poll.id}</td>
              <td>{poll.title}</td>
              <td>{new Date(poll.created_at).toLocaleString()}</td>
              <td>{poll.votes.length}</td>
              <td>
                <Link to={`/polls/${poll.id}`} style={{ color: "cyan" }}>
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
