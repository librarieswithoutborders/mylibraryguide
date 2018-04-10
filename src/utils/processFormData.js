import convertToUrlPath from './convertToUrlPath'

const $ = require('jquery')

export const youtubeGetId = url => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length == 11) {
    return match[2];
  }
  return 'error';
}

export const vimeoGetId = url => {
  const regExp = /(www\.)?vimeo.com\/(\d+)($|\/)/;
  const match = url.match(regExp);

  if (match) {
    return match[2]
  }
  return 'error'
}

const processVideoUrl = url => {
  if (url.match(/youtu/)) {
    console.log('is youtube')
    const id = youtubeGetId(url)

    return {video_provider: 'youtube', resource_url: `https://www.youtube.com/embed/${id}`, resource_id: id}
  } else if (url.match(/vimeo/)) {
    const id = vimeoGetId(url)

    return {video_provider: 'vimeo', resource_url: `https://player.vimeo.com/video/${id}`, resource_id: id}
  }
}

function promisedResult(id) {
  console.log('in promise')
  return new Promise((resolve, reject) => {
    console.log('really in the promise')
    $.get(`http://vimeo.com/api/v2/video/${id}.json?callback=showThumb`, (results, err) => {
      console.log(results)
      console.log('-----')
      console.log(results.substring(15, results.length - 2))
      console.log('-----')
      console.log(JSON.parse(results.substring(15, results.length - 2)))

      resolve(JSON.parse(results.substring(15, results.length - 2)).thumbnail_large)
    })
  })
}

const getVimeoScreenshot = id => {
  console.log('getting vimeo screenshot')

  return new Promise((resolve, reject) => {
    $.get(`http://vimeo.com/api/v2/video/${id}.json?callback=showThumb`, (results, err) => {
      console.log(results)
      console.log('-----')
      console.log(results.substring(15, results.length - 2))
      console.log('-----')
      console.log(JSON.parse(results.substring(15, results.length - 2)))

      resolve(JSON.parse(results.substring(15, results.length - 2)).thumbnail_large)
    })
  })
}


const processFormData = (data, action) => new Promise(resolve => {
  console.log('processing form data')
  console.log(data)
  const retObject = {}
  Object.assign(retObject, data)

  // if (resourceTypeOverride) {
  //   retObject.resource_type = resourceTypeOverride
  // }

  // if (action === "create" && !retObject.path) {
  //   retObject.path = convertToUrlPath(data.title || data.team_name)
  // }
  switch (retObject.resource_type) {
    case 'video':
      const results = processVideoUrl(data.resource_url)
      retObject.video_provider = results.video_provider
      retObject.resource_url = results.resource_url

      if (results.video_provider === 'youtube') {
        retObject.image_url = `https://img.youtube.com/vi/${results.resource_id}/0.jpg`
        resolve(retObject)
      } else {
        getVimeoScreenshot(results.resource_id).then(url => {
          retObject.image_url = url
          resolve(retObject)
        })
      }
      return;

    case 'pdf':
      retObject.image_url = retObject.resource_url.replace('/pdf/', '/images/').replace('.pdf', '.png')
      resolve(retObject)
      return

    default:
      resolve(retObject)
      return
  }
})

export default processFormData
