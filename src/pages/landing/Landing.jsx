import React, { useState } from "react";
import { BsCloudUpload } from "react-icons/bs";

import "./landing.css";

const Landing = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = () => {};
  const handleClear = () => {
    setTitle("");
    setDescription("");
    setImage("");
  };

  return (
    <div className="landingWrapper">
      <div className="landingContainer">
        <div className="landingProfile">
          <h1>Hello John. Here is your info</h1>

          <div className="landingProfileShowInfo">
            <div className="landingProfileImage">
              <img
                src="https://images.pexels.com/photos/5940856/pexels-photo-5940856.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="profile"
              />
            </div>
            {/*  */}
            <div className="landingProfileText">
              <p>
                <span>Name</span>John Doe
              </p>
              <p>
                <span>Email</span> johndoe@example.com
              </p>
            </div>
            <div className="landingProfileEdit">
              <button>Edit Personal Details</button>
              <span>Logout</span>
            </div>
          </div>

          {/* profile edit */}
        </div>

        {/* Posted issues */}
        <div className="previouslyPostedIssues">
          <h2>Previously posted issues</h2>
          <div className="prevContainer">
            <div className="issue">
              <div className="issueTitle">
                <h3>
                  <span>Title</span> Fee Clearance
                </h3>
                <h3>
                  {" "}
                  <span>Status: </span>Pending
                </h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptas autem dolore labore esse quis nostrum voluptates
                  laborum, alias quas blanditiis illo voluptatum reiciendis
                  officiis explicabo, quia dolores sequi, eveniet rem corrupti!
                  Praesentium, magnam sint quae fugit distinctio sed, asperiores
                  facere ratione facilis cumque nulla. Molestias dolorum illum
                  est sit praesentium.
                </p>
              </div>
              <div className="issueOptions">
                <span>Delete</span>
              </div>
            </div>
            {/*  */}
            <div className="issue">
              <div className="issueTitle">
                <h3>
                  <span>Title</span> Fee Clearance
                </h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptas autem dolore labore esse quis nostrum voluptates
                  laborum, alias quas blanditiis illo voluptatum reiciendis
                  officiis explicabo, quia dolores sequi, eveniet rem corrupti!
                  Praesentium, magnam sint quae fugit distinctio sed, asperiores
                  facere ratione facilis cumque nulla. Molestias dolorum illum
                  est sit praesentium.
                </p>
              </div>
              <div className="issueOptions">
                <span>Clear</span>
              </div>
            </div>
            {/*  */}
            <div className="issue">
              <div className="issueTitle">
                <h3>
                  <span>Title</span> Fee Clearance
                </h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptas autem dolore labore esse quis nostrum voluptates
                  laborum, alias quas blanditiis illo voluptatum reiciendis
                  officiis explicabo, quia dolores sequi, eveniet rem corrupti!
                  Praesentium, magnam sint quae fugit distinctio sed, asperiores
                  facere ratione facilis cumque nulla. Molestias dolorum illum
                  est sit praesentium.
                </p>
              </div>
              <div className="issueOptions">
                <span>Clear</span>
              </div>
            </div>
            {/*  */}
            <div className="issue">
              <div className="issueTitle">
                <h3>
                  <span>Title</span> Fee Clearance
                </h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptas autem dolore labore esse quis nostrum voluptates
                  laborum, alias quas blanditiis illo voluptatum reiciendis
                  officiis explicabo, quia dolores sequi, eveniet rem corrupti!
                  Praesentium, magnam sint quae fugit distinctio sed, asperiores
                  facere ratione facilis cumque nulla. Molestias dolorum illum
                  est sit praesentium.
                </p>
              </div>
              <div className="issueOptions">
                <span>Clear</span>
              </div>
            </div>
            {/*  */}
            <div className="issue">
              <div className="issueTitle">
                <h3>
                  <span>Title</span> Fee Clearance
                </h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptas autem dolore labore esse quis nostrum voluptates
                  laborum, alias quas blanditiis illo voluptatum reiciendis
                  officiis explicabo, quia dolores sequi, eveniet rem corrupti!
                  Praesentium, magnam sint quae fugit distinctio sed, asperiores
                  facere ratione facilis cumque nulla. Molestias dolorum illum
                  est sit praesentium.
                </p>
              </div>
              <div className="issueOptions">
                <span>Clear</span>
              </div>
            </div>
            {/*  */}
            <div className="issue">
              <div className="issueTitle">
                <h3>
                  <span>Title</span> Fee Clearance
                </h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptas autem dolore labore esse quis nostrum voluptates
                  laborum, alias quas blanditiis illo voluptatum reiciendis
                  officiis explicabo, quia dolores sequi, eveniet rem corrupti!
                  Praesentium, magnam sint quae fugit distinctio sed, asperiores
                  facere ratione facilis cumque nulla. Molestias dolorum illum
                  est sit praesentium.
                </p>
              </div>
              <div className="issueOptions">
                <span>Clear</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="createIssueWrapper">
        <div className="createIssueContainer">
          <h2>Create an issue</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Enter a title</label>
            <input
              type="text"
              placeholder="Your title"
              value={title}
              id="title"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
            />

            <label htmlFor="category">Suitable Category</label>
            <select
              name="category"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="volvo" disabled>
                Select
              </option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>

            <label htmlFor="description">Enter a description</label>
            <textarea
              value={description}
              placeholder="Your description"
              rows="4"
              id="description"
              cols="50"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <span style={{ fontSize: "20px" }}>
              Please attach a relevant image
            </span>
            <div className="fileUpload">
              <BsCloudUpload className="upload" />

              <input
                type="file"
                name=""
                value={image}
                placeholder="Your profile"
                id=""
                onChange={(e) => {
                  setImage(e.target.value);
                }}
              />
              <p>
                Recommendation: Use high-quality JPG, JPEG, SVG or PNG as your
                profile
              </p>
            </div>

            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
            <h6 onClick={handleClear}>Clear</h6>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Landing;
