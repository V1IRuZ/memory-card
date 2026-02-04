export default function Card({ data, onShuffle }) {
  return (
    <div className="card" key={data.id} onClick={onShuffle}>
      <h1>{data.name}</h1>
      <img src={data.imgSrc} alt="" />
    </div>
  );
}