export default function Button({
  className,
  text,
  iconSrc,
  arialLabel,
  onClick,
}) {
  return (
    <button className={className} aria-label={arialLabel} onClick={onClick}>
      {iconSrc && <img src={iconSrc} alt="" />}
      {text && text}
    </button>
  );
}
