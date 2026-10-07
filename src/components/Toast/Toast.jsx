import "./Toast.css";

export default function Toast({ title, description, type = "success" }) {
  return (
    <div className="Toast">
      <div>
        <h2>Título</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam esse.
        </p>
      </div>
    </div>
  );
}
