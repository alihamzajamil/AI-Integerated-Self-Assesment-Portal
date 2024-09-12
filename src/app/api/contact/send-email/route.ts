import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, mob, add, msg } = body;

        // Ensure all required fields are present
        if (!name || !email || !msg || !mob || !add) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Create a transporter object using SMTP transport
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // Use the correct SMTP host for Gmail
            port: 465, // Port for secure SMTP
            secure: true, // Use SSL
            auth: {
                user: "selfassessmentportal@gmail.com",
                pass: "joibelpgplvqorfv",
            }
        });

        // Construct email message
        const mailOptions = {
            from: email,
            to: 'selfassessmentportal@gmail.com',
            subject: 'New Contact Form Submission',
            html: `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Mobile Number:</strong> ${mob}</p>
            <p><strong>Address:</strong> ${add}</p>
            <p><strong>Message:</strong><br>${msg}</p>
        `,
            
        };

        // Send email
        await transporter.sendMail(mailOptions);

    

        return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 });
    } catch (error: any) {
        console.error("Error sending email:", error);
        return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
    }
}
