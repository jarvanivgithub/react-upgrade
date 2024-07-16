const imgList: string[] = [
  'https://inews.gtimg.com/news_bt/OWvBqEB-jc6Q1r2UhKaeRr-uG6t39aEkVUds-OC0VNv4oAA/641',
  'https://inews.gtimg.com/news_bt/OnA-vk7isAQ0zO2xcmjke6nm-D3faBVZ4C3eUncUEqkuQAA/641',
  'https://inews.gtimg.com/om_bt/OcesVZX6D_MTeO7QyyBPw0qrv3pHhm3XT6xWrgynm-0oIAA/1000'
]

const loadImg = (url: string) => {
  return new Promise((resolve) => {
    fetch(url).then(() => {
      console.log('image loaded')
      console.log('url:', url)
      resolve(true)
    }).catch(() => {
      resolve(false)
    })
  })
}

const downloadImgList = async (list: string[]) => {
  console.log('list', list)
  if(!list || !Array.isArray(list) || !list.length) return;
  for(let i = 0; i < list.length; i++) {
    const flag = await loadImg(list[i]);
    if(!flag) break;
  }
}

downloadImgList(imgList);