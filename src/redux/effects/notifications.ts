import base64 from 'base-64';
// import utf8 from 'utf8';

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
    return audio.play().catch((e) => {
      if (e.name === 'NotAllowedError' ||
        e.name === 'NotSupportedError') {
        return;
      }
    });
  }

  if (Notification.permission !== 'denied') {
    Notification.requestPermission().then( (permission) => {
      if (permission === 'granted') {
        audio.play().catch((e) => {
          if (e.name === 'NotAllowedError' ||
            e.name === 'NotSupportedError') {
            return;
          }
        });
        onClick && onClick();
        return new Notification(message);
      }
    });
  }
};

export const encode = (text: string): string => {
  return text;
  // const bytes = utf8.encode(text);
  // const firstEncoded = base64.encode(bytes);
  // const secondBytes = utf8.encode(firstEncoded);
  // return base64.encode(secondBytes);
};

export const decode = (encoded: string): string => {
  const secondBytes = base64.decode(encoded);
  return base64.decode(secondBytes);
};