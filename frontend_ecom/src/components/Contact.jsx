export function Contact() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          width: "500px",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "15px", 
                      color:"black"           
        }}>Contact Us</h1>

        <p
          style={{
            color: "#2e2828",
            lineHeight: "1.7",
            marginBottom: "20px",
          }}
        >
          We'd love to hear from you! Feel free to contact us for any
          questions, feedback, or support.
        </p>

        <div
          style={{
            textAlign: "left",
            lineHeight: "2",
            color: "#383434",
          }}
        >
          <p>
            <strong>📞 Phone:</strong> +91 98765 43210
          </p>

          <p>
            <strong>📧 Email:</strong> support@shopifyhub.com
          </p>

          <p>
            <strong>📍 Address:</strong> Pune, Maharashtra, India
          </p>

          <p>
            <strong>🕒 Working Hours:</strong> Monday - Saturday, 9:00 AM - 6:00 PM
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;