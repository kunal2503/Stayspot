document.addEventListener("DOMContentLoaded", function() {
  var map = tt.map({
      key: "<%=process.env.TOMTOM_API_KEY%>", // Replace with your actual TomTom API key
      container: "map",
      center: [77.2090, 28.6139], // Delhi coordinates
      zoom: 10
  });

  var marker = new tt.Marker()
      .setLngLat([77.2090, 28.6139]) 
      .addTo(map);

  var popup = new tt.Popup({ offset: 30 }).setText("Hello from TomTom!");

  marker.setPopup(popup);
});