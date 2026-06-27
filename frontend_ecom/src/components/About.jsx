 export function About() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#dfe7f4",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "15px", 
                      color:"black"  }}>About Us</h1>

        <p
          style={{
            color: "#555",
            lineHeight: "1.7",
          }}
        >
          Welcome to our online store. We provide quality products at
          affordable prices and aim to make shopping simple, secure, and
          convenient for everyone.
        </p>

        <p
          style={{
            color: "#555",
            lineHeight: "1.7",
          }}
        >
          Our mission is to deliver a smooth shopping experience with
          excellent customer service and a wide range of products.
        </p>
      </div>
    </div>
  );
}

export default About;