import React from "react";

export class SessionUpload extends React.Component {
  render() {
    return (
      <div>
        <form method="post">
          <input type="file"/>
        </form>
      </div>
    );
  }
}
