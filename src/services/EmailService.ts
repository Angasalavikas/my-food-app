import emailjs from "@emailjs/browser";

export const sendOrderEmail = async (order: any) => {
  return await emailjs.send(
    "service_tc2qd48",
    "template_tpqa64d",
    order,
    "vWgd64jlHdSoQgnTy",
  );
};