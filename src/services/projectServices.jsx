import axios from "axios";
import React from "react";

export const projectServices = () => {
  getAllProject = async () => {
    try {
      let res = await axios({
        url: `${URL_API}/Project/getAllProject`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          TokenCybersoft: TOKEN_JIRA,
          Authorization: "Bearer " + ID_TOKEN,
        },
      });
      // console.log(res);
      setProjectList(res.data.content);
    } catch (err) {
      console.log("project list err: ", err);
    }
  };
};
