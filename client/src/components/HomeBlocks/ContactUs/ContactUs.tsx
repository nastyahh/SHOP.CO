import { useAppSelector } from "@/hooks/typedHooks";
import styles from "./ContactUs.module.scss";
import "@/sharedStyles.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { handleInput } from "@/utils/formHandlers";
import ReCAPTCHA from "react-google-recaptcha";
import {
  useCreateFeedbackMutation,
  useVerifyReCaptchaMutation,
} from "@/redux/productsApi";
import { NotificationContext } from "@/HOC/NotificationProvider";

type ContactFormData = {
  userId?: string | null;
  email?: string;
  message: string;
};

export const ContactUs = () => {
  const { showNotification } = useContext(NotificationContext);
  const userData = useAppSelector((state) => state.user.userData);
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const [verifyReCaptcha] = useVerifyReCaptchaMutation();
  const [createFeedback] = useCreateFeedbackMutation();

  const [contactData, setContactData] = useState<ContactFormData>({
    userId: null,
    email: userData.email || "",
    message: "",
  });

  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const resetState = () => {
    setContactData({
      email: userData.email || "",
      message: "",
    });
  };

  useEffect(() => {
    setContactData((prev) => ({
      ...prev,
      userId: userData.id || null,
    }));
  }, [isAuth, userData.id]);

  const checkCapcha = async () => {
    const captchaToken = recaptchaRef.current?.getValue();
    if (!captchaToken) showNotification("Please complete the CAPTCHA");

    const data = await verifyReCaptcha({
      token: captchaToken,
    }).unwrap();

    return data.success;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isAuth && !(await checkCapcha())) return;

    const data = await createFeedback(contactData);
    showNotification(data.data.message);
    resetState();
  };

  return (
    <div className="">
      <div className="container">
        <h2 className="title">Contact Us</h2>
        <form className={styles.contactForm} onSubmit={handleSubmit}>
          {!isAuth ? (
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              onChange={(e) => handleInput(e, setContactData)}
              value={contactData.email}
            />
          ) : null}
          <textarea
            id=""
            placeholder="Enter your text"
            required
            name="message"
            onChange={(e) => handleInput(e, setContactData)}
            rows={5}
            value={contactData.message}
          ></textarea>
          {!isAuth && (
            <div className={styles.recaptcha_container}>
              <ReCAPTCHA
                sitekey="6LeVee0qAAAAAG_pEk7fnBeEbtezVLVg1_TIuzQT"
                ref={recaptchaRef}
              />
            </div>
          )}

          <button type="submit" className={`primary-btn`}>
            {" "}
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
