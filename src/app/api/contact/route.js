// import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";

// export async function POST(req) {
//   try {
//     const { from_name, from_email, mobile_number, message } = await req.json();

//     // 1. Validation: Ensure .env variables are loaded
//     if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
//       console.error("CRITICAL: EMAIL_USER or EMAIL_PASS is missing in .env");
//       return NextResponse.json({ message: "Server configuration error" }, { status: 500 });
//     }

//     // 2. Create Transporter with TLS fix for 'ESOCKET' errors
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//       // This fix solves the "self-signed certificate" error
//       tls: {
//         rejectUnauthorized: false
//       }
//     });

//     // 3. Setup Email Options
//     const mailOptions = {
//       from: `"${from_name}" <${process.env.EMAIL_USER}>`, // Authenticated sender
//       replyTo: from_email, // So you can reply directly to the customer
//       to: "haripithwa2005@gmail.com",
//       subject: `New Inquiry: ${from_name} | Yogeshwar Controls`,
//       html: `
//         <div style="font-family: sans-serif; padding: 20px; color: #0B1221; line-height: 1.6;">
//           <div style="border: 1px solid #d4af37; padding: 20px; border-radius: 10px;">
//             <h2 style="color: #d4af37; margin-top: 0;">New Contact Form Submission</h2>
//             <hr style="border: 0; border-top: 1px solid #eee;" />
            
//             <p><strong>Name:</strong> ${from_name}</p>
//             <p><strong>Email:</strong> ${from_email}</p>
//             <p><strong>Mobile:</strong> +91 ${mobile_number}</p>
            
//             <div style="margin-top: 20px;">
//               <strong>Message:</strong>
//               <p style="background: #f9f9f9; padding: 15px; border-radius: 8px; border-left: 4px solid #d4af37; white-space: pre-wrap;">
//                 ${message}
//               </p>
//             </div>
            
//             <footer style="margin-top: 20px; font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 10px;">
//               This inquiry was sent from the Yogeshwar Controls website contact form.
//             </footer>
//           </div>
//         </div>
//       `,
//     };

//     // 4. Send the Email
//     await transporter.sendMail(mailOptions);

//     return NextResponse.json(
//       { message: "Email sent successfully!" }, 
//       { status: 200 }
//     );

//   } catch (error) {
//     // Detailed error logging for your terminal
//     console.error("NODEMAILER ERROR:", error.message);
    
//     return NextResponse.json(
//       { 
//         message: "Failed to send email", 
//         error: error.message 
//       }, 
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { from_name, from_email, mobile_number, message } = await req.json();

    // DEBUG: Check your terminal to see if these match your new .env.local values
    console.log("-----------------------------------------");
    console.log("AUTH USER:", process.env.EMAIL_USER);
    console.log("-----------------------------------------");

    // 1. Validation
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return NextResponse.json(
        { message: "Server configuration error: Missing credentials" }, 
        { status: 500 }
      );
    }

    // 2. Create Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Pulled from .env.local
        pass: process.env.EMAIL_PASS, // Your new 16-character App Password
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // 3. Setup Email Options
    const mailOptions = {
      // The 'from' must be the EMAIL_USER for Gmail to authorize the send
      from: `"${from_name}" <${process.env.EMAIL_USER}>`, 
      replyTo: from_email, 
      // 'to' is now dynamic—it sends to whatever email is in your .env
      to: process.env.EMAIL_USER, 
      subject: `New Inquiry: ${from_name} | Yogeshwar Controls`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #0B1221; line-height: 1.6;">
          <div style="border: 1px solid #FFD982; padding: 20px; border-radius: 10px;">
            <h2 style="color: #0B1221; margin-top: 0; text-transform: uppercase;">New Website Inquiry</h2>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            
            <p><strong>Name:</strong> ${from_name}</p>
            <p><strong>Email:</strong> ${from_email}</p>
            <p><strong>Mobile:</strong> +91 ${mobile_number}</p>
            
            <div style="margin-top: 20px;">
              <strong>Message:</strong>
              <p style="background: #F8F9FA; padding: 15px; border-radius: 8px; border-left: 4px solid #FFD982; white-space: pre-wrap;">
                ${message}
              </p>
            </div>
            
            <footer style="margin-top: 20px; font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 10px;">
              Sent via Yogeshwar Controls Contact Form.
            </footer>
          </div>
        </div>
      `,
    };

    // 4. Send the Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully!" }, 
      { status: 200 }
    );

  } catch (error) {
    console.error("NODEMAILER ERROR:", error.message);
    return NextResponse.json(
      { message: "Failed to send email", error: error.message }, 
      { status: 500 }
    );
  }
}