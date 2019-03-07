let m = "Madonna"
let myTrackList
const url = `https://dci-fbw12-search-itunes.now.sh/?term=${m}`
fetch(url)
  .then(response => {
    console.log(response)
    return response.json()
  }).then((data) => {
    myTrackList = new TrackList("#tracks", data.results)
    console.log(data)
  })
  .catch(function (err) {
    console.log("Something went wrong!", err)
  })
class TrackList {
  // Creating our Class
  constructor(domSelector, data) {
    // Getting a domelement
    this.container = document.querySelector(domSelector)
    // Store my data
    this.data = data
    // Represents the currently displayed data
    this.viewData = data

    // Show stuff
    this.render()
  }

  modViewData(newData) {
    this.viewData = newData
    this.render()
  }

  template(music) {
    let newList = music.map(ele =>
      `<tr>
      <td><img style="width:50px;display:inline" src="${ele.artworkUrl100}"></td>
      <td><div class="icon">
      <i class="fas fa-play" id="fa-play" onclick="myTrackList.playMusic(${ele.trackId})"></i>
  <i class="fas fa-pause" id="fa-pause" onclick="myTrackList.pauseMusic(${ele.trackId})"></i>
  <audio  id=${ele.trackId} controls="controls" style="display:none"></audio>
  </div></td>
      <td>${ele.trackName}</td>
      <td>${ele.trackPrice == -1 ? "Only album" : ele.trackPrice} ${ele.currency == "USD" ? ele.trackPrice == -1 ? "" : "$" : "€"}</td>
    </tr> `)
    return newList.join("")

  }

  sortP() {
    const sortlist1 = this.data.sort((a, b) => (a.trackPrice) - (b.trackPrice))
    this.modViewData(sortlist1)
  }
  sortT() {
    const sortlist3 = this.data.sort(function (a, b) {
      var nameA = a.trackName.toLowerCase(),
        nameB = b.trackName.toLowerCase()
      if (nameA < nameB)
        return -1
      if (nameA > nameB)
        return 1
      return 0
    })
    this.modViewData(sortlist3)
  }


  Filter() {
    let f = document.getElementById("filter").value
    console.log(f)
    let resultdata = this.data.filter(mus => mus.trackName.toLowerCase().includes(f.toLowerCase()))
    this.modViewData(resultdata)
  }
  playMusic(id) {
    this.viewData.map(ele => ele.trackId).forEach(song => this.pauseMusic(song))
    this.viewData.filter(song => {
      if (song.trackId == id) {
        let track = document.getElementById(id)
        console.log(track)
        track.setAttribute('src', song.previewUrl)
        track.play()
      }
    })
  }
  pauseMusic(id) {
    let song = document.getElementById(id)
    return song.pause()
  }

  render() {
    const template = this.template(this.viewData)
    this.container.innerHTML = template
  }
}