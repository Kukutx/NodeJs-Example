const url=require("url");
let urlString="https://www.google.com/search?q=the+dead+end+%E5%9C%B0%E5%9B%BE&oq=&aqs=chrome.0.35i39l7j69i59.11090878j0j15&sourceid=chrome&ie=UTF-8";
let urlObj=url.parse(urlString);
console.log(urlObj);

let obj = {
    protocol: 'https:',
    slashes: true,
    auth: null,
    host: 'www.google.com',
    port: null,
    hostname: 'www.google.com',
    hash: null,
    search: '?q=the+dead+end+%E5%9C%B0%E5%9B%BE&oq=&aqs=chrome.0.35i39l7j69i59.11090878j0j15&sourceid=chrome&ie=UTF-8',
    query: 'q=the+dead+end+%E5%9C%B0%E5%9B%BE&oq=&aqs=chrome.0.35i39l7j69i59.11090878j0j15&sourceid=chrome&ie=UTF-8',
    pathname: '/search',
    path: '/search?q=the+dead+end+%E5%9C%B0%E5%9B%BE&oq=&aqs=chrome.0.35i39l7j69i59.11090878j0j15&sourceid=chrome&ie=UTF-8',
    href: 'https://www.google.com/search?q=the+dead+end+%E5%9C%B0%E5%9B%BE&oq=&aqs=chrome.0.35i39l7j69i59.11090878j0j15&sourceid=chrome&ie=UTF-8'
  }
  let string=url.format(obj);
  console.log(string);

  /*
  url 类比json 记忆
  url.parse 将url字符转成对象
  url.format将url对象转字符串
   */