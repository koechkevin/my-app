export const notify = (message: string, onClick?: () => void) => {
  const sound = `${process.env.PUBLIC_URL}/notify.mp3`;
  const audio = new Audio(sound);
  if (!('Notification' in window)) {
    alert('This browser does not support desktop notification');
  }
  if (Notification.permission === 'granted') {
    const notification = new Notification(message);
    notification.onclick = (e) => {
      e.preventDefault();
      onClick && onClick();
    };
    return audio.play();
  }

  if (Notification.permission !== 'denied') {
    Notification.requestPermission().then( (permission) => {
      if (permission === 'granted') {
        audio.play();
        onClick && onClick();
        return new Notification(message);
      }
    });
  }
}