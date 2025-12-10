import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Vote = {
  id: number;
  option: string;
};

type Poll = {
  id: number;
  title: string;
  votes: Vote[];
};

export default function PollPage() {
  const { id } = useParams();
  const [poll, setPoll] = useState<Poll | null>(null);
  const [loading, setLoading] = useState(false);

  // Завантаження голосування
  const loadPoll = () => {
    fetch(`http://localhost:3000/api/v1/polls/${id}`)
      .then((res) => res.json())
      .then((data) => setPoll(data));
  };

  useEffect(() => {
    loadPoll();
  }, [id]);

  // Відправка голосу
  const vote = async (option: string) => {
    setLoading(true);
    await fetch(`http://localhost:3000/api/v1/polls/${id}/votes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ option }),
    });

    setLoading(false);
    loadPoll();
  };

  if (!poll) return <h2 style={{ color: "white" }}>Loading...</h2>;

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>{poll.title}</h1>

      <h2>Options</h2>

      {poll.votes.map((v) => (
        <button
          key={v.id}
          onClick={() => vote(v.option)}
          disabled={loading}
          style={{
            padding: "12px 20px",
            margin: "8px",
            borderRadius: "6px",
            background: "#333",
            color: "white",
            cursor: "pointer",
          }}
        >
          {v.option}
        </button>
      ))}

      <h2 style={{ marginTop: "40px" }}>Votes</h2>
      <ul>
        {poll.votes.map((v) => (
          <li key={v.id}>
            {v.option}
          </li>
        ))}
      </ul>
    </div>
  );
}
