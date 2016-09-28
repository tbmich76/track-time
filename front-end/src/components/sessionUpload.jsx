import React from "react";
import tj from "togeojson";

export class SessionUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.trackSelected = this.trackSelected.bind(this);
    this.fileSelected = this.fileSelected.bind(this);
  }
  trackSelected(e){
    this.setState({track: e.target.value});
  }
  fileSelected(e) {
    if (e.target.files[0].name.endsWith(".kml")) {
      const parser = new DOMParser();
      const xmlDom = parser.parseFromString(e.target.files[0], "text/xml");
      this.geoData = tj.kml(xmlDom);
    }
    if (e.target.files[0].name.endsWith(".gpx")) {
      const parser = new DOMParser();
      const xmlDom = parser.parseFromString(e.target.files[0], "text/xml");
      this.geoData = tj.gpx(xmlDom);
    }
  }
  handleSubmit(e){

  }
  render() {
    return (
      <div className="session-upload">
        <form method="post" onSubmit={this.handleSubmit}>
          <div className="fieldset">
            <span>Title</span>
            <input type="text" value={this.state.title}></input>
          </div>
          <div className="fieldset">
            <span>Date</span>
            <input type="text" value={this.state.date}></input>
          </div>
          <div className="fieldset">
            <span>Track</span>
            <select onChange={this.trackSelected}>
              <option value="broadford">Broadford</option>
              <option value="phillip island">Phillip Island</option>
            </select>
          </div>
          <div className="fieldset">
            <span>KML or GPX export</span>
            <input accept=".kml,.gpx" multiple={false} type="file" onChange={this.fileSelected}/>
          </div>
          <div>
            <input type="submit"></input>
          </div>
        </form>
      </div>
    );
  }
}
