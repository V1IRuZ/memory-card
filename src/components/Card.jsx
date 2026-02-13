export default function Card({ data, onClick }) {
  return (
    <button className="card" onClick={onClick} >
      <h1>{data.name}</h1>
      <img src={data.imgSrc} alt="" />
    </button>
  );
}