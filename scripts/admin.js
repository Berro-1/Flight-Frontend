const jwtToken = localStorage.getItem("token");

  if (jwtToken) {
    const decodedjwtToken = jwt_decode(jwtToken);
    console.log(decodedjwtToken);
    if (decodedjwtToken.role !== "admin") {
      
      window.location.href = "home.html";
    }
  } else {
    alert("No jwtToken found. Redirecting to login.");
    window.location.href = "/login";

  }