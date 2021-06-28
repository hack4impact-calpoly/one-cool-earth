import React from "react";
import "./css/Announcements.css";
import img1 from "./images/banner-image-1.jpg";
import img2 from "./images/banner-image-2.jpg";
import img3 from "./images/banner-image-3.jpg";
import { Button, ListGroup } from "react-bootstrap";
import Dropzone from "react-dropzone";

// DUMMY : list of files from database to choose from (to display options to user)
const uploadedFiles = [img1, img2, img3];

// DUMMY : show preview of existing selected announcement if there is one
const fetchedSelected = uploadedFiles[1];

class Announcements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: fetchedSelected,
      uploadedFiles: [img1, img2, img3],
      /* file: imgPlaceholder, */
      previewSrc: "",
      title: "",
      description: "",
      errorMsg: null,
      isPreviewAvailable: true,
      dropRef: false,
      // currently selected dummy data is index 1
      activeIndex: 1,
    };
    /* this.handleChange = this.handleChange.bind(this); */
  }

  // TODO: also upload image to database and update volunteer view
  /*   handleChange(event) {
    console.log("IN HANDLE CHANGE");
    console.log(event.target.files[0]);
    if (event.target.files[0] == null) {
      return;
    }
    // append to list of files
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
    });
  } */

  onDrop = (files) => {
    const [uploadedFile] = files;
    this.setState({
      // appends file to list for user to select
      uploadedFiles: [
        ...this.state.uploadedFiles,
        URL.createObjectURL(uploadedFile),
      ],
      // set selected file to newly uploaded file
      selectedFile: URL.createObjectURL(uploadedFile),
      activeIndex: this.state.uploadedFiles.length,
    });

    const fileReader = new FileReader();
    // called when fileReader successfully reads a file
    fileReader.onload = () => {
      this.setState({
        previewSrc: fileReader.result,
      });
    };
    console.log(uploadedFile);
    fileReader.readAsDataURL(uploadedFile);

    this.setState({
      isPreviewAvailable: uploadedFile.name.match(/\.(jpeg|jpg|png)$/),
    });
  };

  alertClicked = () => {
    alert("You clicked the third ListGroupItem");
  };

  fileClicked = (props, index) => {
    this.setState({
      selectedFile: props.target.innerHTML,
      activeIndex: index,
    });

    console.log(props);
  };

  saveClicked = () => {
    //call api to save changes and push selectedFile and uploaded files to database
  };

  render() {
    return (
      <div className="announcements-wrapper">
        <div className="announcements-title">Edit Announcements</div>
        <div className="flex-container">
          <div className="d-grid gap-1">
            <Dropzone onDrop={this.onDrop}>
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps({ className: "drop-zone" })}
                  className="upload"
                >
                  <input {...getInputProps()} />
                  <p>Upload New File Here</p>
                </div>
              )}
            </Dropzone>
            <br />

            <ListGroup>
              {this.state.uploadedFiles.map((file, index) => {
                return (
                  <ListGroup.Item
                    action
                    onClick={(props) => this.fileClicked(props, index)}
                    active={index == this.state.activeIndex}
                  >
                    {file}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>

            <Button className="saveBtn" onClick={this.saveClicked}>
              Save
            </Button>
          </div>

          <div className="upload-section">
            {this.state.selectedFile && (
              <div>
                <strong>Selected file:</strong> {this.state.selectedFile}
              </div>
            )}
            {this.state.selectedFile ? (
              this.state.isPreviewAvailable ? (
                <div className="image-preview">
                  <img
                    className="preview-image"
                    src={this.state.selectedFile}
                    alt="Preview"
                  />
                </div>
              ) : (
                <div className="preview-message">
                  <p>No preview available for this file</p>
                </div>
              )
            ) : (
              <div className="preview-message">
                <p>Image preview will be shown here after selection</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Announcements;
