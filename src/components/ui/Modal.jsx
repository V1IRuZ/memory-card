import Button from "./Button";
import { ButtonContainer } from "./ButtonContainer";
import closeIcon from "../../assets/icons/close_32dp_F0C808_FILL0_wght400_GRAD0_opsz40.svg";

export default function Modal({
  ref,
  className,
  headerText,
  onClose,
  children,
}) {
  return (
    <dialog
      className={className}
      ref={ref}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
    >
      <div className="modal-header">
        <h1>{headerText}</h1>
        <Button
          className="x-btn"
          onClick={onClose}
          arialLabel="close"
          iconSrc={closeIcon}
        />
      </div>
      {children}
      <ButtonContainer className="close">
        <Button className="close-btn" text="Close" onClick={onClose} />
      </ButtonContainer>
    </dialog>
  );
}
