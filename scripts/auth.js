const jwtToken = localStorage.getItem("token");

if (jwtToken) {
  const decodedjwtToken = jwt_decode(jwtToken);
  console.log(decodedjwtToken);
  if (decodedjwtToken.role !== "admin") {
    
    window.location.href = "/Flight-Frontend/pages/meme.html";
  }
} else {
  window.location.href = "/Flight-Frontend/pages/meme.html";

}