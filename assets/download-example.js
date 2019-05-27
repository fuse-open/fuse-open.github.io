function downloadExample(element, example) {
  var prefix = 'https://api.github.com/repos/fuse-open/examples/contents/'
  var dir = example + '/'
  var url = prefix + dir + '?ref=master'

  function github_subdir(url) {
    return fetch(url).then(response => {
      return response.json()
    }).then(data => {
      return Promise.all(data.map(obj => {
        if (obj.type === 'dir')
          return github_subdir(obj.url)
        else if (obj.type === 'file')
          return [{path: obj.path, url: obj.download_url}]
      })).then(results => Array.prototype.concat.apply([], results))
    })
  }

  element.disabled = true
  github_subdir(url).then(result => {
    var zip = new JSZip()
    result.map(obj => {
      zip.file(obj.path.slice(dir.length),
               fetch(obj.url).then(response => response.blob()))
    })
    return zip.generateAsync({type:'blob'})
  }).then(
    blob => saveAs(blob, example + '.zip'),
    err => console.log(err)
  ).finally(() => {
    element.disabled = false
  })
}
