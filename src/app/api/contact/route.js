import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { from_name, from_email, mobile_number, message } = await req.json();

    // 1. Create a Transporter (Using Gmail)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "haripithwa2005@gmail.com",
        pass: "your_app_password_here", 
      },
    });

    // 2. Setup Email Options
    const mailOptions = {
      from: from_email,
      to: "haripithwa2005@gmail.com",
      subject: `New Inquiry from ${from_name} | Yogeshwar Controls`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #0B1221;">
          <h2 style="color: #FFD982;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${from_name}</p>
          <p><strong>Email:</strong> ${from_email}</p>
          <p><strong>Mobile:</strong> +91 ${mobile_number}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 8px;">
            ${message}
          </div>
        </div>
      `,
    };

    // 3. Send Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Nodemailer Error:", error);
    return NextResponse.json({ message: "Failed to send email" }, { status: 500 });
  }
}