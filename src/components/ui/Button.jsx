export default function Button({ className, iconSrc, arialLabel, onClick }) {
  return (
    <button className={className} aria-label={arialLabel} onClick={onClick}>
      {iconSrc && <img src={iconSrc} alt="" />}
    </button>
  );
}
