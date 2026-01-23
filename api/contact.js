import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      name,
      email,
      phone,
      company,
      project_type,
      budget,
      timeline,
      description,
    } = req.body;

    await resend.emails.send({
      from: "Naxis Capital <contact@naxis.capital>",
      to: "contact@naxis.capital",
      replyTo: email,
      subject: `New Project Inquiry – ${project_type}`,
      html: `
        <h2>New Project Inquiry</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone || "N/A"}</p>
        <p><b>Company:</b> ${company || "N/A"}</p>
        <p><b>Budget:</b> ${budget || "N/A"}</p>
        <p><b>Timeline:</b> ${timeline || "N/A"}</p>
        <hr />
        <p>${description}</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Email failed" });
  }
}
