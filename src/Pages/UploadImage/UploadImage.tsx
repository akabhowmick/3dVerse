import "./UploadImage.css";
import { imageUploadFormId, thankYouPage } from "../../utils/config";
import { useEffect } from "react";
import { useCartContext } from "../../providers/CartProvider";

export const UploadImageForm = () => {
  const { setCart } = useCartContext();

  const uploadAndDisplayImage = (
    <div className="contact-form-div">
      <label htmlFor="Image-for-Customization">Image for Customization</label>
      <input
        id="Image-for-Customization"
        type="file"
        name="Image-for-Customization"
        accept="image/png, image/jpeg"
        required
      />
    </div>
  );

  useEffect(() => {
    setCart([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contactFormInput: {
    name: string;
    label: string;
    type: string;
    autoComplete: string;
    inputMode?: "email" | "tel";
  }[] = [
    { name: "Name", label: "from_name", type: "text", autoComplete: "name" },
    { name: "Email", label: "reply_to", type: "email", autoComplete: "email", inputMode: "email" },
    {
      name: "Phone Number",
      label: "phone_number",
      type: "tel",
      autoComplete: "tel",
      inputMode: "tel",
    },
    { name: "Order Number", label: "order_number", type: "text", autoComplete: "off" },
  ];

  const contactFormInputs = contactFormInput.map(({ name, label, type, autoComplete, inputMode }) => {
    return (
      <div key={name} className="contact-form-div">
        <label htmlFor={label}>{name}</label>
        <input
          className="contact-form-input"
          id={label}
          name={label}
          type={type}
          autoComplete={autoComplete}
          inputMode={inputMode}
          placeholder={`Your ${name}`}
          required
        />
      </div>
    );
  });

  const messageField = (
    <div className="contact-message-div">
      <label htmlFor="message">Message</label>
      <textarea
        className="contact-form-input"
        id="message"
        name="message"
        placeholder="Your Message"
        required
      />
    </div>
  );

  return (
    <form
      className="formcontact"
      action={imageUploadFormId}
      method="POST"
      encType="multipart/form-data"
    >
      <div className="contact__form-container">
        <input type="hidden" name="_next" value={thankYouPage} />
        <input
          type="text"
          name="_honey"
          style={{ display: "none" }}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
        <input
          type="hidden"
          name="_subject"
          value="Customization for Print3dVerse order!"
        />
        <input type="hidden" name="_template" value="table" />
        {contactFormInputs}
        {messageField}
        {uploadAndDisplayImage}
        <div className="submit-btn-container">
          <button id="contact-submit-btn" type="submit" className="btn btn-primary">
            <span>Submit to our designers!</span>
          </button>
        </div>
      </div>
    </form>
  );
};