export default function Card({ data }) {
  return (
    <div className="card" key={data.id}>
      <h1>{data.name}</h1>
      <img src={data.imgSrc} alt="" />
    </div>
  );
}