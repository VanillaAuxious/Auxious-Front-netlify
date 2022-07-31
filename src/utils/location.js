export const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        return [position.coords.latitude, position.coords.longitude];
      },
      (error) => {
        console.error(error);
      },
    );
  } else {
    return null;
  }
};
