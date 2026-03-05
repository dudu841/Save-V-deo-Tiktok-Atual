import https from 'https';
https.get('https://www.tikwm.com/api/?url=https://www.tiktok.com/@tiktok/video/7106594312292453675&hd=1', (res) => {
  console.log('headers:', res.headers);
});
